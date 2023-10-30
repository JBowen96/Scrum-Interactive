CREATE DATABASE IF NOT EXISTS task_app;
USE task_app;

CREATE TABLE IF NOT EXISTS tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  status ENUM('todo', 'inwork', 'completed') NOT NULL
);
