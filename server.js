const mysql = require('mysql');
const inquirer = require('inquirer');

// create the connection information for the sql database
const connection = mysql.createConnection({
  host: 'localhost',

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: 'root',

  // Your password
  password: 'babotookiez',
  database: 'employeeTracking_DB',
});

const start = () => {
  inquirer
  .prompt([
    {
      type: "list",
      name: "userChoice",
      message: "What would you like to do?",
      choices: [
        "Add a department",
        "Add a role",
        "Add an employee",
        "View a department",
        "View roles",
        "View Employees",
        "Update an Employee Role"
      ],
    }
  ])
  .then( (answer)=>{

  })

}
/*
* Add departments, roles, employees

  * View departments, roles, employees

  * Update employee roles

*/
function addDepartment(){

}
function addRole(){

}
function addEmployee(){

}

function viewDepartment(){

}
function viewRole(){

}
function viewEmployee(){

}
function updateEmployee(){
  
}






// connect to the mysql server and sql database
connection.connect((err) => {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  start();
});