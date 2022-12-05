import { Worker } from 'worker_threads';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import os from 'os';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const createWorker = (path, workerData) => {
  return new Promise((resolve, reject) => {
    const worker = new Worker(path, { workerData });

    worker.on('message', (data) => resolve({ status: 'resolved', data }));
    worker.on('error', (data) => reject({ status: 'error', data: null }));
    worker.on('exit', (code) => {
      if (code !== 0) reject({ status: 'error', data: null });
    });
  });
};

const performCalculations = async () => {
  const workerPath = path.resolve(__dirname, 'worker.js');
  const cores = os.cpus().length;
  const workers = [];

  for (let i = 10; i < 10 + cores; i++) {
    const worker = createWorker(workerPath, i);
    workers.push(worker);
  }

  Promise.allSettled(workers).then((results) => console.log(results.map((result) => result.value || result.reason)));
};

await performCalculations();
