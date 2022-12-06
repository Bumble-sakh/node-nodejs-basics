import fs from 'fs/promises';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const read = async () => {
  const filePath = path.resolve(__dirname, 'files', 'fileToRead.txt');

  const data = await fs.readFile(filePath, { encoding: 'utf-8' }).catch((err) => {
    if (err.code === 'ENOENT') {
      throw new Error('FS operation failed');
    }
  });

  console.log(data);
};

await read();
