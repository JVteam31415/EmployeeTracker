const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');

// create the connection information for the sql database
const connection = mysql.createConnection({
  host: 'localhost',

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: 'root',

  // Your password
  password: 'babotookiez',
  database: 'employee_DB',
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
        "Update an Employee Role",
        "quit application"
      ],
    },
    {
      type: "input",
      name: "name",
      message: "And what is the relevant name?"
    }
  ])
  .then( (answer)=>{
    if(answer.userChoice=="Add a department"){
      addDepartment(answer.name);
    }
    else if(answer.userChoice=="Add a role"){
      addRole(answer.name);
    }
    else if(answer.userChoice=="Add an employee"){
      addEmployee(answer.name);
    }
    else if(answer.userChoice=="View a department"){
      viewDepartment(answer.name);
    }
    else if(answer.userChoice=="View roles"){
      viewRole(answer.name);
    }
    else if(answer.userChoice=="View Employees"){
      viewEmployee(answer.name);
    }
    else if(answer.userChoice=="Update an Employee Role"){
      updateEmployee(answer.name);
    }
    else{
      connection.end();
      return;
    }
  })

}
/*
* Add departments, roles, employees

  * View departments, roles, employees

  * Update employee roles

*/
function addDepartment(name){
  //all we need
  connection.query(
    'INSERT INTO department SET ?',
    // QUESTION: What does the || 0 do?
    {
      deptname: name
    },
    (err) => {
      if (err) throw err;
      console.log('Department created');
      // re-prompt the user for if they want to bid or post
      start();
    }
  );
}
function addRole(name){
  //salary, department id
  inquirer
  .prompt([
    {
      name:"salary",
      message:"What is the salary of this role?",
      type:"number"
    },
    {
      name:"deptid",
      message:"Department ID?",
      type:"number"
    }
  ])
  .then( (answer)=>{
    connection.query(
      'INSERT INTO roles SET ?',
      // QUESTION: What does the || 0 do?
      {
        rolename: name,
        salary: answer.salary,
        department_id: answer.deptid
      },
      (err) => {
        if (err) throw err;
        console.log('Role created');
        // re-prompt the user for if they want to bid or post
        start();
      }
    );
  })
}
function addEmployee(name){
  //ask for role id, manager id
  inquirer
  .prompt([
    {
      name:"roleid",
      message:"What is their role's ID number?",
      type:"number"
    },
    {
      name:"managerid",
      message:"Manager's ID number?",
      type:"number"
    }
  ])
  .then( (answer)=>{
    connection.query(
      'INSERT INTO employee SET ?',
      // QUESTION: What does the || 0 do?
      {
        firstname: name.split(" ")[0],
        lastname: name.split(" ")[1],
        role_id: answer.roleid,
        manager_id: answer.managerid
      },
      (err) => {
        if (err) throw err;
        console.log('Employee created');
        // re-prompt the user for if they want to bid or post
        start();
      }
    );
  })
}

function viewDepartment(name){
  connection.query('SELECT ? FROM department',
    {deptname:name},
  (err, results) => {
    console.table(results);
    console.log(results);
    
    start();
  })
}
function viewRole(name){
  connection.query('SELECT ? FROM roles',
    {rolename:name},
  (err, results) => {
    console.table(results);
    console.log(results);
    
    start();
  })
}
function viewEmployee(name){
  connection.query('SELECT ? FROM employee',
  {
    firstname: name.split(" ")[0],
    lastname: name.split(" ")[0]
  },
(err, results) => {
  console.table(results);
  console.log(results)
  start();
})
}

function updateEmployee(name){
  inquirer
  .prompt([
    {
      name:"roleid",
      message:"What is their role?",
      type:"number"
    },
    {
      name:"managerid",
      message:"Manager ID?",
      type:"number"
    }
  ])
  .then( (answer)=>{

    connection.query(
      'UPDATE employee SET ? WHERE ?',
      [
        {
          role_id:answer.roleid,
          manager_id: answer.managerid
        },
        {
          firstname: name.split(" ")[0],
          lastname: name.split(" ")[0]
        },
      ],
      (error) => {
        if (error) throw err;
        console.log('Employee Updated');
        start();
      }
    );
  })
}






// connect to the mysql server and sql database
connection.connect((err) => {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  start();
  
});