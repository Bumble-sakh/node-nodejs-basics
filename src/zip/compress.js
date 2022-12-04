import fs from 'fs';
import { createGzip } from 'zlib';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compress = async () => {
  const inputPath = path.join(__dirname, 'files', 'fileToCompress.txt');
  const outputPath = path.join(__dirname, 'files', 'archive.gz');

  const compress = createGzip();
  const inputFile = fs.createReadStream(inputPath);
  const outputFile = fs.createWriteStream(outputPath);

  inputFile.pipe(compress).pipe(outputFile);
};

await compress();
