import * as readline from "node:readline/promises";
import * as fs from "node:fs/promises";
import * as os from "node:os";
import { stdin as input, stdout as output } from "node:process";
import path from "node:path";

const rl = readline.createInterface({ input, output });

//❌ ✅ ❗ ✔ ❓
const answer = await rl.question("What operation you want: ");

const operations = answer.split(" ");
const command = operations[0];
const file = operations[1];
const message = operations[2];

const homeDir = os.homedir();
const pathFile = path.join(homeDir, file);

try {
  await fs.mkdir(homeDir, {
    recursive: true,
  });
} catch (err) {
  console.error(err.message);
}

let fileHandle;
try {
  if (command === "add") {
    fileHandle = await fs.open(pathFile, "wx");

    console.log("✅  File created successfully");
  }
  if (command === "append") {
    const fileAppend = await rl.question("What do you want to append: \n");
    await fs.appendFile(pathFile, fileAppend + "\n");
    console.log(fileAppend);
  }
  if (command === "delete") {
    await fs.unlink(pathFile);
    console.log("❌ File is removed successfully");
  }
} catch (err) {
  console.error(err.message);
} finally {
  if (fileHandle) {
    await fileHandle.close();
  }
}
// try {
//   await fs.writeFile(pathFile, "Hello World!");
//   console.log(`Directory is created at ${pathFile}`);
// } catch (err) {
//   console.error(err);
// }

rl.close();
