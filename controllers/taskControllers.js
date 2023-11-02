const Task = require('../models/taskModel');

const TaskController = {
  getAllTasks: async (req, res) => {
    try {
      const tasks = {
        todo: await Task.getAllByStatus('todo'),
        inwork: await Task.getAllByStatus('inwork'),
        completed: await Task.getAllByStatus('completed')
      };
      res.render('views/index.handlebars', { tasks });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Other controller actions for CRUD and moving tasks
};

module.exports = TaskController;
