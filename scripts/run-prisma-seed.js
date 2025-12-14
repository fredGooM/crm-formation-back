const { execSync } = require("node:child_process");
const path = require("node:path");

const repoRoot = path.resolve(__dirname, "..");

const commands = [
  "npx tsc -p tsconfig.seed.json",
  "node prisma/seed-dist/seed.js"
];

for (const cmd of commands) {
  try {
    execSync(cmd, { stdio: "inherit", cwd: repoRoot });
  } catch (error) {
    console.error(`❌ Command failed: ${cmd}`);
    process.exit(error.status ?? 1);
  }
}
