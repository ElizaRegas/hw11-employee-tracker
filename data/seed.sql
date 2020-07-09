USE employee_trackerDB;

INSERT INTO departments (department)
VALUES
  ("Sales"),
  ("Engineering"),
  ("Finance"),
  ("Legal");

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

INSERT INTO employees (first_name, last_name, role_id, manager_id, manager)
VALUES
  ("Dale", "Carnegie", 1, NULL, NULL),
  ("Billy", "Mayes", 2, 1, "Dale Carnegie"),
  ("Steve", "Jobs", 2, 1, "Dale Carnegie"),
  ("Mary Kay", "Ash", 2, 1, "Dale Carnegie"),
  ("Steve", "Wozniak", 3, NULL, NULL),
  ("Ada", "Lovelace", 4, 5, "Steve Wozniak"),
  ("Bill", "Gates", 4, 5, "Steve Wozniak"),
  ("Mark", "Zuckerberg", 4, 5, "Steve Wozniak"),
  ("J.P.", "Morgan", 5, NULL, NULL),
  ("John", "Grisham", 6, 9, "J.P. Morgan"),
  ("Kenny", "G", 6, 9, "J.P. Morgan"),
  ("Bob", "Newhart", 6, 9, "J.P. Morgan"),
  ("Ruth", "Bader Ginsburg", 7, NULL, NULL),
  ("Sandra", "Day O'Connor", 8, 13, "Ruth Bader Ginsburg"),
  ("Gloria", "Allred", 8, 13, "Ruth Bader Ginsburg"),
  ("Hillary", "Clinton", 8, 13, "Ruth Bader Ginsburg");







