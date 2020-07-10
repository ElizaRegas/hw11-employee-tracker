const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");
const CFonts = require("cfonts");

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
        // "View Employees by Manager",
        // "View Department Budget",
        "Add New Department",
        "Add New Role",
        "Add New Employee",
        "Update Employee Role",
        // "Update Employee Manager",
        // "Delete a Department",
        // "Delete a Role",
        // "Delete an Employee",
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
      } else if (answer === "View Employees by Manager") {
        viewByManager();
      } else if (answer === "Add New Department") {
        newDepartment();
      } else if (answer === "Add New Role") {
        newRole();
      } else if (answer === "Add New Employee") {
        newEmployee();
      } else if (answer === "Update Employee Role") {
        updateEmpRole();
      } else {
        connection.end();
      }
    });
};

const viewEmployees = () => {
  const query =
    "SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.department, roles.salary, employees.manager FROM employees INNER JOIN roles ON (roles.id = employees.role_id) INNER JOIN departments ON (departments.id = roles.department_id);";
  connection.query(query, function (err, res) {
    console.log("\n");
    console.table(res);
    start();
  });
};

const viewDepartments = () => {
  const query = "SELECT department FROM departments";
  connection.query(query, function (err, res) {
    console.log("\n");
    console.table(res);
    start();
  });
};

const viewRoles = () => {
  const query = "SELECT title FROM roles";
  connection.query(query, function (err, res) {
    console.log("\n");
    console.table(res);
    start();
  });
};

const viewByManager = () => {
  inquirer
    .prompt({
      name: "manager",
      type: "list",
      message: "Please select a manager:",
      choices: [
        "Dale Carnegie",
        "Ruth Bader Ginsburg",
        "J.P. Morgan",
        "Steve Wozniak",
      ],
    })
    .then((answer) => {
      const manager = answer.manager;
      const query = "SELECT * FROM employees WHERE manager = ?";
      connection.query(query, [manager], function (err, res) {
        console.log("\n");
        console.table(res);
        start();
      });
    });
};

const newDepartment = () => {
  inquirer
    .prompt({
      name: "newDept",
      type: "input",
      message: "What new department would you like to add?",
    })
    .then((answer) => {
      const dept = JSON.stringify(answer.newDept);
      const query = `INSERT INTO departments (department) VALUE (${dept})`;
      connection.query(query, function (err, res) {
        viewDepartments();
      });
    });
};

const newRole = () => {
  inquirer
    .prompt({
      name: "newRole",
      type: "input",
      message: "What new role would you like to add?",
    })
    .then((answer) => {
      const role = JSON.stringify(answer.newRole);
      const query = `INSERT INTO roles (title) VALUE (${role})`;
      connection.query(query, function (err, res) {
        viewRoles();
      });
    });
};

const newEmployee = () => {
  let roles;
  const query = "SELECT title FROM roles";
  connection.query(query, function (err, res) {
    roles = res.map((role) => role.title);

    const newEmpQuestions = [
      {
        name: "newEmpFirst",
        type: "input",
        message: "What is the employee's first name?",
      },
      {
        name: "newEmpLast",
        type: "input",
        message: "What is the employee's last name?",
      },
      {
        name: "newEmpRole",
        type: "list",
        message: "What is the employee's role?",
        choices: roles,
      },
      {
        name: "newEmpManager",
        type: "list",
        message: "Who is the employee's Manager?",
        choices: [
          "Dale Carnegie",
          "Ruth Bader Ginsburg",
          "J.P. Morgan",
          "Steve Wozniak",
        ],
      },
    ];

    inquirer.prompt(newEmpQuestions).then((answer) => {
      answer = JSON.stringify(answer);
      const query = `INSERT INTO employees (first_name, last_name, role_id, manager_id, manager)
      VALUES (${answer})`;
      connection.query(query, function (err, res) {
        viewRoles();
      });
    });
  });
};

const updateEmpRole = () => {
  let employeeList;
  const query =
    "SELECT CONCAT(first_name, ' ', last_name) AS EMPLOYEE_NAME FROM employees";
  connection.query(query, (err, res) => {
    employeeList = res.map((emp) => emp.EMPLOYEE_NAME);

    const newEmpRoleQuestArr = [
      {
        name: "selectEmp",
        type: "list",
        message: "Please select employee:",
        choices: employeeList,
      },
    ];

    inquirer.prompt(newEmpRoleQuestArr[0]).then((answer) => {
      let newRole;
      const query = "SELECT title FROM roles";
      connection.query(query, (err, res) => {
        newRole = res.map((role) => role.title);
        console.log(newRole);
      });
    });
  });
};
