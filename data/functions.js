const inquirer = require("inquirer");

const viewEmployees = (connection, start) => {
  const query =
    "SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.department, roles.salary, employees.manager FROM employees INNER JOIN roles ON (roles.id = employees.role_id) INNER JOIN departments ON (departments.id = roles.department_id);";
  connection.query(query, function (err, res) {
    console.log("\n");
    console.table(res);
    start();
  });
};

const viewDepartments = (connection, start) => {
  const query = "SELECT department FROM departments";
  connection.query(query, function (err, res) {
    console.log("\n");
    console.table(res);
    start();
  });
};

const viewRoles = (connection, start) => {
  const query = "SELECT title FROM roles";
  connection.query(query, function (err, res) {
    console.log("\n");
    console.table(res);
    start();
  });
};

const viewByManager = (connection, start) => {
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

const newDepartment = (connection, start) => {
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
        viewDepartments(connection, start);
      });
    });
};

const newRole = (connection, start) => {
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
        viewRoles(connection, start);
      });
    });
};

const newEmployee = (connection, start) => {
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
        viewRoles(connection, start);
      });
    });
  });
};

const updateEmpRole = (connection, start) => {
  let employeeList;
  const query =
    "SELECT CONCAT(first_name, ' ', last_name) AS EMPLOYEE_NAME, id FROM employees";
  connection.query(query, (err, res) => {
    if (err) throw err;

    const masterEmpArr = res;
    employeeList = res.map((emp) => emp.EMPLOYEE_NAME);
    inquirer
      .prompt([
        {
          name: "selectEmp",
          type: "list",
          message: "Please select employee:",
          choices: employeeList,
        },
      ])
      .then((answer) => {
        const { selectEmp: chosenOne } = answer;
        let newRole;
        const query = "SELECT title, id FROM roles";
        connection.query(query, (err, res) => {
          if (err) throw err;

          const masterRolesObj = {};
          newRole = res.map((role) => {
            masterRolesObj[role.title] = role.id;
            return role.title;
          });

          inquirer
            .prompt([
              {
                name: "selectNewRole",
                type: "list",
                message: "Please select employee's new role:",
                choices: newRole,
              },
            ])
            .then((ans) => {
              const { selectNewRole: roleTitle } = ans;
              const roleId = masterRolesObj[roleTitle];
              const filtEmpArr = masterEmpArr.filter(
                (person) => person.EMPLOYEE_NAME === chosenOne
              );
              const empObj = filtEmpArr[0];
              const empId = empObj.id;

              const query = `
                UPDATE employees
                SET role_id = ${roleId}
                WHERE id = ${empId};`;
              connection.query(query, function (err, res) {
                if (err) throw err;
                viewEmployees(connection, start);
              });
            });
        });
      });
  });
};

const functionsJs = {
  viewEmployees,
  viewDepartments,
  viewRoles,
  viewByManager,
  newDepartment,
  newRole,
  newEmployee,
  updateEmpRole
};

module.exports = functionsJs;