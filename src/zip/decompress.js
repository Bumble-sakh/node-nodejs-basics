import fs from 'fs';
import { createGunzip } from 'zlib';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const decompress = async () => {
  const inputPath = path.join(__dirname, 'files', 'archive.gz');
  const outputPath = path.join(__dirname, 'files', 'fileToCompress.txt');

  const decompress = createGunzip();

  const inputFile = fs.createReadStream(inputPath);
  const outputFile = fs.createWriteStream(outputPath);

  inputFile.pipe(decompress).pipe(outputFile);
};

await decompress();
