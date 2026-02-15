import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import Anthropic from "@anthropic-ai/sdk";
import fs from "fs/promises";
import path from "path";

// ─── Embedded Knowledge ─────────────────────────────────────────────────────

const KNOWLEDGE = `
You are the Documentation Agent for the Nordlig Design System.

YOUR ROLE:
- Technical writer for component documentation
- Create Storybook stories with all required stories
- Generate API reference documentation
- Write usage examples and guidelines
- Maintain COMPONENT_LOG.md

STORYBOOK STORY REQUIREMENTS (6 REQUIRED STORIES):

1. **Default** - Basic usage with minimal props
2. **All Variants** - All visual variants side by side
3. **All Sizes** - All size variants (if applicable)
4. **Interactive/States** - Different states (hover, focus, disabled, error)
5. **Design Tokens** - Table showing all L4 tokens used (CRITICAL! NEVER SKIP!)
6. **Training Example** - Real-world usage in Training Analyzer context

DESIGN TOKENS STORY PATTERN:
\`\`\`tsx
export const DesignTokens: Story = {
  name: 'Design Tokens',
  render: () => (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-semibold">Verwendete Design Tokens</h3>
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2 pr-4 font-medium">Token</th>
            <th className="text-left py-2 pr-4 font-medium">Verwendung</th>
          </tr>
        </thead>
        <tbody>
          {/* One row per L4 token */}
        </tbody>
      </table>
    </div>
  ),
};
\`\`\`

COMPONENT_LOG.MD FORMAT:
| # | Component | Category | Status | Tokens | Tests | A11y | Stories | Dark | Date |
|---|-----------|----------|--------|--------|-------|------|---------|------|------|

DOCUMENTATION LANGUAGE: German for docs/comments, English for code

STORYBOOK CONFIG:
- Meta tags: ['autodocs']
- ArgTypes for all public props
- Description in parameters.docs
- Category in title: '{Category}/{Component}'

PROJECT ROOT: /Users/Nils/Projects/nordlig-design-system
`;

// ─── JSON Extraction Helper ─────────────────────────────────────────────────

function extractJson(text: string): string {
  const trimmed = text.trim();

  if (trimmed.startsWith('```')) {
    const firstNewline = trimmed.indexOf('\n');
    const lastFence = trimmed.lastIndexOf('```');
    if (firstNewline !== -1 && lastFence > firstNewline) {
      return trimmed.substring(firstNewline + 1, lastFence).trim();
    }
  }

  const firstBrace = trimmed.indexOf('{');
  const lastBrace = trimmed.lastIndexOf('}');
  if (firstBrace !== -1 && lastBrace > firstBrace) {
    return trimmed.substring(firstBrace, lastBrace + 1);
  }

  const firstBracket = trimmed.indexOf('[');
  const lastBracket = trimmed.lastIndexOf(']');
  if (firstBracket !== -1 && lastBracket > firstBracket) {
    return trimmed.substring(firstBracket, lastBracket + 1);
  }

  return text;
}

function parseJsonResponse(text: string): any {
  return JSON.parse(extractJson(text));
}

// ─── Agent Implementation ───────────────────────────────────────────────────

class DocumentationAgent {
  private anthropic: Anthropic;
  private projectRoot: string;

