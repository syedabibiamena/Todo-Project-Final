import React, { useState, useEffect } from "react";
import axios from "axios";

const API = "http://localhost:5000/api/todo_task";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [search, setSearch] = useState(""); 

  const loadTasks = async () => {
    const res = await axios.get(API);
    setTasks(res.data);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const addTask = async () => {
    if (title === "") return;
    await axios.post(API, { title });
    setTitle("");
    loadTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(API + "/" + id);
    loadTasks();
  };

  const toggleStatus = async (task) => {
    const newStatus = task.status === "completed" ? "pending" : "completed";
    await axios.patch(API + "/" + task._id + "/status", { status: newStatus });
    loadTasks();
  };

  const filteredTasks = tasks.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ width: "400px", margin: "auto" }}>
      <h2>Todo App</h2>

      
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter task"
      />
      <button onClick={addTask}>Add</button>

      <br /><br />

      
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search task..."
        style={{ width: "50%", padding: "5px" }}
      />

      <br /><br />

      
      {filteredTasks.map((t) => (
        <div key={t._id}>
          <p
            style={{
              textDecoration:
                t.status === "completed" ? "line-through" : "none",
            }}
          >
            {t.title}
          </p>

          <button onClick={() => toggleStatus(t)}>Complete</button>
          <button onClick={() => deleteTask(t._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;
