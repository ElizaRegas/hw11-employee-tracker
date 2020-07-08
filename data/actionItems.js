const actionItems = () => [
  {
    name: "actionItems",
    type: "list",
    message: "Would you like to do?",
    choices: [
      "Add New Department",
      "Add New Role",
      "Add New Employee",
      "Delete a Department",
      "Delete a Role",
      "Delete an Employee",
      "Update Employee Role",
      "Update Employee Manager",
      "View All Departments",
      "View All Roles",
      "View All Employees",
      "View Employees by Manager",
      "View Department Budget"
    ],
  },
];

module.exports = actionItems;