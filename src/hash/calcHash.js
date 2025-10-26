import { createReadStream } from "fs";
import { createHash } from "crypto";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const FILE_PATH = join(__dirname, "files", "fileToCalculateHashFor.txt");
const EXPECTED_HASH =
  "7b90ad9e325c1c22b15c36cbe19413e3c471e5a711b8b828c8ebfcfd71d1d6db";

const calculateHash = async () => {
  const readStream = createReadStream(FILE_PATH);

  const hash = createHash("sha256");

  readStream.on("data", (chunk) => {
    hash.update(chunk);
  });

  readStream.on("end", () => {
    const calculatedHash = hash.digest("hex");

    console.log(`Expected hash: ${EXPECTED_HASH}`);
    console.log(`Calculated hash: ${calculatedHash}`);
    console.log(
      `Result: ${
        calculatedHash === EXPECTED_HASH ? "✅ Correct" : "❌ Incorrect"
      }`
    );
  });

  readStream.on("error", (error) => {
    console.error("Ошибка при чтении файла:", error);
  });
};

await calculateHash();
