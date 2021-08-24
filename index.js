const inquirer = require('inquirer');
const cTable = require('console.table');
const db = require('./db/connection');

const questions = [
    {
        type: 'list',
        name: 'selectOption',
        message: 'Please select an option',
        choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Exit'],
        validate: selectOption => {
            if (selectOption) {
                return true;
            } else {
                console.log('You must choose an option')
            }
        }
    }
]

const runAnotherTask = [
    {
        type: 'confirm',
        name: 'promptTask',
        message: 'Did you want to do another task?'
    }
]

const promptAddDepartment = [
    {
        type: 'input',
        name: 'departmentName',
        message: 'Please enter the name of the new department',
        validate: departmentName => {
            if (departmentName) {
                return true;
            } else {
                console.log('You must enter a valid department name')
            }
        }
    }
]
const promptAddRole = [
    {
        type: 'input',
        name: 'roleName',
        message: 'Please enter the name of the new role',
        validate: roleName => {
            if (roleName) {
                return true;
            } else {
                console.log('You must enter a valid role name')
            }
        }
    },
    {
        type: 'input',
        name: 'salaryInput',
        message: 'Please enter a salary for this role',
        validate: salaryInput => {
            if (salaryInput) {
                return true;
            } else {
                console.log('You must enter a valid salary')
            }
        }
    },
    {
        type: 'list',
        name: 'departmentInput',
        message: 'Please enter a department for this role',
        choices: ['Management', 'Sales Team', 'Front desk', 'HR', 'Accountants', 'Customer Service'],
        validate: departmentInput => {
            if (departmentInput) {
                return true;
            } else {
                console.log('You must enter a valid department')
            }
        }
    }
]
const promptAddEmployee = [
    {
        type: 'input',
        name: 'employeeFirst',
        message: `Please enter the new employee's first name`,
        validate: employeeFirst => {
            if (employeeFirst) {
                return true;
            } else {
                console.log('You must enter a first name for this employee.')
            }
        }
    },
    {
        type: 'input',
        name: 'employeeLast',
        message: `Please enter the new employee's last name`,
        validate: employeeLast => {
            if (employeeLast) {
                return true;
            } else {
                console.log('You must enter a last name for this employee.')
            }
        }
    },
    {
        type: 'list',
        name: 'employeeTitle',
        message: 'Which role does this new employee have?',
        choices: ['Regional Manager', 'Salesman', 'Head Salesman', 'Receptionist', 'Human Resources Representative', 'Accountant', 'Head Accountant', 'Customer Service Representative'],
        validate: employeeTitle => {
            if (employeeTitle) {
                return true;
            } else {
                console.log('You must choose a role for this employee.')
            }
        }
    },
    {
        type: 'list',
        name: 'employeeManager',
        message: 'Which manager does this employee report to?',
        choices: ['Michael Scott', 'NULL'], 
        validate: employeeManager => {
            if (employeeManager) {
                return true;
            } else {
                console.log('You must choose a manager for this employee. If this employee has no manager, enter NULL.')
            }
        }
    },
]

const promptUpdateRole = [
    {
        type: 'list',
        name: 'chooseEmployee',
        message: 'Whose role would you like to change?',
        choices: ['Michael Scott', 'Dwight Schrute', 'Jim Halpert', 'Stanley Hudson', 'Kelly Kapoor', 'Toby Flenderson', 'Pam Beesly', 'Kevin Malone', 'Angela Martin', 'Oscar Martinez', 'Phyllis Vance', 'Holly Flax'],
        validate: chooseEmployee => {
            if (chooseEmployee) {
                return true;
            } else {
                console.log('You must choose an employee.')
            }
        }
    },
    {
        type: 'list',
        name: 'roleChoice',
        message: "What should this employee's new role be?",
        choices: ['Regional Manager', 'Salesman', 'Head Salesman', 'Receptionist', 'Human Resources Representative', 'Accountant', 'Head Accountant', 'Customer Service Representative'],
        validate: roleChoice => {
            if (roleChoice) {
                return true;
            } else {
                console.log('You must choose a new role for this employee.')
            }
        }
    }
]


function viewDepartments () {
    db.promise().query("SELECT * FROM  department")
        .then(([rows,fields]) => {
            console.table(rows);
            returnQuestions();
        })
        .catch(console.table)
}
function viewRoles () {
    db.promise().query("SELECT * FROM  roles")
        .then(([rows,fields]) => {
            console.table(rows);
            returnQuestions();
        })
        .catch(console.table)
}
function viewEmployees () {
    db.promise().query(`SELECT * FROM employee
    JOIN roles
    ON role_id = roles.id
    JOIN department
    ON department_id = department.id
    ORDER BY employee.id ASC;`)
        .then(([rows,fields]) => {
            console.table(rows);
            returnQuestions();
        })
        .catch(console.table)
}
function addDepartment () {
    return inquirer
    .prompt (promptAddDepartment)
    .then ( response => {
        let queryString = `
        INSERT INTO department (name) 
        VALUES ('` + response.departmentName + `');`
        db.promise().query(queryString)
        .then( ([rows, fields]) => {
            console.log("Your new department has been added!")
            returnQuestions();
        })
        .catch(console.table)
    })
}

