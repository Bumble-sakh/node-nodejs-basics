import fs from 'fs/promises';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const create = async () => {
  const filePath = path.join(__dirname, 'files', 'fresh.txt');

  await fs
    .open(filePath, 'wx')
    .then((file) => {
      file.write('I am fresh and young');
      file.close();
    })
    .catch((err) => {
      if (err.code === 'EEXIST') {
        throw new Error('FS operation failed');
      }
    });
};

await create();
