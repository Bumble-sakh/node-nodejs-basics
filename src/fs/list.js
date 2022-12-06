import fs from 'fs/promises';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const list = async () => {
  const folderPath = path.resolve(__dirname, 'files');

  const fileList = await fs.readdir(folderPath).catch((err) => {
    if (err.code === 'ENOENT') {
      throw new Error('FS operation failed');
    }
  });

  console.log(fileList);
};

await list();
