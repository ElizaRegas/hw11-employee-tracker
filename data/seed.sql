DROP DATABASE IF EXISTS employeeDB;

CREATE DATABASE employeeDB;

USE employeeDB;

CREATE TABLE department(
  id INT AUTO_INCREMENT NOT NULL,
  name VARCHAR(30),
  PRIMARY KEY (id)
);

INSERT INTO department (name)
VALUES ("Accounting"), ("Human Resources"), ("Marketing"); 

CREATE TABLE role(
  id INT AUTO_INCREMENT NOT NULL,
  title VARCHAR(30),
  salary DECIMAL (4,2),
  department_id INT,
  PRIMARY KEY (id)
);

INSERT INTO role (title, salary)
VALUES ("Accountant", 50000), ("Manager", 80000), ("Sales Person", 50000); 

CREATE TABLE employee(
  id INT AUTO_INCREMENT NOT NULL,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT,
  manager_id INT NULL,
  PRIMARY KEY (id)
);

INSERT INTO employee (first_name, last_name)
VALUES ("Kim", "Berly"), ("Adam", "Ant"), ("Bobby", "Brown"); 





