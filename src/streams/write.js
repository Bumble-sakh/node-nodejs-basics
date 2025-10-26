import { createWriteStream } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const FILE_PATH = join(__dirname, "files", "fileToWrite.txt");

const write = async () => {
  const writeStream = createWriteStream(FILE_PATH);

  console.log("Введите текст (для завершения ввода нажмите Ctrl+C):");

  process.stdin.pipe(writeStream);

  process.stdin.on("error", (error) => {
    console.error("Error reading from stdin:", error);
  });

  writeStream.on("error", (error) => {
    console.error("Error writing to file:", error);
  });

  writeStream.on("finish", () => {
    console.log("\nЗавершение записи...");
    process.exit(0);
  });

  process.stdin.on("end", () => {
    writeStream.end();
  });

  process.on("SIGINT", () => {
    console.log("\nЗавершение записи...");
    writeStream.end();
    process.exit(0);
  });
};

await write();
