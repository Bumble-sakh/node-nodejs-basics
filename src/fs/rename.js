import path from "path";
import { promises as fsPromises } from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FILES_DIR = path.join(__dirname, "files");
const SOURCE_FILE = path.join(FILES_DIR, "wrongFilename.txt");
const TARGET_FILE = path.join(FILES_DIR, "properFilename.md");

const rename = async () => {
  try {
    await fsPromises.access(SOURCE_FILE);

    try {
      await fsPromises.access(TARGET_FILE);
      throw new Error("FS operation failed");
    } catch (error) {
      if (error.code !== "ENOENT") {
        throw new Error("FS operation failed");
      }
    }

    await fsPromises.rename(SOURCE_FILE, TARGET_FILE);

    console.log("File renamed successfully");
  } catch (error) {
    if (error.code === "ENOENT") {
      throw new Error("FS operation failed");
    }
    throw error;
  }
};

await rename();
