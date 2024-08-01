import mongoose from "mongoose";


const brandSchema = new mongoose.Schema({
    name:String,
    logo:String,
    url:String
})

export default mongoose.model("brands", brandSchema);