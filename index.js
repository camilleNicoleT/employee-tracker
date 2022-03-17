const inquirer = require('inquirer');
const fs = require('fs');
const db = require('../../db/connection');
const cTable = require('console.table');
const { connect } = require('./db/connection');

const promptInit = () => {
 
    return inquirer
    .prompt([
    {
        type: 'list',
        name: 'action',
        message: "What would you like to do? (arrows to find action, <enter> to submit)",
        choices: ['View Employees', 'View Departments', 'View Roles', 'Add Department', 'Add Role', 'Add Employee', 'Update Current Employee', 'End' ]
    },

])
.then((answer) => {
    if(answer.action === 'Add Department') {
        department();
} else if (answer.action === 'Add Role') {
        addRole();
} else if (answer.action === 'Add Employee') {
        addEmployee();
} else if (answer.action === 'Update Current Employee'){
        updateEmployee();
}
})
};

const addEmployee = () => {
    return inquirer
    .prompt([
    {
      type: 'input',
      name: 'first_name',
      message: 'What is the employees first name? (Required)',
      validate: first_name => {
        if (first_name) {
          return true;
        } else {
          console.log('Please enter employee name!');
          return false;
        }
      },
    },
    {
        type: 'input',
        name: 'last_name',
        message: "What is the employee's last name?",
        validate: last_name => {
            if (last_name) {
              return true;
            } else {
              console.log('Please enter employee last name!');
              return false;
            }
          },
    },
    {
        type: 'input',
        name: 'role',
        message: "What is the employee's role ID?",
        validate: role => {
        if (role) {
          return true;
        } else {
         console.log('Please enter employee role ID!');
         return false;
        }
      },
    },
      {
        type: 'input',
        name: 'email',
        message: 'Who is the manager of employee? ',
      },
    ])
    .then(function (newEmployee) {

      var query = `INSERT INTO employee SET ?`

      connect.query(query,
        {
          first_name: newEmployee.first_name,
          last_name: newEmployee.last_name,
          role_id: newEmployee.role_id,
          manager_id: newEmployee.manager_id,
        },
          function (err, res) {
          if(err) throw err;
          console.table(res);
          console.log((first_name) + 'added to the Database');
        
         return promptInit();
        }
      )
    })
}

const department = () => {
    return inquirer
.prompt([
    {  
    type: 'input',
    name: 'addDepartment',
    message: "What is the name of the department?",
    validate: addDepartment => {
        if (addDepartment) {
          return true;
        } else {
         console.log('Please enter department!');
         return false;
        }
    }
}
])
.then(function (newDep) {

  var query = `INSERT INTO department SET ?`

  connect.query(query,
    {
      dep_name: newDep.dep_name,
    },
       function (err, res) {
      if(err) throw err;
      console.table(res);
      console.log((newDep.dep_name) + 'added to the Database');
    
     return promptInit();
    }
  )
})
};

const addRole = () => {
    return inquirer
.prompt([
    {  
    type: 'input',
    name: 'addRole',
    message: "What is the title of the role?",
    validate: addRole => {
        if (addRole) {
          return true;
        } else {
         console.log('Please enter role title!');
         return false;
        }
    }
},
{  
    type: 'input',
    name: 'salary',
    message: "What is the salary of the role?",
    },

])
.then(function (newRole) {

  var query = `INSERT INTO roles SET ?`

  connect.query(query,
    {
      title: newRole.title,
      salary: newRole.salary,
   },
       function (err, res) {
      if(err) throw err;
      console.table(res);
      console.log((newRole.title) + 'added to the Database');
    
     return promptInit();
    }
  )
})
};

function updateEmployee()

const updateEmployee = () => {
    return inquirer
.prompt([
    {  
    type: 'list',
    name: 'update',
    message: "Which employee would you like to update?",
    choices: [],
   
},
{  
    type: 'input',
    name: 'updatedRole',
    message: "What is the employee's updated role?",
},
{  
    type: 'input',
    name: 'salary',
    message: "What is the salary of the updated role?",
},
])
.then(function (answer) {

  var query = `Update employee SET role_id = ? WHERE id = ?`

  connect.query(query,
    [
      answer.role, answer.employee
    ],
    function (err, res) {
      if(err) throw err;
      console.table(res);
     console.log('Employee has been updated')
    })
    promptInit();
  })
}


