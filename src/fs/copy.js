import fs from 'fs/promises';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const copy = async () => {
  const srcPath = path.resolve(__dirname, 'files');
  const destPath = path.resolve(__dirname, 'files_copy');

  await fs.opendir(srcPath).catch((err) => {
    if (err.code === 'ENOENT') {
      throw new Error('FS operation failed');
    }
  });

  await fs.cp(srcPath, destPath, { force: false, errorOnExist: true, recursive: true }).catch((err) => {
    if (err.code === 'ERR_FS_CP_EEXIST') {
      throw new Error('FS operation failed');
    }
  });
};

copy();
