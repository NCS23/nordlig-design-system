import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import Anthropic from "@anthropic-ai/sdk";
import fs from "fs/promises";

// ─── Embedded Knowledge ─────────────────────────────────────────────────────

const KNOWLEDGE = `
You are the Training Analyzer Domain Expert for the Nordlig Design System.

YOUR ROLE:
- Domain expert for running/training data analysis
- Parse German CSV training data from Garmin/Polar exports
- Calculate training metrics (pace, HR zones, TRIMP, TSS)
- Provide running-specific component guidance
- Generate realistic training data for Storybook examples

GERMAN CSV FORMAT:
- Separator: semicolon (;)
- Decimal: comma (1,5 = 1.5)
- Date: DD.MM.YYYY
- Time: HH:MM:SS
- Headers may include: Datum, Uhrzeit, Dauer, Distanz, Pace, HF, Kadenz, Runde

TRAINING METRICS:
1. Pace: min/km (e.g., 5:30/km)
   - Easy: >5:30/km
   - Moderate: 4:45-5:30/km
   - Tempo: 4:15-4:45/km
   - Threshold: 3:50-4:15/km
   - Interval: <3:50/km

2. Heart Rate Zones (Karvonen method):
   - Zone 1 (Recovery): 50-60% HRR
   - Zone 2 (Aerobic): 60-70% HRR
   - Zone 3 (Tempo): 70-80% HRR
   - Zone 4 (Threshold): 80-90% HRR
   - Zone 5 (VO2max): 90-100% HRR

3. Training Load:
   - TRIMP = Duration(min) * HRR-fraction * weighting
   - TSS approximation for running
   - Weekly volume tracking

4. Session Types:
   - Dauerlauf (Easy Run)
   - Tempodauerlauf (Tempo Run)
   - Intervalltraining (Intervals)
   - Langer Lauf (Long Run)
   - Regenerationslauf (Recovery Run)
   - Fahrtspiel (Fartlek)
   - Wettkampf (Race)

COMPONENT SUGGESTIONS FOR TRAINING DATA:
- StatCard: Weekly distance, average pace, total duration
- Chart (Line): Pace/HR over time, weekly volume trend
- Chart (Bar): Distance per weekday, zone distribution
- Timeline: Training log entries
- Progress: Goal completion (monthly km target)
- Table: Lap splits, session history
- Badge: Session type, intensity level
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

class TrainingAnalyzerAgent {
  private anthropic: Anthropic;

  constructor() {
    this.anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY!,
    });
  }

  async parseCsv(spec: { filePath?: string; csvContent?: string }) {
    let content: string;

    if (spec.filePath) {
      content = await fs.readFile(spec.filePath, "utf-8");
    } else if (spec.csvContent) {
      content = spec.csvContent;
    } else {
      throw new Error("Either filePath or csvContent required");
    }

    const lines = content.split("\n").filter((l) => l.trim());
    if (lines.length < 2) {
      return { error: "CSV has fewer than 2 lines", sessions: [] };
    }

    const headers = lines[0].split(";").map((h) => h.trim());
    const sessions = lines.slice(1).map((line) => {
      const values = line.split(";").map((v) => v.trim());
      const record: Record<string, string> = {};
      headers.forEach((h, i) => {
        record[h] = values[i] || "";
      });
      return record;
    });

    return {
      headers,
      sessionCount: sessions.length,
      sessions,
      preview: sessions.slice(0, 5),
    };
  }

  async analyzeSession(spec: { session: Record<string, string> }) {
    const response = await this.anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 4000,
      system: KNOWLEDGE,
      messages: [
        {
          role: "user",
          content: `Analyze this training session. Return ONLY valid JSON (no markdown):

${JSON.stringify(spec.session, null, 2)}

Parse German number format (comma = decimal).
Determine session type, calculate metrics.

