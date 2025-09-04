const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const tailwind = require("tailwindcss");
const ejsMate = require("ejs-mate");

const app = express();
app.use(express.json());
const note = require("./models/note");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.engine("ejs", ejsMate);

main()
  .then((res) => {
    console.log("connection succesfull");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/notepad");
}

let note1 = new note({
  title: "ketan",
  content: "hhgfhjjgjkhhhjk",
  written_at: new Date(),
});

// note1.save().then((res)=>{
//     console.log(res);
// })

app.post("/", (req, res) => {
  let { title, content } = req.body;
  let newnote = new note({
    title: title,
    content: content,
    written_at: new Date(),
  });
  newnote
    .save()
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
  res.redirect("/");
});

app.get("/new", async (req, res) => {
  let notes = await note.find();
  console.log("chats");
  res.render("index.ejs", { notes });
});

app.get("/", async (req, res) => {
  let notes = await note.find();
  console.log("chats");
  res.render("index.ejs", { notes });

  //res.json({data:notes})
});

//view route

app.get("/note/:id", async (req, res) => {
  let { id } = req.params;
  let Note = await note.findById(id);
  let notes = await note.find();
  res.render("viewnote.ejs", { Note, notes });
});

//edit route

app.get("/notes/:id/edit", async (req, res) => {
  let { id } = req.params;
  let Note = await note.findById(id);
  let notes = await note.find();
  res.render("edit.ejs", { Note, notes });
});

app.listen(8080, (req, res) => {
  console.log("connected successfully");
});
