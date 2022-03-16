const inquirer = require('inquirer');
const fs = require('fs');
const db = require('../../db/connection');

router.use(require('./employeeRoutes'));
router.use(require('./roleRoutes'));
router.use(require('./departmentRoutes'));



const promptInit = () => {
    return inquirer
    .prompt([
    {
        type: 'list',
        name: 'action',
        message: "What would you like to do? (arrows to find action, <enter> to submit)",
        choices: ['Add Department', 'Add Role', 'Add Employee', 'Update Current Employee' ]
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
        message: "What is the employee's role?",
        validate: role => {
        if (role) {
          return true;
        } else {
         console.log('Please enter employee role!');
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
    .then(newEmployee => {
       // addEmployee.push(newEmployee);
        //console.table(newEmployee);
        console.log(JSON.stringify(first_name) + 'added to the Database')
        return promptInit();
    })
};
    

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
.then(newDepartment => {
   // department.push(newDepartment);
    console.log(newDepartment + ' added to the Database')
     return promptInit();
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
.then(newRole => {
    //role.push(newRole);
    console.table(JSON.stringify('addRole') + ' added to the Database');
    console.log(newRole);
     return promptInit();
 }) 
};

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
.then(newRole => {
    //role.push(newRole);
    console.log('Employee has been updated')
     return promptInit();
 }) 
};

// // team.push(employee)
// console.table(employee);


// if (finished action) {
//   return promptInit();
// } else{
//   return team;
// }


promptInit();