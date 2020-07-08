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



connection.connect(function (err) {
  if (err) throw err;
  start();
});

const start = () => {
  inquirer
    .prompt(actionItems())
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      if (err) throw err;
    });
};
