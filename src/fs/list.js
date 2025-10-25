import path from "path";
import { promises as fsPromises } from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FILES_DIR = path.join(__dirname, "files");

const list = async () => {
  try {
    const files = await fsPromises.readdir(FILES_DIR);
    console.log(files);
  } catch (error) {
    console.error("FS operation failed");
  }
};

await list();
