import fs from 'fs/promises';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const write = async () => {
  const filePath = path.resolve(__dirname, 'files', 'fileToWrite.txt');
  const file = await fs.open(filePath, 'w');
  const ws = file.createWriteStream();

  process.stdin.on('data', (data) => {
    ws.write(data);
  });

  process.stdin.on('end', () => {
    ws.close();
    file.close();
  });
};

await write();
