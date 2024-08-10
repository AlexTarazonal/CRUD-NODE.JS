import Task from '../models/task.model.js';

export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.findAll();  // Obtiene todos los registros
        res.json(tasks);
    } catch (error) {
        console.error('Error retrieving tasks:', error);
        res.status(500).json({ message: 'Error retrieving tasks', error: error.message });
    }
};

export const createTask = async (req, res) => {
    try {
        const { title, description, date } = req.body;
        const userId = req.user?.id; // Asegúrate de que req.user esté definido

        if (!title || !description) {
            return res.status(400).json({ message: 'Title and description are required' });
        }

        const newTask = await Task.create({
            title,
            description,
            date: date || new Date(),
            userId // Agrega el userId aquí
        });

        res.status(201).json(newTask);
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ message: 'Error creating task', error: error.message });
    }
};

export const getTask = async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);
        if (!task) return res.status(404).json({ message: 'Task not found' });

        res.json(task);
    } catch (error) {
        console.error('Error retrieving task:', error);
        res.status(500).json({ message: 'Error retrieving task', error: error.message });
    }
};

export const deleteTask = async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);
        if (!task) return res.status(404).json({ message: 'Task not found' });

        await task.destroy();
        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({ message: 'Error deleting task', error: error.message });
    }
};

export const updateTask = async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);
        if (!task) return res.status(404).json({ message: 'Task not found' });

        // Filtra solo los campos permitidos para la actualización
        const { title, description, date } = req.body;
        await task.update({ title, description, date });
        res.json(task);
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ message: 'Error updating task', error: error.message });
    }
};