  constructor() {
    this.anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY!,
    });
    this.projectRoot =
      process.env.PROJECT_ROOT ||
      "/Users/Nils/Projects/nordlig-design-system";
  }

  async createStories(spec: {
    componentPath: string;
    componentName: string;
    category: string;
  }) {
    const files = await this.readComponentFiles(spec.componentPath);
    const componentFile = files.find(
      (f) => f.name === `${spec.componentName}.tsx`
    );

    if (!componentFile) {
      throw new Error(`Component file not found: ${spec.componentName}.tsx`);
    }

    const response = await this.anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 16000,
      system: KNOWLEDGE,
      messages: [
        {
          role: "user",
          content: `Create complete Storybook stories for this component. Return ONLY valid JSON (no markdown):

Component (${componentFile.name}):
${componentFile.content}

Category: ${spec.category}
Component Name: ${spec.componentName}

MANDATORY stories (all 6):
1. Default - basic usage
2. AllVariants - all visual variants
3. AllSizes - if applicable, otherwise AllStates
4. Interactive states (disabled, error, loading)
5. DesignTokens - table of ALL var(--*) tokens used
6. TrainingExample - real-world Training Analyzer usage

German comments and descriptions.

Return JSON:
{
  "storiesFile": "// complete stories code...",
  "storyCount": 6,
  "tokens_documented": ["--token-1", "--token-2"]
}`,
        },
      ],
    });

    const text =
      response.content[0].type === "text" ? response.content[0].text : "";
    const result = parseJsonResponse(text);

    const storiesPath = path.join(
      spec.componentPath,
      `${spec.componentName}.stories.tsx`
    );
    await fs.writeFile(storiesPath, result.storiesFile);

    return {
      path: storiesPath,
      storyCount: result.storyCount,
      tokens_documented: result.tokens_documented,
    };
  }

  async generateApiReference(spec: {
    componentPath: string;
    componentName: string;
  }) {
    const files = await this.readComponentFiles(spec.componentPath);
    const componentFile = files.find(
      (f) => f.name === `${spec.componentName}.tsx`
    );

    if (!componentFile) {
      throw new Error(`Component file not found: ${spec.componentName}.tsx`);
    }

    const response = await this.anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 8000,
      system: KNOWLEDGE,
      messages: [
        {
          role: "user",
          content: `Generate API reference documentation in German. Return ONLY valid JSON (no markdown):

Component (${componentFile.name}):
${componentFile.content}

Generate:
1. Component description
2. Props table (name, type, default, description)
3. Usage examples (basic, with variants, with handlers)
4. Accessibility notes
5. Design token list

Return JSON:
{
  "description": "...",
  "props": [
    { "name": "...", "type": "...", "default": "...", "required": true/false, "description": "..." }
  ],
  "usage_examples": [
    { "title": "...", "code": "..." }
  ],
  "accessibility": ["..."],
  "tokens": ["--token-1", "--token-2"],
  "related_components": ["..."]
}`,
        },
      ],
    });

    const text =
      response.content[0].type === "text" ? response.content[0].text : "";
    return parseJsonResponse(text);
  }

  async updateComponentLog(spec: {
    componentName: string;
    category: string;
    tokenCount: number;
    testCount: number;
    storyCount: number;
    a11yLevel: string;
    darkMode: boolean;
  }) {
    const logPath = path.join(this.projectRoot, "COMPONENT_LOG.md");

    let content: string;
    try {
      content = await fs.readFile(logPath, "utf-8");
    } catch {
      content = `# Component Log\n\n| # | Component | Category | Status | Tokens | Tests | A11y | Stories | Dark | Date |\n|---|-----------|----------|--------|--------|-------|------|---------|------|------|\n`;
    }

    const lines = content.split("\n");
    const existingLine = lines.findIndex((l) =>
      l.includes(`| ${spec.componentName} |`)
    );

    // Count existing entries for numbering
    const entryCount = lines.filter(
      (l) => l.startsWith("|") && !l.startsWith("| #") && !l.startsWith("|---")
    ).length;

    const date = new Date().toISOString().split("T")[0];
    const newLine = `| ${existingLine >= 0 ? "" : entryCount + 1} | ${spec.componentName} | ${spec.category} | Done | ${spec.tokenCount} | ${spec.testCount} | ${spec.a11yLevel} | ${spec.storyCount} | ${spec.darkMode ? "Yes" : "No"} | ${date} |`;

    if (existingLine >= 0) {
      lines[existingLine] = newLine;
    } else {
      // Find last table row and insert after it
      let lastTableRow = lines.length - 1;
      for (let i = lines.length - 1; i >= 0; i--) {
        if (lines[i].startsWith("|")) {
          lastTableRow = i;
          break;
        }
      }
      lines.splice(lastTableRow + 1, 0, newLine);
    }

    await fs.writeFile(logPath, lines.join("\n"));

    return {
      updated: true,
      entry: newLine,
    };
  }

  async createUsageExamples(spec: {
    componentPath: string;
    componentName: string;
    context: string;
  }) {
    const files = await this.readComponentFiles(spec.componentPath);
    const componentFile = files.find(
      (f) => f.name === `${spec.componentName}.tsx`
    );

    if (!componentFile) {
      throw new Error(`Component file not found: ${spec.componentName}.tsx`);
    }

    const response = await this.anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 8000,
      system: KNOWLEDGE,
      messages: [
        {
          role: "user",
          content: `Create real-world usage examples for this component in the context of: ${spec.context}

Component (${componentFile.name}):
${componentFile.content}

Generate 3-5 practical examples with German descriptions. Return ONLY valid JSON (no markdown):

{
  "examples": [
    {
      "title": "...",
      "description": "...",
      "code": "// JSX code...",
      "notes": "..."
    }
  ]
}`,
        },
      ],
    });

    const text =
      response.content[0].type === "text" ? response.content[0].text : "";
    return parseJsonResponse(text);
  }

  private async readComponentFiles(dirPath: string) {
    const entries = await fs.readdir(dirPath);
    return Promise.all(
      entries
        .filter((f) => f.endsWith(".tsx") || f.endsWith(".ts"))
        .map(async (filename) => ({
          name: filename,
          content: await fs.readFile(path.join(dirPath, filename), "utf-8"),
        }))
    );
  }
}

