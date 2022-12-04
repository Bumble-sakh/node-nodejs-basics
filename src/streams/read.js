import fs from 'fs/promises';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const read = async () => {
  const filePath = path.resolve(__dirname, 'files', 'fileToRead.txt');
  const file = await fs.open(filePath);
  const rs = file.createReadStream();

  rs.on('data', (data) => {
    process.stdout.write(data.toString());
  });

  rs.on('end', () => {
    rs.close();
    file.close();
  });
};

await read();
