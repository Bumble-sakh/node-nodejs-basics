import { createReadStream, createWriteStream } from "fs";
import { createGunzip } from "zlib";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const ARCHIVE_PATH = join(__dirname, "files", "archive.gz");
const FILE_PATH = join(__dirname, "files", "fileToCompress.txt");

const decompress = async () => {
  const readStream = createReadStream(ARCHIVE_PATH);
  const writeStream = createWriteStream(FILE_PATH);
  const gunzipStream = createGunzip();

  readStream.pipe(gunzipStream).pipe(writeStream);

  readStream.on("error", (error) => {
    console.error("Error reading archive:", error);
  });

  writeStream.on("error", (error) => {
    console.error("Error writing file:", error);
  });

  writeStream.on("finish", () => {
    console.log("File decompressed successfully!");
  });
};

await decompress();