// ─── MCP Server ─────────────────────────────────────────────────────────────

const server = new Server(
  { name: "nordlig-documentation", version: "1.0.0" },
  { capabilities: { tools: {} } }
);

const agent = new DocumentationAgent();

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "create_stories",
      description:
        "Create complete Storybook stories (all 6 required stories including DesignTokens)",
      inputSchema: {
        type: "object" as const,
        properties: {
          componentPath: { type: "string", description: "Absolute path to component directory" },
          componentName: { type: "string", description: "Component name (PascalCase)" },
          category: {
            type: "string",
            enum: ["atoms", "molecules", "organisms"],
            description: "Component category for Storybook title",
          },
        },
        required: ["componentPath", "componentName", "category"],
      },
    },
    {
      name: "generate_api_reference",
      description:
        "Generate API reference with props table, usage examples, tokens",
      inputSchema: {
        type: "object" as const,
        properties: {
          componentPath: { type: "string", description: "Absolute path to component directory" },
          componentName: { type: "string", description: "Component name (PascalCase)" },
        },
        required: ["componentPath", "componentName"],
      },
    },
    {
      name: "update_component_log",
      description: "Add or update component entry in COMPONENT_LOG.md",
      inputSchema: {
        type: "object" as const,
        properties: {
          componentName: { type: "string" },
          category: { type: "string" },
          tokenCount: { type: "number" },
          testCount: { type: "number" },
          storyCount: { type: "number" },
          a11yLevel: { type: "string" },
          darkMode: { type: "boolean" },
        },
        required: [
          "componentName",
          "category",
          "tokenCount",
          "testCount",
          "storyCount",
          "a11yLevel",
          "darkMode",
        ],
      },
    },
    {
      name: "create_usage_examples",
      description:
        "Create real-world usage examples for a component in a specific context",
      inputSchema: {
        type: "object" as const,
        properties: {
          componentPath: { type: "string", description: "Absolute path to component directory" },
          componentName: { type: "string", description: "Component name (PascalCase)" },
          context: {
            type: "string",
            description: "Context for examples (e.g., 'Training Analyzer dashboard')",
          },
        },
        required: ["componentPath", "componentName", "context"],
      },
    },
  ],
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  let result: unknown;
  switch (name) {
    case "create_stories":
      result = await agent.createStories(args as {
        componentPath: string;
        componentName: string;
        category: string;
      });
      break;
    case "generate_api_reference":
      result = await agent.generateApiReference(args as {
        componentPath: string;
        componentName: string;
      });
      break;
    case "update_component_log":
      result = await agent.updateComponentLog(args as {
        componentName: string;
        category: string;
        tokenCount: number;
        testCount: number;
        storyCount: number;
        a11yLevel: string;
        darkMode: boolean;
      });
      break;
    case "create_usage_examples":
      result = await agent.createUsageExamples(args as {
        componentPath: string;
        componentName: string;
        context: string;
      });
      break;
    default:
      throw new Error(`Unknown tool: ${name}`);
  }

  return {
    content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
  };
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Documentation Agent running on stdio");
}

main().catch(console.error);
