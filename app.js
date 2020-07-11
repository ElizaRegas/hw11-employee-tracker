const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");
const CFonts = require("cfonts");
const functionsJs = require("./data/functions");

CFonts.say("Employee|Tracker", {
  font: "block",
  align: "left",
  colors: ["system"],
  background: "transparent",
  letterSpacing: 1,
  lineHeight: 1,
  space: true,
  maxLength: "0",
  gradient: "red,blue",
  independentGradient: false,
  transitionGradient: false,
  env: "node",
});

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
        "Add New Department",
        "Add New Role",
        "Add New Employee",
        "Update Employee Role",
        "End Session",
      ],
    })
    .then((answer) => {
      answer = answer.action;
      switch (answer) {
        case "View All Employees":
          functionsJs.viewEmployees(connection, start);
          break;
        case "View All Departments":
          functionsJs.viewDepartments(connection, start);
          break;
        case "View All Roles":
          functionsJs.viewRoles(connection, start);
          break;
        case "View Employees by Manager":
          functionsJs.viewByManager(connection, start);
          break;
        case "Add New Department":
          functionsJs.newDepartment(connection, start);
          break;
        case "Add New Role":
          functionsJs.newRole(connection, start);
          break;
        case "Add New Employee":
          functionsJs.newEmployee(connection, start);
          break;
        case "Update Employee Role":
          functionsJs.updateEmpRole(connection, start);
          break;
        default:
          connection.end();
      }
    });
};
