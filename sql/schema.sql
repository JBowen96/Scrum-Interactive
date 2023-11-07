DROP DATABASE IF EXISTS task_app1;
CREATE DATABASE task_app1;
-- USE task_app1;

-- CREATE TABLE IF NOT EXISTS tasks (
--   id INT AUTO_INCREMENT PRIMARY KEY,
--   title VARCHAR(255) NOT NULL,
--   description TEXT NOT NULL,
--   status ENUM('to-do', 'in-work', 'completed') NOT NULL, 
--   user_id INT,
--   FOREIGN KEY (user_id) REFERENCES users(id)
-- );


-- CREATE TABLE IF NOT EXISTS users (
--   id INT AUTO_INCREMENT PRIMARY KEY,
--   email VARCHAR(255) UNIQUE NOT NULL,
--   password VARCHAR(255) NOT NULL
-- );
