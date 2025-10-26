import { Worker } from "worker_threads";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import os from "os";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const WORKER_PATH = join(__dirname, "worker.js");

const performCalculations = async () => {
  const numCores = os.cpus().length;
  const workers = [];
  const results = new Array(numCores);

  for (let i = 0; i < numCores; i++) {
    const workerData = 10 + i;

    const worker = new Worker(WORKER_PATH);

    const promise = new Promise((resolve) => {
      worker.on("message", (message) => {
        if (message && message.error) {
          results[i] = { status: "error", data: null };
        } else {
          results[i] = { status: "resolved", data: message };
        }
        worker.terminate();
        resolve();
      });

      worker.on("error", () => {
        results[i] = { status: "error", data: null };
        worker.terminate();
        resolve();
      });
    });

    workers.push(promise);

    worker.postMessage(workerData);
  }

  await Promise.all(workers);

  console.log(results);
};

await performCalculations();
