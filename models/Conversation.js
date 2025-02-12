
const mongoose=require("mongoose");

const convSchema=new mongoose.Schema({
    participants:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"}
    ],
    messages:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Message",
        default:[]
    }]
},{timestamps:true})

const conversation= mongoose.model("conversation",convSchema);

module.exports=conversation;