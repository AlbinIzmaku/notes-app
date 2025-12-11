import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import * as fs from "node:fs/promises";

const rl = readline.createInterface({ input, output });

try {
  const answer = await rl.question("What operation you want: ");

  const task = answer.split(" --");
  const [operation, flag1, flag2] = task;

  if (!operation) {
    throw new Error("No operation provided.");
  }

  const titleValue = flag1?.split("=")[1]?.replace(/"/g, "") ?? null;
  const bodyValue = flag2?.split("=")[1]?.replace(/"/g, "") ?? null;

  const file = await fs.open("./notes.json", "r+");
  const data = await file.readFile({ encoding: "utf8" });

  let notes = [];
  try {
    notes = JSON.parse(data);
  } catch {
    throw new Error("notes.json contains invalid JSON.");
  }
  const lastId = notes[notes.length - 1]?.id + 1 || 1;

  switch (operation) {
    case "add":
      if (!titleValue) throw new Error("Title is required to add a note.");
      if (!bodyValue) throw new Error("Body is required to add a note.");
      const newNote = {
        id: lastId,
        title: titleValue,
        body: bodyValue,
      };
      notes.push(newNote);
      await fs.writeFile("./notes.json", JSON.stringify(notes, null, 2));
      console.log("✅ Note added successfully");
      break;
    case "find":
      if (!titleValue) throw new Error("Title is required to find a note.");

      const found = notes.find((n) => n.title === titleValue);
      if (!found) throw new Error("Note not found.");
      console.log("📌 Found note:");
      console.log("Title:", found.title);
      console.log("Body:", found.body);
      break;
    case "remove":
      if (!titleValue) throw new Error("Title is required to remove a note.");

      const index = notes.findIndex((n) => n.title === titleValue);
      if (index === -1) throw new Error("Note not found.");

      const removed = notes.splice(index, 1)[0];
      await fs.writeFile("./notes.json", JSON.stringify(notes, null, 2));
      console.log("🗑️ Removed note:", removed.title);
      break;
    case "list":
      if (!notes.length) {
        console.log("No notes found.");
      } else {
        console.log("📒 Notes:");
        notes.forEach((n) => console.log("- " + n.title));
      }
      break;
    default:
      throw new Error(`Unknown operation: ${operation}`);
  }

  await file.close();
} catch (err) {
  console.error("❌ Error: ", err.message);
} finally {
  rl.close();
}
//add --title="Shopping" --body="Buy milk"
//add --title="Gym" --body="Go at 20:00"
