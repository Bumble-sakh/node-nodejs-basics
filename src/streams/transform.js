import { Transform } from "stream";

const transform = async () => {
  console.log("Введите текст для переворота:");
  console.log("(После ввода текста нажмите Enter для получения результата)");
  console.log("(Для выхода из приложения нажмите Ctrl+C)");

  const reverseTransform = new Transform({
    transform(chunk, encoding, callback) {
      const reversed = chunk.toString().split("").reverse().join("") + "\n";
      callback(null, reversed);
      // После каждого преобразования выводим приглашение снова
      console.log("\nВведите текст для переворота:");
    },
  });

  process.stdin.pipe(reverseTransform).pipe(process.stdout);

  process.on("SIGINT", () => {
    console.log("\n\nВыход из приложения...");
    process.exit(0);
  });
};

await transform();
