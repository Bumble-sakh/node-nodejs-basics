import path from "path";
import { promises as fsPromises } from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FILE_NAME = "fresh.txt";
const FILE_CONTENT = "I am fresh and young";
const FILE_PATH = path.join(__dirname, "files", FILE_NAME);

const create = async () => {
  try {
    await fsPromises.access(FILE_PATH);
    throw new Error(`FS operation failed`);
  } catch (error) {
    if (error.code === "ENOENT") {
      await fsPromises.writeFile(FILE_PATH, FILE_CONTENT);
      console.log(`File ${FILE_NAME} created successfully`);
    } else {
      throw new Error(`FS operation failed`);
    }
  }
};

await create();
