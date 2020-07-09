const mysql = require("mysql");
const inquirer = require("inquirer");
const table = require("console.table");
const actionItems = require("./data/actionItems.js");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Wino4ever",
  database: "employee_trackerDB",
});

connection.connect(function (err) {
  if (err) throw err;
  inquirer
    .prompt(actionItems())
    .then((res) => {
      console.log("\r");
      if (res.actionItems === "View All Departments") {
        viewDepartments();
      } else if (res.actionItems === "View All Roles") {
        viewRoles();
      } else {
        console.log("Please enter a valid selection.");
      }
    })
    .catch((err) => {
      if (err) throw err;
    });
});

const viewDepartments = () => {
  const query = "SELECT * FROM departments";
  connection.query(query, function (err, res) {
    console.table(
      res.map((item) => {
        return { department: item.department };
      })
    );
  });
};

const viewRoles = () => {
  const query = "SELECT * FROM roles";
  connection.query(query, function (err, res) {
    console.table(
      res.map((item) => {
        return { title: item.title };
      })
    );
  });
};
