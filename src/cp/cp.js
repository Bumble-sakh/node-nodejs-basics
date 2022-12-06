import child_process from 'child_process';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const spawnChildProcess = async (args) => {
  const scriptPath = path.resolve(__dirname, 'files', 'script.js');
  const child = child_process.fork(scriptPath, args);

  child.on('close', (code) => console.log(`Child process exited. Code: ${code}`));
};

spawnChildProcess(['one', 'two', 'three']);
