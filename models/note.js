const mongoose=require("mongoose");

const noteSchema=new mongoose.Schema({
    
})

const note=mongoose.model("note",noteSchema);

module.exports=note;