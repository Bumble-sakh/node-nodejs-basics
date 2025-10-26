import { createReadStream, createWriteStream } from "fs";
import { createGzip } from "zlib";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const FILE_PATH = join(__dirname, "files", "fileToCompress.txt");
const ARCHIVE_PATH = join(__dirname, "files", "archive.gz");

const compress = async () => {
  const readStream = createReadStream(FILE_PATH);
  const writeStream = createWriteStream(ARCHIVE_PATH);
  const gzipStream = createGzip();

  readStream.pipe(gzipStream).pipe(writeStream);

  readStream.on("error", (error) => {
    console.error("Error reading file:", error);
  });

  writeStream.on("error", (error) => {
    console.error("Error writing archive:", error);
  });

  writeStream.on("finish", () => {
    console.log("File compressed successfully!");
  });
};

await compress();
