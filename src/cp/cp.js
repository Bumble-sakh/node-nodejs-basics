import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { stdin, stdout } from "node:process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const SCRIPT_PATH = join(__dirname, "files", "script.js");

const spawnChildProcess = async (...args) => {
  const childProcess = spawn("node", [SCRIPT_PATH, ...args], {
    stdio: ["pipe", "pipe", "pipe"],
  });

  stdin.pipe(childProcess.stdin);
  childProcess.stdout.pipe(stdout);

  childProcess.stderr.on("data", (data) => {
    console.error(`Child process stderr: ${data}`);
  });

  childProcess.on("exit", (code) => {
    console.log(`Child process exited with code ${code}`);
  });
};

spawnChildProcess("someArgument1", "someArgument2", "...");
