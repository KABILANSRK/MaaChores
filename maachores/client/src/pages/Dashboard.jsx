import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskForm from '../components/Tasks/TaskForm';
import TaskList from '../components/Tasks/TaskList';
import axios from 'axios';

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [currentTask, setCurrentTask] = useState(null);
    const token = localStorage.getItem("token");

    const fetchTasks = async () => {
        const res = await axios.get('/api/tasks', {
            headers: { Authorization: `Bearer ${token}` }
        });
        setTasks(res.data);
    };
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate('/login');
        } else {
            fetchTasks();
        }
    }, []);

    const addOrUpdateTask = async (taskData) => {
        try {
            if (currentTask) {
                await axios.put(`/api/tasks/${currentTask._id}`, taskData, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            } else {
                await axios.post('/api/tasks', taskData, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            }
            fetchTasks();
        } catch (error) {
            console.error("Error saving task:", error);
        }
    };

    const deleteTask = async (id) => {
        await axios.delete(`/api/tasks/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        fetchTasks();
    };

    return (
        <>
            <h2>Dashboard</h2>
            <TaskForm
                onSubmit={addOrUpdateTask}
                currentTask={currentTask}
                clearCurrentTask={() => setCurrentTask(null)}
            />
            <TaskList
                tasks={tasks}
                onDelete={deleteTask}
                onEdit={(task) => setCurrentTask(task)}
            />
        </>
    );
};

export default Dashboard;
