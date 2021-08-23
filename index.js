const inquirer = require('inquirer');
const cTable = require('console.table');
const db = require('./db/connection');
const e = require('express');
const { response } = require('express');

const questions = [
    {
        type: 'list',
        name: 'select',
        message: 'Please select an option',
        choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role'],
        validate: select => {
            if (select) {
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
    db.promise().query("SELECT * FROM  employees")
        .then(([rows,fields]) => {
            console.table(rows);
            returnQuestions();
        })
        .catch(console.table)
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
        if (response.select == 'View all departments') {
            viewDepartments();
            return;
        } else if (response.select == 'View all roles') {
            viewRoles();
            return;
        } else if (response.select == 'View all employees') {
            viewEmployees();
            return;
        }
    })
}

init();