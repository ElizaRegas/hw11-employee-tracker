const mysql = require("mysql");
const inquirer = require("inquirer");
const actionItems = require("./data/actionItems.js");
const actionFunctions = require("./data/actionsFunctions");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Wino4ever",
  database: "employeeDB",
});

connection.connect(function (err) {
  if (err) throw err;
  connection.query("SELECT * FROM department", function (err, res) {
    if (err) throw err;
    console.log("conn query: " + JSON.stringify(res));
    start();
  });
});

const start = () => {
  inquirer
    .prompt(actionItems())
    .then((res) => {
      const desiredAction = res.choices;
      console.log(desiredAction); 

      // switch (expr) {
      //   case 'Oranges':
      //     console.log('Oranges are $0.59 a pound.');
      //     break;
      //   case 'Mangoes':
      //   case 'Papayas':
      //     console.log('Mangoes and papayas are $2.79 a pound.');
      //     // expected output: "Mangoes and papayas are $2.79 a pound."
      //     break;
      //   default:
      //     console.log(`Sorry, we are out of ${expr}.`);
      // }       
    })
    .catch((err) => {
      if (err) throw err;
    });
};
