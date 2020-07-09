DROP DATABASE IF EXISTS employee_trackerDB;

CREATE DATABASE employee_trackerDB;

USE employee_trackerDB;

CREATE TABLE departments
(
  id INT
  AUTO_INCREMENT NOT NULL,
  department VARCHAR
  (30),
  PRIMARY KEY
  (id)
);

INSERT INTO departments (department)
VALUES
  ("Sales"),
  ("Engineering"),
  ("Finance"),
  ("Legal");

CREATE TABLE roles (
  id INT AUTO_INCREMENT NOT NULL,
  title VARCHAR(30),
  salary DECIMAL(10, 2),
  department_id INT,
  PRIMARY KEY (id)
);

INSERT INTO roles (title, salary, department_id)
VALUES
  ("Sales Lead", 100000, 1),
  ("Salesperson", 80000, 1),
  ("Lead Engineer", 150000, 2),
  ("Software Engineer", 120000, 2),
  ("Lead Accountant", 150000, 3),
  ("Accountant", 125000, 3),
  ("Legal Team Lead", 250000, 4),
  ("Lawyer", 190000, 4);

CREATE TABLE employees (
  id INT AUTO_INCREMENT NOT NULL,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT,
  PRIMARY KEY (id)
);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
  ("Dale", "Carnegie", 1, NULL),
  ("Billy", "Mayes", 2, 1),
  ("Steve", "Jobs", 2, 1),
  ("Mary Kay", "Ash", 2, 1),
  ("Steve", "Wozniak", 3, NULL),
  ("Ada", "Lovelace", 4, 5),
  ("Bill", "Gates", 4, 5),
  ("Mark", "Zuckerberg", 4, 5),
  ("J.P.", "Morgan", 5, NULL),
  ("John", "Grisham", 6, 9),
  ("Kenny", "G", 6, 9),
  ("Bob", "Newhart", 6, 9),
  ("Ruth", "Bader Ginsburg", 1, NULL),
  ("Sandra", "Day O'Connor", 1, 13),
  ("Gloria", "Allred", 1, 13),
  ("Hillary", "Clinton", 1, 13);
  
SELECT * FROM departments;
    
SELECT * FROM roles;

SELECT * FROM employees;







