import crypto from 'crypto';
import fs from 'fs/promises';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const calculateHash = async () => {
  const filePath = path.resolve(__dirname, 'files', 'fileToCalculateHashFor.txt');

  const file = await fs.open(filePath);

  const hash = crypto.createHash('md5');
  const readStream = file.createReadStream(file);

  readStream.on('readable', () => {
    const data = readStream.read();
    if (data) {
      hash.update(data);
    } else {
      console.log(hash.digest('hex'));
    }
  });
};

await calculateHash();
