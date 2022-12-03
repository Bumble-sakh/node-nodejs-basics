import fs from 'fs/promises';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const remove = async () => {
  const filePath = path.resolve(__dirname, 'files', 'fileToRemove.txt');

  await fs.rm(filePath).catch((err) => {
    if (err.code === 'ENOENT') {
      throw new Error('FS operation failed');
    }
  });
};

await remove();
