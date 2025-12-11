import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import * as fs from "node:fs/promises";



const rl = readline.createInterface({ input, output });
const answer = await rl.question("What operation you want: ");

//add --title="Shopping" --body="Buy milk"
//add --title="Gym" --body="Go at 20:00"
const task = answer.split(" --");

const [operation, flag1, flag2] = task;

const titleValue = flag1?.split("=")[1]?.replace(/"/g, "");
const bodyValue = flag2?.split("=")[1]?.replace(/"/g, "");

const notes = await fs.open("./notes.json", "r+");
const readNotes = await notes.readFile({ encoding: "utf8" });
const formattedNotes = JSON.parse(readNotes);
const lastId = formattedNotes[formattedNotes.length - 1]?.id + 1;

const note = {
  id: lastId ? lastId : 1,
  title: titleValue,
  body: bodyValue,
};

// console.log(formattedNotes);

try {
  if (operation === "add") {
    formattedNotes.push(note);
    await fs.writeFile("./notes.json", JSON.stringify(formattedNotes));
    console.log("✅ Note added successfully");
  }
} catch (err) {
  console.error(err.message);
}

if (operation === "find") {
  const readNote = formattedNotes.find((note) => note.title === titleValue);
  console.log(readNote.body);
}

if (operation === "remove") {
  const matchIndex = formattedNotes.findIndex(
    (note) => note.title === titleValue
  );

  const removeNote = formattedNotes.splice(matchIndex, 1);

  await fs.writeFile("./notes.json", JSON.stringify(formattedNotes));
}

if (operation === "list") {
  formattedNotes.map((note) => {
    console.log(note.title);
  });
}

await notes.close();
rl.close();
