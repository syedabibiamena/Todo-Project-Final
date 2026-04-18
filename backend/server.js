
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Todo from "./Todo.js";

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://TodoUser:checkmate@cluster0.e24rhrq.mongodb.net/?appName=Cluster0")
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));

app.get("/api/todo_task", async (req,res)=>{
  const tasks = await Todo.find();
  res.json(tasks);
});

app.post("/api/todo_task", async (req,res)=>{
  const task = new Todo(req.body);
  await task.save();
  res.json(task);
});

app.delete("/api/todo_task/:id", async (req,res)=>{
  await Todo.findByIdAndDelete(req.params.id);
  res.json({message:"Deleted"});
});

app.patch("/api/todo_task/:id/status", async (req,res)=>{
  const task = await Todo.findById(req.params.id);
  task.status = req.body.status;
  await task.save();
  res.json(task);
});

app.listen(5000, ()=>{
  console.log("Server running on port 5000");
});
