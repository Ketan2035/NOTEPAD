const express=require("express")
const mongoose=require("mongoose");
const path=require("path");

const app=express();
const chat=require("./models/note");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname ,"public")));
app.use(express.urlencoded({extended: true}));

main().then((res)=>{
    console.log("connection succesfull");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/notepad');
}

app.get("/note",(req,res)=>{
    res.send("working");
})

app.get("/",(req,res)=>{
    res.send("working");
})

app.listen(8080,(req,res)=>{
    console.log("connected successfully");
})