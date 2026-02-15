#!/usr/bin/env node

import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Load .env from project root
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "../../../../");
dotenv.config({ path: path.join(projectRoot, ".env") });

import { Orchestrator } from "../../orchestrator/build/index.js";
import readline from "readline";

// ─── Helpers ────────────────────────────────────────────────────────────────

function printBanner() {
  console.log(`
╔══════════════════════════════════════════════════════════════╗
║  🏔️  NORDLIG DESIGN SYSTEM — Multi-Agent Orchestrator       ║
║  Version 1.0.0                                              ║
╚══════════════════════════════════════════════════════════════╝
  `);
}

function printHelp() {
  console.log(`
Commands:
  req <requirement>     Analyze requirement and execute agent workflow
  validate <path>       Validate a component against all rules
  review <path>         Run UX review on a component
  tokens <path>         Validate token compliance
  contrast <fg> <bg>    Check WCAG contrast ratio
  list                  List all components
  status                Show agent status
  tools <agent>         List tools for an agent
  hr-zones <rest> <max> Calculate HR zones
  help                  Show this help
  exit                  Shutdown and exit

Examples:
  pnpm orchestrate req "Add a Tooltip component with hover trigger"
  pnpm orchestrate validate packages/components/src/atoms/Button
  pnpm orchestrate review packages/components/src/atoms/Badge
  pnpm orchestrate contrast "#0ea5e9" "#ffffff"
  pnpm orchestrate hr-zones 48 190
`);
}

async function askConfirmation(question: string): Promise<boolean> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.toLowerCase() === "y" || answer.toLowerCase() === "yes");
    });
  });
}

// ─── Command Handlers ───────────────────────────────────────────────────────

async function handleReq(orchestrator: Orchestrator, input: string) {
  console.log(`\n📋 Analyzing requirement: "${input}"\n`);

  // Step 1: Analyze
  const analysis = (await orchestrator.callAgent(
    "requirements",
    "analyze_requirement",
    { input }
  )) as Record<string, unknown>;

  console.log("\n📊 Analysis:");
  console.log(JSON.stringify(analysis, null, 2));

  // Step 2: Create specification
  const spec = (await orchestrator.callAgent(
    "requirements",
    "create_specification",
    { requirement: analysis }
  )) as Record<string, unknown>;

  console.log("\n📝 Specification:");
  console.log(JSON.stringify(spec, null, 2));

  // Step 3: Break down tasks
  const taskPlan = (await orchestrator.callAgent(
    "requirements",
    "break_down_tasks",
    { specification: spec }
  )) as { tasks: Array<Record<string, unknown>>; execution_order?: string };

  console.log("\n🎯 Execution Plan:");
  console.log(taskPlan.execution_order || "");
  if (taskPlan.tasks) {
    for (const task of taskPlan.tasks) {
      console.log(
        `  - [${task.id}] ${task.agent}/${task.action} ${task.parallel ? "(parallel)" : "(sequential)"}`
      );
    }
  }

  // Step 4: Confirm
  const proceed = await askConfirmation("\n▶️  Proceed with execution? (y/n): ");

  if (!proceed) {
    console.log("❌ Cancelled by user\n");

    // Remember the decision
    await orchestrator.callAgent("requirements", "remember_decision", {
      decision: {
        context: input,
        decision: "Cancelled by user after planning",
        reasoning: "User reviewed plan and chose not to proceed",
      },
    });

    return;
  }

  // Step 5: Execute tasks
  if (taskPlan.tasks && taskPlan.tasks.length > 0) {
    console.log("\n🚀 Executing workflow...\n");
    const results = await orchestrator.executeWorkflow(
      taskPlan.tasks as Array<{
        id: string;
        agent: string;
        action: string;
        input: Record<string, unknown>;
        dependencies: string[];
        parallel: boolean;
      }>
    );

    // Step 6: Validate
    console.log("\n🔍 Validating results...\n");
    const validation = await orchestrator.callAgent(
      "requirements",
      "validate_results",
      { results, specification: spec }
    );

    console.log("\n✅ Validation:");
    console.log(JSON.stringify(validation, null, 2));

    // Remember the decision
    await orchestrator.callAgent("requirements", "remember_decision", {
      decision: {
        context: input,
        decision: `Completed: ${(spec as { title?: string }).title || input}`,
        reasoning: `Executed ${results.length} tasks. Validation: ${JSON.stringify(validation)}`,
      },
    });
  } else {
    console.log("No tasks to execute.");
  }
}

