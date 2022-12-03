import fs from 'fs/promises';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const rename = async () => {
  const oldPath = path.resolve(__dirname, 'files', 'wrongFilename.txt');
  const newPath = path.resolve(__dirname, 'files', 'properFilename.md');

  await fs
    .access(newPath, fs.constants.F_OK)
    .then(() => {
      throw new Error('FS operation failed');
    })
    .catch((err) => {
      if (err.message === 'FS operation failed') {
        throw new Error('FS operation failed');
      }
      if (err.code === 'ENOENT') null;
    });

  await fs.rename(oldPath, newPath).catch((err) => {
    if (err.code === 'ENOENT') {
      throw new Error('FS operation failed');
    }
  });
};

await rename();
