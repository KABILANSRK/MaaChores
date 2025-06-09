import Task from '../models/Task.js';

export const createTask = async (req, res) => {
  try {
    const { title, description, assignedTo, createdBy } = req.body;

    const newTask = new Task({
      title,
      description,
      assignedTo,
      createdBy,
    });

    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    console.error("Create Task Error:", error);
    res.status(500).json({ message: 'Failed to create task' });
  }
};

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 }); // recent first
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Get Tasks Error:", error);
    res.status(500).json({ message: 'Failed to fetch tasks' });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTask = await Task.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedTask);
  } catch (error) {
    console.error("Update Task Error:", error);
    res.status(500).json({ message: 'Failed to update task' });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error("Delete Task Error:", error);
    res.status(500).json({ message: 'Failed to delete task' });
  }
};
