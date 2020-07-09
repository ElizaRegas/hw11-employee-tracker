const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table"); // const actionItems = require("./data/actionItems.js");

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
        const query = "SELECT * FROM departments";
        connection.query(query, function (err, res) {
          for (i = 0; i < res.length; i++) {
            console.table(res[i].department);
          }
        });
      } else {
        console.log("\nNope\n");
      }
    });
};

function viewEmployees() {
  const query = "SELECT * FROM employees";
  connection.query(query, function (err, res) {
    console.log("\n");
    console.table(res);
    start();
  });
}
