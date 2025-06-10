import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TaskList = ({ refreshFlag }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/tasks")
      .then((res) => setTasks(res.data))
      .catch((err) => console.error("Error fetching tasks", err));
  }, [refreshFlag]); 

  return (
    <ul>
        {tasks.map((task) => (
            <li key={task._id}>
                <div className="task">
                    <span className="taskName">Task: {task.name}</span>
                    <span className="dueDate">Due: {task.dueDate.slice(0, 10)}</span>
                    <span className="status">Status: {task.status}</span>
                    <button onClick={() => onEdit(task)}>Edit</button>
                    <button onClick={() => onDelete(task._id)}>Delete</button>
                </div>
            </li>
        ))}
    </ul>
  );
};

export default TaskList;
