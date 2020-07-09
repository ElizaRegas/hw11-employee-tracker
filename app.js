const mysql = require("mysql");
const inquirer = require("inquirer");
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
      if (res.actionItems === "View All Departments") {
        const query = "SELECT * FROM departments";
        connection.query(query, function (err, res) {
          console.log("Results: " + JSON.stringify(res));
        });
      } else {
        console.log("Nope");
      }
    })
    .catch((err) => {
      if (err) throw err;
    });
});
