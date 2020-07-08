class ActionFunctions {

  constructor(department) {
    this.department = department;
  }

  viewAllDepartments() {
    console.log(this.department);
  }
} 

module.exports = ActionFunctions;