async function handleValidate(orchestrator: Orchestrator, componentPath: string) {
  console.log(`\n🔍 Validating component: ${componentPath}\n`);

  const [tokenResult, nordicResult] = await Promise.all([
    orchestrator.callAgent("testing", "validate_tokens", { componentPath }),
    orchestrator.callAgent("ux-review", "validate_nordic_principles", {
      componentPath,
    }),
  ]);

  console.log("\n📊 Token Compliance:");
  console.log(JSON.stringify(tokenResult, null, 2));

  console.log("\n🏔️ Nordic Principles:");
  console.log(JSON.stringify(nordicResult, null, 2));
}

async function handleReview(orchestrator: Orchestrator, componentPath: string) {
  const componentName = componentPath.split("/").pop() || "Unknown";
  console.log(`\n🎨 UX Review: ${componentName}\n`);

  const result = await orchestrator.callAgent("ux-review", "review_component", {
    componentPath,
    componentName,
  });

  console.log(JSON.stringify(result, null, 2));
}

// ─── Main ───────────────────────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  if (!command || command === "help") {
    printBanner();
    printHelp();
    return;
  }

  const orchestrator = new Orchestrator();

  // Determine which agents to start based on command
  const agentMap: Record<string, Array<"requirements" | "design-system" | "testing" | "ux-review" | "documentation" | "training-analyzer">> = {
    req: ["requirements", "design-system", "testing", "ux-review", "documentation"],
    validate: ["testing", "ux-review"],
    review: ["ux-review"],
    tokens: ["testing"],
    contrast: ["ux-review"],
    list: ["design-system"],
    tools: [],
    status: [],
    "hr-zones": ["training-analyzer"],
  };

  const neededAgents = agentMap[command];
  if (neededAgents === undefined) {
    console.error(`❌ Unknown command: ${command}`);
    printHelp();
    return;
  }

  try {
    printBanner();

    if (neededAgents.length > 0) {
      await orchestrator.initialize(neededAgents);
    }

    switch (command) {
      case "req": {
        const input = args.slice(1).join(" ");
        if (!input) {
          console.error("❌ Please provide a requirement. Example:");
          console.error('   pnpm orchestrate req "Add a Label component"');
          break;
        }
        await handleReq(orchestrator, input);
        break;
      }

      case "validate": {
        const componentPath = args[1];
        if (!componentPath) {
          console.error("❌ Please provide a component path");
          break;
        }
        await handleValidate(orchestrator, componentPath);
        break;
      }

      case "review": {
        const componentPath = args[1];
        if (!componentPath) {
          console.error("❌ Please provide a component path");
          break;
        }
        await handleReview(orchestrator, componentPath);
        break;
      }

      case "tokens": {
        const componentPath = args[1];
        if (!componentPath) {
          console.error("❌ Please provide a component path");
          break;
        }
        console.log(`\n🔍 Validating tokens: ${componentPath}\n`);
        const result = await orchestrator.callAgent("testing", "validate_tokens", {
          componentPath,
        });
        console.log(JSON.stringify(result, null, 2));
        break;
      }

      case "contrast": {
        const fg = args[1];
        const bg = args[2];
        if (!fg || !bg) {
          console.error("❌ Usage: contrast <foreground> <background>");
          console.error('   Example: contrast "#0ea5e9" "#ffffff"');
          break;
        }
        const result = await orchestrator.callAgent("ux-review", "check_contrast", {
          foreground: fg,
          background: bg,
        });
        console.log(JSON.stringify(result, null, 2));
        break;
      }

      case "list": {
        const result = await orchestrator.callAgent(
          "design-system",
          "list_components",
          {}
        );
        console.log(JSON.stringify(result, null, 2));
        break;
      }

      case "tools": {
        const agentName = args[1];
        if (!agentName) {
          console.log("Available agents:");
          console.log("  requirements, design-system, testing, ux-review, documentation, training-analyzer");
          break;
        }
        await orchestrator.initialize([agentName as "requirements"]);
        const tools = await orchestrator.listAgentTools(agentName);
        console.log(`\nTools for ${agentName}:`);
        for (const tool of tools) {
          console.log(`  ${tool.name}: ${tool.description}`);
        }
        break;
      }

      case "status": {
        const status = orchestrator.getStatus();
        console.log(JSON.stringify(status, null, 2));
        break;
      }

      case "hr-zones": {
        const restingHr = parseInt(args[1], 10);
        const maxHr = parseInt(args[2], 10);
        if (isNaN(restingHr) || isNaN(maxHr)) {
          console.error("❌ Usage: hr-zones <resting_hr> <max_hr>");
          console.error("   Example: hr-zones 48 190");
          break;
        }
        const result = await orchestrator.callAgent(
          "training-analyzer",
          "determine_hr_zones",
          { restingHr, maxHr }
        );
        console.log(JSON.stringify(result, null, 2));
        break;
      }
    }
  } catch (error) {
    console.error("\n❌ Error:", error instanceof Error ? error.message : error);
  } finally {
    await orchestrator.shutdown();
  }
}

main().catch(console.error);