function addRole () {
    return inquirer
    .prompt (promptAddRole)
    .then(response => {

        if (response.departmentInput === 'Management') {
            response.departmentInput = 1
        } else if (response.departmentInput === 'Sales team') {
            response.departmentInput = 2
        } else if (response.departmentInput === 'Front desk') {
            response.departmentInput = 3
        } else if (response.departmentInput === 'HR') {
            response.departmentInput = 4
        } else if (response.departmentInput === 'Accountants') {
            response.departmentInput = 5
        } else if (response.departmentInput === 'Customer Service') {
            response.departmentInput = 6
        }

        let queryString = `
        INSERT INTO roles (title, salary, department_id) 
        VALUES ('` + response.roleName + `', '` + response.salaryInput + `', ` + response.departmentInput + `);`
        db.promise().query(queryString)
        .then( ([rows, fields]) => {
            console.log("New role added!")
            returnQuestions();
        })
        .catch(console.table)
    })
}

function addEmployee () {
    return inquirer
    .prompt(promptAddEmployee)
    .then(response => {

        if (response.employeeTitle === 'Regional Manager') {
            response.employeeTitle = 1
        } else if (response.employeeTitle === 'Salesman') {
            response.employeeTitle = 2
        } else if (response.employeeTitle === 'Head Salesman') {
            response.employeeTitle = 3
        } else if (response.employeeTitle === 'Receptionist') {
            response.employeeTitle = 4
        } else if (response.employeeTitle === 'Human Resources Representative') {
            response.employeeTitle = 5
        } else if (response.employeeTitle === 'Accountant') {
            response.employeeTitle = 6
        } else if (response.employeeTitle === 'Head Accountant') {
            response.employeeTitle = 7
        } else if (response.employeeTitle === 'Customer Service Representative') {
            response.employeeTitle = 8
        } else {
            response.employeeTitle = 9
        }

        if (response.employeeManager === 'Michael Scott') {
            response.employeeManager = 2
        } else if (response.employeeManager === 'NULL') {
            response.employeeManager = 1
        }

        let queryString = `
        INSERT INTO employee (first_name, last_name, role_id, manager_id) 
        VALUES ('` + response.employeeFirst + `', '` + response.employeeLast + `', ` + response.employeeTitle + `, ` + response.employeeManager + `);`
        db.promise().query(queryString)
        .then( ([rows, fields]) => {
            console.log("New employee added!")
            returnQuestions();
        })
        .catch(console.table)
    })
}

function updateEmployeeRole () {
    return inquirer
    .prompt(promptUpdateRole)
    .then(response => {

        if (response.chooseEmployee === 'Michael Scott') {
            response.chooseEmployee = 1
        } else if (response.chooseEmployee === 'Dwight Schrute') {
            response.chooseEmployee = 2
        } else if (response.chooseEmployee === 'Jim Halpert') {
            response.chooseEmployee = 3
        } else if (response.chooseEmployee === 'Stanley Hudson') {
            response.chooseEmployee = 4
        } else if (response.chooseEmployee === 'Kelly Kapoor') {
            response.chooseEmployee = 5
        } else if (response.chooseEmployee === 'Toby Flenderson') {
            response.chooseEmployee = 6
        } else if (response.chooseEmployee === 'Pam Beesly') {
            response.chooseEmployee = 7
        } else if (response.chooseEmployee === 'Kevin Malone') {
            response.chooseEmployee = 8
        } else if (response.chooseEmployee === 'Angela Martin') {
            response.chooseEmployee = 9
        } else if (response.chooseEmployee === 'Oscar Martinez') {
            response.chooseEmployee = 10
        } else if (response.chooseEmployee === 'Phyllis Vance') {
            response.chooseEmployee = 11
        } else if (response.chooseEmployee === 'Holly Flax') {
            response.chooseEmployee = 12
        }
        if (response.roleChoice === 'Regional Manager') {
            response.roleChoice = 1
        } else if (response.roleChoice === 'Salesman') {
            response.roleChoice = 2
        } else if (response.roleChoice === 'Head Salesman') {
            response.roleChoice = 3
        } else if (response.roleChoice === 'Receptionist') {
            response.roleChoice = 4
        } else if (response.roleChoice === 'Human Resources Representative') {
            response.roleChoice = 5
        } else if (response.roleChoice === 'Accountant') {
            response.roleChoice = 6
        } else if (response.roleChoice === 'Head Accountant') {
            response.roleChoice = 7
        } else if (response.roleChoice === 'Customer Service Representative') {
            response.roleChoice = 8
        }
        let queryString = `
        UPDATE employee SET role_id = ` + response.roleChoice + `
        WHERE id = ` + response.chooseEmployee + `;`

        db.promise().query(queryString)
        .then( ([rows, fields]) => {
            console.log("Updated employee role!")
            returnQuestions();
        })
        .catch(console.table)
    })
}

function returnQuestions() {
    return inquirer
    .prompt(runAnotherTask)
    .then(response => {
        if (response.promptTask === true) {
            init();
        } else {
            console.log("Goodbye")
            return;
        }
    })
}

function init() {
    return inquirer
    .prompt(questions)
    .then(response => {
        if (response.selectOption == 'View all departments') {
            viewDepartments();
            return;
        } else if (response.selectOption == 'View all roles') {
            viewRoles();
            return;
        } else if (response.selectOption == 'View all employees') {
            viewEmployees();
            return;
        } else if (response.selectOption == 'Add a department') {
            addDepartment();
            return;
        } else if (response.selectOption == 'Add a role') {
            addRole();
            return;
        } else if (response.selectOption == 'Add an employee') {
            addEmployee();
            return;
        } else if (response.selectOption == 'Update an employee role') {
            updateEmployeeRole();
            return;
        } else {
            console.log("Goodbye")
            return;
        }
        
    })
}

init();