// import * as fs from "node:fs";
// const notes = JSON.parse(fs.readFileSync("./notes.json"));
// console.log(notes);
import notes from "./notes.json" with { type: "json" };

console.log(notes);
