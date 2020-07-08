const mysql = require("mysql");
const inquirer = require("inquirer");
const actionItems = require("./data/actionItems.js");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Wino4ever",
  database: "employeeDB",
});

connection.connect(function(err) {
  if (err) throw err;
  inquirer
    .prompt(actionItems())
    .then(({ actionItems }) => {
      console.log("results: " + JSON.stringify(actionItems));
      if (actionItems === "View All Departments") {
        viewDepartments();
      } else {
        console.log("Nope");
      }
    })
    .catch((err) => {
      if (err) throw err;
    });
});

const viewDepartments = () => {
  console.log("This is working");
};
