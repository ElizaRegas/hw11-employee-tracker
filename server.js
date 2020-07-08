var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Wino4ever",
  database: "employeeDB"
});

connection.connect(function(err) {
  if (err) throw err;
  start();
});

const start = () => {
  inquirer
    .prompt({
      name: "initialQuestion",
      type: "list",
      message: "Would you like to do?",
      choices: [
        "Add New Department",
        "Add New Role",
        "Add New Employee",
        "View All Departments",
        "View All Roles",
        "View All Employees",
        "View Employees by Manager",
        "View Department Budget",
        "Update Employee Role",
        "Update Employee Manager",
        "Delete a Department",
        "Delete a Role",
        "Delete an Employee"
      ]
    })
    .then((answer) => {
      console.log(answer);
    })
};



