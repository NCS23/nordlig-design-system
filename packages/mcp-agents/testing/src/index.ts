import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import fs from "fs/promises";
import path from "path";
import { execSync } from "child_process";

// ─── Agent Implementation ───────────────────────────────────────────────────

class TestingAgent {
  private projectRoot: string;

  constructor() {
    this.projectRoot =
      process.env.PROJECT_ROOT ||
      "/Users/Nils/Projects/nordlig-design-system";
  }

  async validateTokens(componentPath: string) {
    const files = await this.readComponentFiles(componentPath);
    const violations: {
      type: string;
      severity: string;
      file: string;
      line: number;
      match?: string;
      message?: string;
      suggestion: string;
    }[] = [];

    for (const file of files) {
      if (file.name.includes(".test.") || file.name.includes(".stories.")) {
        continue;
      }

      const lines = file.content.split("\n");
      lines.forEach((line, index) => {
        // Skip imports and comments
        if (line.trim().startsWith("import ") || line.trim().startsWith("//")) {
          return;
        }

        // Hardcoded hex colors
        const hexMatches = line.match(/#[0-9a-fA-F]{3,8}\b/g);
        if (hexMatches) {
          for (const match of hexMatches) {
            violations.push({
              type: "hardcoded-color",
              severity: "error",
              file: file.name,
              line: index + 1,
              match,
              suggestion: "Use var(--color-*) token instead",
            });
          }
        }

        // Tailwind color classes
        const twColorMatch = line.match(
          /\b(bg|text|border|ring)-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-\d+/g
        );
        if (twColorMatch) {
          for (const match of twColorMatch) {
            violations.push({
              type: "tailwind-color",
              severity: "error",
              file: file.name,
              line: index + 1,
              match,
              suggestion: "Use bg-[var(--color-*)] or text-[var(--color-*)] instead",
            });
          }
        }

        // Tailwind radius classes (except rounded-full which is OK)
        const twRadiusMatch = line.match(
          /\brounded-(sm|md|lg|xl|2xl|3xl)\b/g
        );
        if (twRadiusMatch) {
          for (const match of twRadiusMatch) {
            violations.push({
              type: "tailwind-radius",
              severity: "error",
              file: file.name,
              line: index + 1,
              match,
              suggestion: "Use rounded-[var(--radius-*)] instead",
            });
          }
        }

        // Tailwind shadow classes
        const twShadowMatch = line.match(
          /\bshadow-(sm|md|lg|xl|2xl|inner)\b/g
        );
        if (twShadowMatch) {
          for (const match of twShadowMatch) {
            violations.push({
              type: "tailwind-shadow",
              severity: "error",
              file: file.name,
              line: index + 1,
              match,
              suggestion: "Use [box-shadow:var(--shadow-*)] instead",
            });
          }
        }
      });
    }

    // Token existence verification
    const cssPath = path.join(this.projectRoot, "packages/styles/dist/tokens.css");
    try {
      const cssContent = await fs.readFile(cssPath, "utf-8");
      const definedTokens = new Set<string>();
      const tokenDefRegex = /--([\w-]+):/g;
      let match;
      while ((match = tokenDefRegex.exec(cssContent)) !== null) {
        definedTokens.add(match[1]);
      }

      for (const file of files) {
        if (file.name.includes(".test.") || file.name.includes(".stories.")) {
          continue;
        }
        const varRefs = file.content.match(/var\(--([a-z][a-z0-9-]*)\)/g) || [];
        for (const ref of varRefs) {
          const tokenName = ref.replace("var(--", "").replace(")", "");
          if (!definedTokens.has(tokenName)) {
            violations.push({
              type: "missing-token",
              severity: "error",
              file: file.name,
              line: 0,
              match: `var(--${tokenName})`,
              message: `Token --${tokenName} referenced but not defined in tokens.css`,
              suggestion: `Create L4 token in packages/tokens/src/semantic/ or check token name spelling`,
            });
          }
        }
      }
    } catch {
      // tokens.css not found, skip verification
    }

    return {
      valid: violations.filter((v) => v.severity === "error").length === 0,
      violations,
      summary: {
        errors: violations.filter((v) => v.severity === "error").length,
        warnings: violations.filter((v) => v.severity === "warning").length,
      },
    };
  }

  async runTests(scope?: string) {
    try {
      const cmd = scope
        ? `cd ${this.projectRoot} && pnpm --filter @nordlig/components test -- --run ${scope}`
        : `cd ${this.projectRoot} && pnpm --filter @nordlig/components test -- --run`;

      const output = execSync(cmd, {
        encoding: "utf-8",
        timeout: 120000,
      });

      return {
        success: true,
        output: output.slice(-3000),
      };
    } catch (error: unknown) {
      const err = error as { stdout?: string; stderr?: string };
      return {
        success: false,
        output: (err.stdout || "").slice(-3000),
        error: (err.stderr || "").slice(-1000),
      };
    }
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
  { name: "nordlig-testing", version: "2.0.0" },
  { capabilities: { tools: {} } }
);

const agent = new TestingAgent();

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "validate_tokens",
      description:
        "Validate token compliance: no hardcoded colors, correct token usage, all var() references resolve",
      inputSchema: {
        type: "object" as const,
        properties: {
          componentPath: {
            type: "string",
            description: "Absolute path to component directory",
          },
        },
        required: ["componentPath"],
      },
    },
    {
      name: "run_tests",
      description: "Run existing unit tests (optional scope filter)",
      inputSchema: {
        type: "object" as const,
        properties: {
          scope: {
            type: "string",
            description: "Optional test file or pattern to run",
          },
        },
      },
    },
  ],
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  let result: unknown;
  switch (name) {
    case "validate_tokens":
      result = await agent.validateTokens(args!.componentPath as string);
      break;
    case "run_tests":
      result = await agent.runTests(args?.scope as string | undefined);
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
  console.error("Testing Agent running on stdio");
}

main().catch(console.error);
