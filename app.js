const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table"); 
const logoCli = require('cli-logo'),
    version = 'v' + require('./package.json').version,
    description = require('./package.json').description,
    name = require('./package.json').name;
    console.log("\n");
    logoCli.print({"name": name,"description": description,"version": version});

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Wino4ever",
  database: "employee_trackerDB",
});

connection.connect(function (err) {
  if (err) throw err;
  start();
});

const start = () => {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "Would you like to do?",
      choices: [
        "View All Employees",
        "View All Departments",
        "View All Roles",
        "View Employees by Manager",
        "View Department Budget",
        "Add New Department",
        "Add New Role",
        "Add New Employee",
        "Update Employee Role",
        "Update Employee Manager",
        "Delete a Department",
        "Delete a Role",
        "Delete an Employee",
        "End Session",
      ],
    })
    .then((answer) => {
      answer = answer.action;
      if (answer === "View All Employees") {
        viewEmployees();
      } else if (answer === "View All Departments") {
        viewDepartments();
      } else if (answer === "View All Roles") {
        viewRoles();
      } else {
        console.log("\nNope\n");
      }
    });
};

const viewEmployees = () => {
  const query = "SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.department, roles.salary, employees.manager FROM employees INNER JOIN roles ON (roles.id = employees.role_id) INNER JOIN departments ON (departments.id = roles.department_id);";
  connection.query(query, function (err, res) {
    console.log("\n");
    console.table(res);
    start();
  });
}

function viewDepartments() {
  const query = "SELECT department FROM departments";
  connection.query(query, function (err, res) {
    console.log("\n");
    console.table(res);
    start();
  });
}

function viewRoles() {
  const query = "SELECT title FROM roles";
  connection.query(query, function (err, res) {
    console.log("\n");
    console.table(res);
    start();
  });
}
