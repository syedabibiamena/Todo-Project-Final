
import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
  title:String,
  status:{
    type:String,
    default:"pending"
  }
});

export default mongoose.model("Todo", TodoSchema);