Return JSON:
{
  "date": "YYYY-MM-DD",
  "session_type": "Dauerlauf|Tempodauerlauf|Intervalltraining|Langer Lauf|Regenerationslauf|Fahrtspiel|Wettkampf",
  "distance_km": 0.0,
  "duration_minutes": 0.0,
  "avg_pace_per_km": "M:SS",
  "avg_hr": 0,
  "hr_zone": "Zone 1-5",
  "intensity": "easy|moderate|hard|very_hard",
  "estimated_trimp": 0,
  "notes": "..."
}`,
        },
      ],
    });

    const text =
      response.content[0].type === "text" ? response.content[0].text : "";
    return parseJsonResponse(text);
  }

  async calculateMetrics(spec: { sessions: Record<string, string>[] }) {
    const response = await this.anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 8000,
      system: KNOWLEDGE,
      messages: [
        {
          role: "user",
          content: `Calculate aggregate training metrics for these sessions. Return ONLY valid JSON (no markdown):

${JSON.stringify(spec.sessions, null, 2)}

Calculate:
- Total/avg distance, duration, pace
- HR zone distribution
- Weekly volume
- Training load trend
- Session type distribution

Return JSON:
{
  "period": { "start": "...", "end": "..." },
  "totals": {
    "sessions": 0,
    "distance_km": 0.0,
    "duration_hours": 0.0,
    "elevation_m": 0
  },
  "averages": {
    "distance_km": 0.0,
    "pace_per_km": "M:SS",
    "hr": 0,
    "sessions_per_week": 0.0
  },
  "hr_zone_distribution": {
    "zone1_pct": 0, "zone2_pct": 0, "zone3_pct": 0, "zone4_pct": 0, "zone5_pct": 0
  },
  "session_types": { "Dauerlauf": 0, "Intervalltraining": 0, ... },
  "weekly_volume": [{ "week": "...", "distance_km": 0.0, "sessions": 0 }],
  "training_load": { "estimated_ctl": 0, "trend": "building|maintaining|tapering" }
}`,
        },
      ],
    });

    const text =
      response.content[0].type === "text" ? response.content[0].text : "";
    return parseJsonResponse(text);
  }

  async determineHrZones(spec: {
    restingHr: number;
    maxHr: number;
  }) {
    const hrr = spec.maxHr - spec.restingHr;

    return {
      method: "Karvonen",
      resting_hr: spec.restingHr,
      max_hr: spec.maxHr,
      heart_rate_reserve: hrr,
      zones: {
        zone1: {
          name: "Regeneration",
          min: Math.round(spec.restingHr + hrr * 0.5),
          max: Math.round(spec.restingHr + hrr * 0.6),
          description: "Leichtes Joggen, aktive Erholung",
        },
        zone2: {
          name: "Aerob",
          min: Math.round(spec.restingHr + hrr * 0.6),
          max: Math.round(spec.restingHr + hrr * 0.7),
          description: "Grundlagen-Ausdauer, Dauerlauf",
        },
        zone3: {
          name: "Tempo",
          min: Math.round(spec.restingHr + hrr * 0.7),
          max: Math.round(spec.restingHr + hrr * 0.8),
          description: "Tempodauerlauf, Marathon-Pace",
        },
        zone4: {
          name: "Schwelle",
          min: Math.round(spec.restingHr + hrr * 0.8),
          max: Math.round(spec.restingHr + hrr * 0.9),
          description: "Schwellentraining, Halbmarathon-Pace",
        },
        zone5: {
          name: "VO2max",
          min: Math.round(spec.restingHr + hrr * 0.9),
          max: spec.maxHr,
          description: "Intervalltraining, maximale Belastung",
        },
      },
    };
  }

  async generateSampleData(spec: {
    weeks: number;
    sessionsPerWeek: number;
    level: string;
  }) {
    const response = await this.anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 8000,
      system: KNOWLEDGE,
      messages: [
        {
          role: "user",
          content: `Generate realistic training data for Storybook examples. Return ONLY valid JSON (no markdown):

Weeks: ${spec.weeks}
Sessions per week: ${spec.sessionsPerWeek}
Runner level: ${spec.level} (beginner|intermediate|advanced)

Generate realistic, varied sessions including:
- Mix of session types appropriate for the level
- Realistic paces, HR, distances
- Progressive overload pattern
- Recovery days
- German date format

