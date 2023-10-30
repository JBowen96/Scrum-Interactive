const db = require('../config/database');

const Task = {
  getAll: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM tasks', (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  },

  getAllByStatus: (status) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM tasks WHERE status = ?', [status], (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  },

  // Other CRUD operations as needed
};

module.exports = Task;
