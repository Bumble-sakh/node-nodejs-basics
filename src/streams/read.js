import { createReadStream } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const FILE_PATH = join(__dirname, "files", "fileToRead.txt");

const read = async () => {
  const readStream = createReadStream(FILE_PATH);

  readStream.pipe(process.stdout);
};

await read();