Return JSON:
{
  "sessions": [
    {
      "datum": "DD.MM.YYYY",
      "typ": "Dauerlauf|...",
      "distanz_km": 0.0,
      "dauer_min": 0,
      "pace": "M:SS",
      "hf_avg": 0,
      "hf_max": 0,
      "bemerkung": "..."
    }
  ],
  "summary": { "total_km": 0, "total_sessions": 0 }
}`,
        },
      ],
    });

    const text =
      response.content[0].type === "text" ? response.content[0].text : "";
    return parseJsonResponse(text);
  }

  async suggestComponents(spec: { dataDescription: string }) {
    const response = await this.anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 4000,
      system: KNOWLEDGE,
      messages: [
        {
          role: "user",
          content: `Suggest Nordlig Design System components for visualizing this training data. Return ONLY valid JSON (no markdown):

Data: ${spec.dataDescription}

Available components: StatCard, Chart (Line/Bar/Area/Pie), Timeline, Progress, Table, Badge, Card, Alert

Return JSON:
{
  "suggestions": [
    {
      "component": "...",
      "usage": "...",
      "props": { ... },
      "example_data": { ... },
      "priority": "high|medium|low"
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
}

// ─── MCP Server ─────────────────────────────────────────────────────────────

const server = new Server(
  { name: "nordlig-training-analyzer", version: "1.0.0" },
  { capabilities: { tools: {} } }
);

const agent = new TrainingAnalyzerAgent();

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "parse_csv",
      description: "Parse German CSV training data (semicolon-separated, comma decimals)",
      inputSchema: {
        type: "object" as const,
        properties: {
          filePath: { type: "string", description: "Path to CSV file" },
          csvContent: { type: "string", description: "Raw CSV content" },
        },
      },
    },
    {
      name: "analyze_session",
      description: "Analyze a single training session (type, metrics, zones)",
      inputSchema: {
        type: "object" as const,
        properties: {
          session: { type: "object", description: "Session data as key-value pairs" },
        },
        required: ["session"],
      },
    },
    {
      name: "calculate_metrics",
      description: "Calculate aggregate metrics across multiple sessions",
      inputSchema: {
        type: "object" as const,
        properties: {
          sessions: { type: "array", items: { type: "object" }, description: "Array of session records" },
        },
        required: ["sessions"],
      },
    },
    {
      name: "determine_hr_zones",
      description: "Calculate HR zones using Karvonen method",
      inputSchema: {
        type: "object" as const,
        properties: {
          restingHr: { type: "number", description: "Resting heart rate" },
          maxHr: { type: "number", description: "Maximum heart rate" },
        },
        required: ["restingHr", "maxHr"],
      },
    },
    {
      name: "generate_sample_data",
      description: "Generate realistic training data for Storybook examples",
      inputSchema: {
        type: "object" as const,
        properties: {
          weeks: { type: "number", description: "Number of weeks" },
          sessionsPerWeek: { type: "number", description: "Sessions per week" },
          level: { type: "string", enum: ["beginner", "intermediate", "advanced"] },
        },
        required: ["weeks", "sessionsPerWeek", "level"],
      },
    },
    {
      name: "suggest_components",
      description: "Suggest Nordlig components for visualizing training data",
      inputSchema: {
        type: "object" as const,
        properties: {
          dataDescription: { type: "string", description: "Description of the training data to visualize" },
        },
        required: ["dataDescription"],
      },
    },
  ],
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  let result: unknown;
  switch (name) {
    case "parse_csv":
      result = await agent.parseCsv(args as {
        filePath?: string;
        csvContent?: string;
      });
      break;
    case "analyze_session":
      result = await agent.analyzeSession(args as {
        session: Record<string, string>;
      });
      break;
    case "calculate_metrics":
      result = await agent.calculateMetrics(args as {
        sessions: Record<string, string>[];
      });
      break;
    case "determine_hr_zones":
      result = await agent.determineHrZones(args as {
        restingHr: number;
        maxHr: number;
      });
      break;
    case "generate_sample_data":
      result = await agent.generateSampleData(args as {
        weeks: number;
        sessionsPerWeek: number;
        level: string;
      });
      break;
    case "suggest_components":
      result = await agent.suggestComponents(args as {
        dataDescription: string;
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
  console.error("Training Analyzer Agent running on stdio");
}

main().catch(console.error);
