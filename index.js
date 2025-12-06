import * as readline from "node:readline/promises";
import * as fs from "node:fs/promises";
import * as os from "node:os";
import { stdin as input, stdout as output } from "node:process";
import path from "node:path";
const rl = readline.createInterface({ input, output });

//❌ ✅ ❗
const answer = await rl.question("What operation you want: ");
// console.log(answer)
const operations = answer.split(" ");
// console.log(operations);
const homeDir = os.homedir();

try {
  await fs.mkdir(homeDir, {
    recursive: true,
  });
  const pathFile = path.join(homeDir, operations[1]);
  await fs.writeFile(pathFile, "Hello World!");

  console.log(`Directory is created at ${homeDir}\\${operations[1]}`);
} catch (err) {
  console.error(err);
}

rl.close();
