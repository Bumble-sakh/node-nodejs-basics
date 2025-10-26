import path from "path";
import { promises as fsPromises } from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SOURCE_DIR = path.join(__dirname, "files");
const TARGET_DIR = path.join(__dirname, "files_copy");

const copy = async () => {
  try {
    await fsPromises.access(SOURCE_DIR);

    try {
      await fsPromises.access(TARGET_DIR);
      throw new Error("FS operation failed");
    } catch (error) {
      if (error.code !== "ENOENT") {
        throw new Error("FS operation failed");
      }
    }

    await fsPromises.mkdir(TARGET_DIR);

    await fsPromises.cp(SOURCE_DIR, TARGET_DIR, { recursive: true });

    console.log("Directory copied successfully");
  } catch (error) {
    if (error.code === "ENOENT") {
      throw new Error("FS operation failed");
    }
    throw error;
  }
};

await copy();
