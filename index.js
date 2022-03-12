const inquirer = require('inquirer');
const fs = require('fs');

const promptInit = () => {
    return inquirer
    .prompt([
    {
        type: 'list',
        name: 'action',
        message: "What would you like to do? (arrows to find role, <enter> to submit)",
        choices: ['Add Department', 'Add Role', 'Add Employee', 'Update Current Employee' ]
    },

])
.then((answer) => {
    if(answer.action === 'Add Department') {
        department();
} else if (answer.action === 'Add Role') {
        addRole();
} else if (answers.actio === 'Add Employee') {
        addEmployee();
} else if (answers.actio === 'Update Current Employee'){
        updateEmployee();
}
})
}

const addEmployee = () => {
    return inquirer
    .prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is the employees first name? (Required)',
      when: (input) => input.action === 'Add Employee',
    } {
        type: 'input',
        name; 'last_name',
        message:
    }

      validate: nameInput => {
        if (nameInput) {
          return true;
        } else {
         console.log('Please enter employee name!');
         return false;
        }
      },

      },
      {
        type: 'input',
        name: 'name',
        message: 'What is the employees first name? (Required)',
        validate: nameInput => {
          if (nameInput) {
            return true;
          } else {
            console.log('Please enter employee name!');
            return false;
          }
        },
      },
      {
        type: 'list',
        name: 'role',
        message: "What is the employee's role? (arrows to find role, <enter> to submit)",
        choices: ['Engineer', 'Intern', 'Manager']
    },
      {
        type: 'input',
        name: 'id',
        message: 'What is the employees role?',
        validate: idInput => {
          if (idInput) {
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
        message: 'Who is the manager of employee? (Required)',
      },
      {
        type: 'input',
        name: 'email',
        message: 'What is the employees email? (Required)',
        validate: emailInput => {
          if (emailInput) {
            return true;
          } else {
            console.log('Please enter employee email!');
            return false;
          }
        },
      },
    
    {  
    type: 'input',
    name: 'addDepartment',
    message: "What is the Engineer's github profile?",
    when: (input) => input.action === 'Add Department',
    validate: input => {
      if (input) {
        return true;
      } else {
        console.log('Please enter the github profile name!');
        return false;
      }
    },
  }, 
  {  
    type: 'input',
    name: 'newEmployee',
    message: "What is the Employee's First Name? (Required)",
    when: (input) => input.action === 'Employee',
    validate: input => {
      if (input) {
        return true;
      } else {
        console.log("Please enter the employee's first name");
        return false;
      }
    },
    },
    {  
    type: 'input',
    name: 'officeNumber',
    message: "What is the Manager's office number?",
    when: (input) => input.role === 'Manager',
    validate: input => {
      if (input) {
        return true;
      } else {
        console.log('Please enter the office number for Manager');
        return false;
      }
    },
  },
{
    type: 'confirm',
    name: 'confirmAdd',
    message: 'Would you like to enter another employee?',
    default: false
  },
])
    return prompt;
}

.then(employeeData => {
 var { role, name, id, email, github, school, officeNumber, confirmAdd} = employeeData;
//  var employee;
//   if (role ==='Director') {
//     employee = new Engineer (name, id, email, role, github);
    
//   } else if (role === 'Assitant') {
//     employee = new Intern (name, id, email, role, school);
//   } 
//   else if (role === 'Coordinator') {
//     employee = new Manager (name, id, email, role, officeNumber);
//   }
//   else if (role === 'Manager') {
//     employee = new Manager (name, id, email, role, officeNumber);

// team.push(employee)
console.table(employee);


// if (finished action) {
//   return prompt();
// } else{
//   return team;
// }

});

promptInit();