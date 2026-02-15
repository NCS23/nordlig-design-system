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
You are the Design System Validator for Nordlig Design System.

YOUR ROLE:
- Validate components against design system rules
- Check token compliance, Nordic principles, accessibility
- List existing components for reference
- You do NOT generate or modify code

NORDIC DESIGN PRINCIPLES:
1. MINIMALISM - No unnecessary elements, max 3 visual properties changing between states
2. CLEAR LINES - Geometric shapes, consistent border-radius
3. WHITESPACE - Cards p-6+, sections p-8+, gap-4+
4. MUTED PALETTE - Sky Blue (#0ea5e9) is maximum brightness, no neons
5. NATURAL ACCENTS - Earth tones (amber, stone, emerald), sparingly

TOKEN SYSTEM (4 LAYERS — STRICT!):
- L1 (Base): Raw hex values (--color-{palette}-{shade})
- L2 (Global): Numbered palettes (--color-{type}-{index}-{shade})
- L3 (Roles): Functional (--color-{function}-{variant})
- L4 (Semantic): Component-specific (--color-{component}-{property}-{state})

CRITICAL RULES:
- NEVER hardcode hex colors in components
- NEVER use Tailwind color classes (bg-sky-500)
- NEVER use Tailwind radius classes (rounded-md), use rounded-[var(--radius-*)]
- NEVER use Tailwind shadow classes (shadow-md), use [box-shadow:var(--shadow-*)]
- ALWAYS use var(--*) tokens
- ALWAYS use React.forwardRef + displayName
- ALWAYS use cn() for className merging
- ALWAYS use cva() for variant-based styling

SIZING CONSISTENCY:
- Components with size variants MUST reuse shared sizing tokens
- Height: --sizing-input-{sm|md|lg}-height (36px/40px/44px)
- NEVER hardcode h-8, h-10 etc. when sizing tokens exist

ATOMIC DESIGN:
- Higher-level components MUST reuse lower-level atoms
- FORBIDDEN: Reimplementing atom functionality (e.g. animate-pulse instead of Skeleton atom)

FORBIDDEN PATTERNS:
- NO emoji icons in components
- NO DesignTokens stories in component files (centralized in Colors.stories.tsx)
- NO reimplementing existing atoms

L3 REFERENCES (available for L4 tokens):
- color.bg.paper/base/surface/primary/overlay
- color.text.base/muted/disabled/inverse/primary
- color.border.default/muted/strong/focus/error/success
- color.success/warning/error/info.bg-subtle/border/text
- shadow.elevation.low/medium/high/overlay
- radius.component.sm/md/lg/full

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

  return text;
}

function parseJsonResponse(text: string): any {
  return JSON.parse(extractJson(text));
}

// ─── Agent Implementation ───────────────────────────────────────────────────

class DesignSystemAgent {
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

  async validateComponent(componentPath: string) {
    const files = await this.readComponentFiles(componentPath);

    const response = await this.anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 4000,
      system: KNOWLEDGE,
      messages: [
        {
          role: "user",
          content: `Validate this component against Nordlig Design System rules. Return ONLY valid JSON (no markdown):

${files.map((f) => `--- ${f.name} ---\n${f.content}`).join("\n\n")}

Check for:
1. Hardcoded hex colors (#xxx, rgb(), hsl())
2. Tailwind color classes (bg-sky-500, text-gray-400)
3. Tailwind radius classes (rounded-md, rounded-lg)
4. Tailwind shadow classes (shadow-sm, shadow-md)
5. Hardcoded height classes (h-8, h-10) when sizing tokens should be used
6. Non-4px-grid spacing (p-[14px], m-[18px])
7. Missing dark mode support
8. Missing accessibility (aria-*, role, tabIndex)
9. Missing React.forwardRef / displayName
10. Nordic principles violations
11. Atomic design violations (reimplementing atoms)

Return JSON:
{
  "valid": true/false,
  "score": "1-10",
  "violations": [
    {
      "type": "hardcoded-color|tailwind-class|sizing|spacing|a11y|nordic|atomic-design",
      "severity": "error|warning|info",
      "file": "...",
      "line": 0,
      "message": "...",
      "suggestion": "..."
    }
  ],
  "nordic_principles_check": {
    "minimalism": { "pass": true/false, "note": "..." },
    "clear_lines": { "pass": true/false, "note": "..." },
    "whitespace": { "pass": true/false, "note": "..." },
    "muted_palette": { "pass": true/false, "note": "..." },
    "natural_accents": { "pass": true/false, "note": "..." }
  }
}`,
        },
      ],
    });

    const text =
      response.content[0].type === "text" ? response.content[0].text : "";
    return parseJsonResponse(text);
  }

  async listComponents() {
    const categories = ["atoms", "molecules", "organisms"];
    const components: { category: string; name: string; path: string }[] = [];

    for (const category of categories) {
      const categoryPath = path.join(
        this.projectRoot,
        "packages/components/src",
        category
      );
      try {
        const entries = await fs.readdir(categoryPath, {
          withFileTypes: true,
        });
        for (const entry of entries) {
          if (entry.isDirectory()) {
            components.push({
              category,
              name: entry.name,
              path: path.join(categoryPath, entry.name),
            });
          }
        }
      } catch {
        // Category doesn't exist yet
      }
    }

    return { components, count: components.length };
  }

  private async readComponentFiles(componentPath: string) {
    const entries = await fs.readdir(componentPath);
    return Promise.all(
      entries
        .filter((f) => f.endsWith(".tsx") || f.endsWith(".ts"))
        .map(async (filename) => ({
          name: filename,
          content: await fs.readFile(
            path.join(componentPath, filename),
            "utf-8"
          ),
        }))
    );
  }
}

// ─── MCP Server ─────────────────────────────────────────────────────────────

const server = new Server(
  { name: "nordlig-design-system", version: "2.0.0" },
  { capabilities: { tools: {} } }
);

const agent = new DesignSystemAgent();

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "validate_component",
      description:
        "Validate a component against Nordlig rules (tokens, Nordic principles, a11y, sizing, atomic design)",
      inputSchema: {
        type: "object" as const,
        properties: {
          componentPath: {
            type: "string",
            description: "Absolute path to the component directory",
          },
        },
        required: ["componentPath"],
      },
    },
    {
      name: "list_components",
      description: "List all existing components by category",
      inputSchema: {
        type: "object" as const,
        properties: {},
      },
    },
  ],
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  let result: unknown;
  switch (name) {
    case "validate_component":
      result = await agent.validateComponent(args!.componentPath as string);
      break;
    case "list_components":
      result = await agent.listComponents();
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
  console.error("Design System Agent running on stdio");
}

main().catch(console.error);
