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
You are the UX Review Agent for the Nordlig Design System.

YOUR ROLE:
- Design critic and UX expert
- Ensure Nordic design principles are followed
- Review accessibility compliance
- Check visual consistency across components
- Validate interaction patterns

NORDIC DESIGN PRINCIPLES (PRIORITY 1!):
1. MINIMALISM
   - No decorative elements without function
   - Max 3 visual properties changing between states
   - Clean, uncluttered interfaces
   - Every element must earn its place

2. CLEAR LINES
   - Geometric shapes, not organic
   - Consistent border-radius per component type
   - Aligned grid layouts
   - Structured visual hierarchy

3. WHITESPACE
   - Cards: p-6 minimum (24px)
   - Sections: p-8 minimum (32px)
   - Between elements: gap-4 minimum (16px)
   - Generous breathing room

4. MUTED PALETTE
   - Sky Blue (#0ea5e9) is the MAXIMUM brightness
   - No neon, no high-saturation colors
   - Muted variants preferred
   - Neutral backgrounds (stone, slate)

5. NATURAL ACCENTS
   - Earth tones: amber, stone, emerald
   - Inspired by Nordic nature
   - Subtle, not dominant
   - Used sparingly for emphasis

ACCESSIBILITY CHECKLIST:
- WCAG 2.1 AA minimum (4.5:1 text, 3:1 UI)
- Keyboard navigation (Tab, Enter, Space, Escape, Arrow keys)
- Focus visible indicators (ring-2 ring-offset-1)
- Screen reader support (aria-label, aria-describedby, role)
- Touch targets >= 40px (ideally 44px)
- Reduced motion support (@media prefers-reduced-motion)
- Color not sole information carrier

INTERACTION PATTERNS:
- Hover: subtle bg change, no dramatic shifts
- Active: slight scale or color shift
- Focus: visible ring, never outline-none without alternative
- Disabled: opacity-50 + pointer-events-none
- Loading: skeleton or spinner, never empty state
- Transitions: duration-200 for UI, duration-300 for larger animations

CONSISTENCY RULES:
- Same component type = same interaction pattern
- Same spacing for same hierarchy level
- Same animation duration for same type of change
- Same focus ring style everywhere

PROJECT RULES (from PROJEKT_REGELN.md — MUST follow!):

1. TOKEN ARCHITECTURE (4 Layers):
   - L1 (Base) → L2 (Global) → L3 (Role) → L4 (Semantic/Component)
   - Components MUST use L4 tokens (--color-{component}-*), NEVER hardcoded hex values or Tailwind color classes
   - L4 tokens reference L3 role tokens, NEVER L1/L2 directly
   - Token files: packages/tokens/src/semantic/{component}.json

2. SIZING CONSISTENCY:
   - Components with size variants (sm/md/lg) MUST reuse shared sizing tokens
   - Height: --sizing-input-{sm|md|lg}-height (36px/40px/44px) — shared across Input, NumberInput, Select, etc.
   - Font-size: --sizing-input-{sm|md|lg}-font-size
   - NEVER use hardcoded Tailwind height classes (h-8, h-10) when sizing tokens exist

3. STORYBOOK TOKEN DOCUMENTATION:
   - NEVER create DesignTokens stories inside component story files!
   - Token documentation is CENTRALIZED in apps/storybook/stories/Colors.stories.tsx
   - Format: ColorToken[] array with { name, value, cssVar, chain } entries
   - If a review suggests "add DesignTokens story to component", that is WRONG

4. ATOMIC DESIGN — COMPOSITION RULES:
   - Atoms: smallest building blocks (Button, Input, Badge, Skeleton, etc.)
   - Molecules: combine 2+ atoms (InputField = Label + Input + ErrorMessage)
   - Organisms: combine molecules and/or atoms (Card, Table, Modal)
   - CRITICAL: Higher-level components MUST reuse lower-level atoms
   - FORBIDDEN: Reimplementing atom functionality (e.g. using animate-pulse instead of Skeleton atom)

5. ACCESSIBILITY PATTERNS (project-specific):
   - Compound components (Input + Buttons): use role="group" + aria-label on container
   - Error states: aria-invalid on the input element
   - Numeric inputs: aria-valuemin, aria-valuemax, aria-valuenow
   - Stepper/action labels: configurable via props for i18n (e.g. decrementLabel, incrementLabel)
   - Focus ring: focus-visible for simple inputs, focus-within for compound components

6. EDGE CASE PATTERNS:
   - Floating-point arithmetic: MUST use precision-aware calculation (not raw + / -)
   - Form inputs: MUST support clearing and re-entering values (intermediate string state)
   - Form inputs: MUST validate/clamp on blur, not only on change
   - Controlled + uncontrolled: support both patterns (value + onChange OR defaultValue)
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

class UxReviewAgent {
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

  async reviewComponent(spec: {
    componentPath: string;
    componentName: string;
  }) {
    const files = await this.readComponentFiles(spec.componentPath);

    const response = await this.anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 8000,
      system: KNOWLEDGE,
      messages: [
        {
          role: "user",
          content: `Perform a comprehensive UX review of this component. Return ONLY valid JSON (no markdown):

Component: ${spec.componentName}

${files.map((f) => `--- ${f.name} ---\n${f.content}`).join("\n\n")}

Review against:
1. All 5 Nordic Design Principles
2. Accessibility checklist
3. Interaction patterns
4. Visual consistency
5. Token compliance

Return JSON:
{
  "component": "${spec.componentName}",
  "overall_score": "1-5",
  "nordic_principles": {
    "minimalism": { "score": "1-5", "findings": ["..."], "suggestions": ["..."] },
    "clear_lines": { "score": "1-5", "findings": ["..."], "suggestions": ["..."] },
    "whitespace": { "score": "1-5", "findings": ["..."], "suggestions": ["..."] },
    "muted_palette": { "score": "1-5", "findings": ["..."], "suggestions": ["..."] },
    "natural_accents": { "score": "1-5", "findings": ["..."], "suggestions": ["..."] }
  },
  "accessibility": {
    "score": "1-5",
    "findings": [
      { "type": "keyboard|screen-reader|contrast|touch-target|focus",
        "severity": "error|warning|info",
        "message": "...",
        "suggestion": "..." }
    ]
  },
  "interactions": {
    "score": "1-5",
    "findings": ["..."]
  },
  "consistency": {
    "score": "1-5",
    "findings": ["..."]
  },
  "summary": "...",
  "critical_issues": ["..."],
  "recommendations": ["..."]
}`,
        },
      ],
    });

    const text =
      response.content[0].type === "text" ? response.content[0].text : "";
    return parseJsonResponse(text);
  }

  async checkContrast(spec: {
    foreground: string;
    background: string;
    fontSize?: number;
    isBold?: boolean;
  }) {
    const fgRgb = this.hexToRgb(spec.foreground);
    const bgRgb = this.hexToRgb(spec.background);

    if (!fgRgb || !bgRgb) {
      return {
        error: "Invalid hex color. Provide colors as #RRGGBB or #RGB",
      };
    }

    const ratio = this.contrastRatio(fgRgb, bgRgb);
    const isLargeText =
      (spec.fontSize && spec.fontSize >= 18) ||
      (spec.fontSize && spec.fontSize >= 14 && spec.isBold);

    const aaRequired = isLargeText ? 3 : 4.5;
    const aaaRequired = isLargeText ? 4.5 : 7;

    return {
      foreground: spec.foreground,
      background: spec.background,
      ratio: Math.round(ratio * 100) / 100,
      aa: {
        required: aaRequired,
        pass: ratio >= aaRequired,
      },
      aaa: {
        required: aaaRequired,
        pass: ratio >= aaaRequired,
      },
      isLargeText: !!isLargeText,
    };
  }

  async validateNordicPrinciples(spec: {
    componentPath: string;
  }) {
    const files = await this.readComponentFiles(spec.componentPath);

    const response = await this.anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 4000,
      system: KNOWLEDGE,
      messages: [
        {
          role: "user",
          content: `Validate ONLY Nordic design principles for this component. Return ONLY valid JSON (no markdown):

${files.map((f) => `--- ${f.name} ---\n${f.content}`).join("\n\n")}

For each principle, check:
- MINIMALISM: unnecessary elements, excessive visual properties
- CLEAR LINES: organic shapes, inconsistent radii
- WHITESPACE: too-tight spacing, missing padding
- MUTED PALETTE: bright/neon colors, high saturation
- NATURAL ACCENTS: non-earth-tone accents

Return JSON:
{
  "pass": true/false,
  "principles": {
    "minimalism": { "pass": true/false, "violations": ["..."] },
    "clear_lines": { "pass": true/false, "violations": ["..."] },
    "whitespace": { "pass": true/false, "violations": ["..."] },
    "muted_palette": { "pass": true/false, "violations": ["..."] },
    "natural_accents": { "pass": true/false, "violations": ["..."] }
  },
  "overall_note": "..."
}`,
        },
      ],
    });

    const text =
      response.content[0].type === "text" ? response.content[0].text : "";
    return parseJsonResponse(text);
  }

  async compareComponents(spec: {
    componentPaths: string[];
  }) {
    const allFiles: { component: string; files: { name: string; content: string }[] }[] = [];

    for (const p of spec.componentPaths) {
      const files = await this.readComponentFiles(p);
      allFiles.push({
        component: path.basename(p),
        files,
      });
    }

    const response = await this.anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 6000,
      system: KNOWLEDGE,
      messages: [
        {
          role: "user",
          content: `Compare these components for visual consistency. Return ONLY valid JSON (no markdown):

${allFiles
  .map(
    (c) =>
      `=== ${c.component} ===\n${c.files.map((f) => `--- ${f.name} ---\n${f.content}`).join("\n\n")}`
  )
  .join("\n\n")}

Check:
- Consistent spacing patterns
- Consistent border-radius usage
- Consistent color token usage
- Consistent interaction patterns
- Consistent focus ring patterns
- Consistent transition durations

Return JSON:
{
  "consistent": true/false,
  "inconsistencies": [
    { "type": "spacing|radius|color|interaction|focus|transition",
      "components": ["A", "B"],
      "message": "...",
      "suggestion": "..." }
  ]
}`,
        },
      ],
    });

    const text =
      response.content[0].type === "text" ? response.content[0].text : "";
    return parseJsonResponse(text);
  }

  // ─── Color Utilities ────────────────────────────────────────────────────

  private hexToRgb(hex: string): [number, number, number] | null {
    const cleaned = hex.replace("#", "");
    let r: number, g: number, b: number;

    if (cleaned.length === 3) {
      r = parseInt(cleaned[0] + cleaned[0], 16);
      g = parseInt(cleaned[1] + cleaned[1], 16);
      b = parseInt(cleaned[2] + cleaned[2], 16);
    } else if (cleaned.length === 6) {
      r = parseInt(cleaned.substring(0, 2), 16);
      g = parseInt(cleaned.substring(2, 4), 16);
      b = parseInt(cleaned.substring(4, 6), 16);
    } else {
      return null;
    }

    return [r, g, b];
  }

  private relativeLuminance(rgb: [number, number, number]): number {
    const [r, g, b] = rgb.map((c) => {
      const sRGB = c / 255;
      return sRGB <= 0.03928
        ? sRGB / 12.92
        : Math.pow((sRGB + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  }

  private contrastRatio(
    fg: [number, number, number],
    bg: [number, number, number]
  ): number {
    const l1 = this.relativeLuminance(fg);
    const l2 = this.relativeLuminance(bg);
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);
    return (lighter + 0.05) / (darker + 0.05);
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
  { name: "nordlig-ux-review", version: "1.0.0" },
  { capabilities: { tools: {} } }
);

const agent = new UxReviewAgent();

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "review_component",
      description:
        "Full UX review: Nordic principles, accessibility, interactions, consistency",
      inputSchema: {
        type: "object" as const,
        properties: {
          componentPath: { type: "string", description: "Absolute path to component directory" },
          componentName: { type: "string", description: "Component name" },
        },
        required: ["componentPath", "componentName"],
      },
    },
    {
      name: "check_contrast",
      description:
        "Check WCAG contrast ratio between two colors",
      inputSchema: {
        type: "object" as const,
        properties: {
          foreground: { type: "string", description: "Foreground hex color (#RRGGBB)" },
          background: { type: "string", description: "Background hex color (#RRGGBB)" },
          fontSize: { type: "number", description: "Font size in px (optional)" },
          isBold: { type: "boolean", description: "Whether text is bold (optional)" },
        },
        required: ["foreground", "background"],
      },
    },
    {
      name: "validate_nordic_principles",
      description:
        "Validate component against Nordic design principles only",
      inputSchema: {
        type: "object" as const,
        properties: {
          componentPath: { type: "string", description: "Absolute path to component directory" },
        },
        required: ["componentPath"],
      },
    },
    {
      name: "compare_components",
      description:
        "Compare multiple components for visual consistency",
      inputSchema: {
        type: "object" as const,
        properties: {
          componentPaths: {
            type: "array",
            items: { type: "string" },
            description: "Absolute paths to component directories",
          },
        },
        required: ["componentPaths"],
      },
    },
  ],
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  let result: unknown;
  switch (name) {
    case "review_component":
      result = await agent.reviewComponent(args as {
        componentPath: string;
        componentName: string;
      });
      break;
    case "check_contrast":
      result = await agent.checkContrast(args as {
        foreground: string;
        background: string;
        fontSize?: number;
        isBold?: boolean;
      });
      break;
    case "validate_nordic_principles":
      result = await agent.validateNordicPrinciples(args as {
        componentPath: string;
      });
      break;
    case "compare_components":
      result = await agent.compareComponents(args as {
        componentPaths: string[];
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
  console.error("UX Review Agent running on stdio");
}

main().catch(console.error);
