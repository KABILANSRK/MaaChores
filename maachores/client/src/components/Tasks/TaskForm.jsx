import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskForm = ({ onTaskSubmit, editingTask, clearEditingTask }) => {
  const [task, setTask] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("pending");

  // Set form values when editing
  useEffect(() => {
    if (editingTask) {
      setTask(editingTask.task);
      setDueDate(editingTask.dueDate.slice(0, 10)); // Remove time part
      setStatus(editingTask.status);
    }
  }, [editingTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const taskData = {
      task,
      dueDate,
      status,
    };

    try {
      if (editingTask) {
        // Update
        await axios.put(`http://localhost:5000/api/tasks/${editingTask._id}`, taskData);
      } else {
        // Add
        await axios.post("http://localhost:5000/api/tasks", taskData);
      }

      onTaskSubmit(); // Fetch tasks again in parent
      setTask("");
      setDueDate("");
      setStatus("pending");
      clearEditingTask(); // Reset editing state
    } catch (err) {
      console.error("Task operation failed:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="addTask">
        <label>{editingTask ? "Edit Task:" : "Add Task:"}</label>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          required
          autoFocus
        />
      </div>
      <div className="dueDate">
        <label>Due Date:</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />
      </div>
      <div className="status">
        <label>Status:</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)} required>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <div className="btn">
        <button type="submit">{editingTask ? "Update Task" : "Add Task"}</button>
        {editingTask && (
          <button type="button" onClick={clearEditingTask} style={{ marginLeft: '10px' }}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default TaskForm;
