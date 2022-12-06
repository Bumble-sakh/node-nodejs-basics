import { stdin, stdout } from 'process';
import { Transform } from 'stream';

const reverse = new Transform();
reverse._transform = (chunk, encoding, callback) => {
  try {
    const resultString = `${chunk.toString('utf8').split('').reverse().join('')}\n`;

    callback(null, resultString);
  } catch (err) {
    callback(err);
  }
};

const transform = async () => {
  stdin.pipe(reverse).pipe(stdout);
};

await transform();
