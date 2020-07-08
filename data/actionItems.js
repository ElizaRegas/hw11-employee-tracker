const actionItems = () => [
  {
    name: "actionItems",
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
      "Delete an Employee",
    ],
  },
];

module.exports = actionItems;