const mongoose=require("mongoose");

const noteSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
    },
    written_at:{
        type:Date,
        required:true
    }
})

const note=mongoose.model("note",noteSchema);

module.exports=note;