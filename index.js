const inquirer = require('inquirer');
const db = require('./db/connection');
const cTable = require('console.table');
const connect = require('./db/connection');

db.connect(err => {
  if(err) throw err;
    console.log('This is the Employee Tracker! ');
promptInit();
})

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
        getEmployee();
} else if (answer.action === 'View Employees'){
  viewEmployees();
}else if (answer.action === 'View Departments'){
  viewDepartments();
}else if (answer.action === 'View Roles'){
  viewRoles();
} else if (answer.action === 'End') {
  db.end();
}
});
}
function viewEmployees() {
  var query =  `SELECT * FROM employees
                LEFT JOIN roles
                ON employees.role_id = roles.id
                LEFT JOIN department
                ON department.id = roles.department_id`;

  connect.query(query, function (err, res){
    if (err) throw err;
    console.table(res);

    promptInit();
  })
}
function viewRoles() {
  var query =  `SELECT * FROM roles
                LEFT JOIN department
                ON department.id = roles.department_id`;

  connect.query(query, function (err, res){
    if (err) throw err;
    console.table(res);

    promptInit();
  })
}

//View the Department table
function viewDepartments() {
  var query =  `SELECT * FROM department`;

  connect.query(query, function (err, res){
    if (err) throw err;
    console.table(res);

    promptInit();
  })
}
//Adding an Employee to the database
function addEmployee () {
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
        name: 'role_id',
        message: "What is the employee's role ID?",
       },
          ])
    .then(function (newEmployee) {

      var query = `INSERT INTO employees SET ?`

      connect.query(query,
        {
          first_name: newEmployee.first_name,
          last_name: newEmployee.last_name,
          role_id: newEmployee.role_id,
          manager_id: newEmployee.manager_id,
        },
          function (err, res) {
          if(err) throw err;
          console.table(newEmployee);
          console.log('Employee added to the Database');
        
         return promptInit();
        }
      )
    })
}

function department() {
    return inquirer
.prompt([
    {  
    type: 'input',
    name: 'dep_name',
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
      console.table(newDep);
      console.log((newDep.dep_name) + 'added to the Database');
    
     return promptInit();
    }
  )
})
};

function addRole() {
  var query = `SELECT * FROM departments`
  // return connect.query(query,
  //     function (err, res) {
  //     if(err) throw err;
    
  //    return res;
  //   }
  // )
  connect.promise().query(query)
  .then( ([rows,fields]) => {
    console.log(rows);
    return rows;
  })
.then(function (departments) {
  
  return inquirer
.prompt([
    {  
    type: 'input',
    name: 'title',
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
    {  
      type: 'list',
      name: 'department',
      message: "What Department?",
      choices: departments.map(dep => ({
        name: dep.dep_name, 
        value: dep.id
        }))
      },

])
})
.then(function (newRole) {
  console.log(newRole)
  var query = `INSERT INTO roles SET ?`

  connect.query(query,
    {
      title: newRole.title,
      salary: newRole.salary,
      department_id: newRole.department
   },
       function (err, res) {
      if(err) throw err;
      console.table(newRole);
      console.log('Role added to the Database');
    
     return promptInit();
    }
  )
})
};

function getEmployee (employees, roles){
  var query = `SELECT * FROM employees`;
    connect.query(query, function (err, res) {
      if(err) throw err;
      
      const employees = res.map(({id, first_name, last_name}) => ({
        value: id, name: `${first_name} ${last_name}`
      }));
      getRole(employees);
     })
}

//show all roles
function getRole(employees) {
  var query = `SELECT * FROM roles`;
  connect.query(query, function (err, res) {
    if(err) throw err;
    
    const roles = res.map(({id, title}) => ({
      value: id, name: `${id} ${title}`
    })); 
    // console.table(roles);
    updateEmployee(employees, roles)
  })
  
}

function updateEmployee(employees, roles) {

      inquirer.prompt([
      {  
      type: 'list',
      name: 'updatedEmp',
      message: "Which employee would you like to update?",
      choices: employees,
    
  },
  {  
      type: 'list',
      name: 'updatedRole',
      message: "What is the employee's updated role?",
      choices: roles,
  },
  {  
      type: 'input',
      name: 'updatedSalary',
      message: "What is the salary of the updated role?",
  },
  ])
  .then(function (answer) {

    var query = `UPDATE employees SET role_id = ? WHERE id = ?`

    connect.query(query,
      [
        answer.updatedEmp, answer.updatedRole
      ],
      function (err, res) {
        if(err) throw err;
        console.log('Employee has been updated')
        console.table(answer);
        promptInit();    
      })
    
  })
};