// Import and require mysql2 and inquirer
const inquirer = require('inquirer');
const mysql = require('mysql2');

const prompt = inquirer.createPromptModule();

// Let database live as a variable before use.
let db;

// Notice how there is repition in the switch/case. We can input the tableName instead and shorten the code.
const getTable = (tableName) => {
    // IMPORTANT ===> ?? instead of ? ===> due to string parameter we are inputing
    db.query('SELECT * FROM ??', tableName, (err, result) => {
        if (err) {
            return console.error(err);
        }
        console.table(result);
        init();
    });
};

// For entering employee
const insertEmployee = (data) => {
    db.query('INSERT INTO employees SET ?', data , (err, result) => {
        if (err) {
            return console.error(err);
        }
        console.log('Added Employee');
        console.log(result)
        init();
    })
}

const insertDepartment = (data) => {
    db.query('INSERT INTO departments SET ?', data, (err, result) => {
        if (err) {
            return console.error(err);
        }
        console.log('Added ______ to the database')
        init();
    })
}
const insertRole = (data) => {
    db.query('INSERT INTO roles SET ?', data, (err, result) => {
        if (err) {
            return console.error(err);
        }
        console.log('Added ______ to roles')
        init();
    })
}


const handleAction = ({ action }) => {
    console.log(`Action: ${action}`);
    //   if or switch case
    switch(action) {
        case 'View All Employees': {
            getTable('employees');
            // db.query('SELECT * FROM employees', (err, employees) => {
                // if (err) {
                //     return console.error(err);
                // }
            //     console.table(employees);
            //     init();
            // });
            break;
        }
        case 'View All Departments': {
            getTable('departments');
            // db.query('SELECT * FROM departments', (err, departments) => {
                // if (err) {
                //     return console.error(err);
                // }
            //     console.table(departments);
            //     init();
            // });
            break;
        }
        case 'View All Roles': {
            getTable('roles');
            // db.query('SELECT * FROM roles', (err, roles) => {
                // if (err) {
                //     return console.error(err);
                // }
            //     console.table(roles);
            //     init();
            // });
            break;
        }
        case 'Add Employee': {
            prompt([
                {
                    name: 'first_name',
                    message: 'Enter your first name:'
                },
                {
                    name: 'last_name',
                    message: 'Enter your last name:'
                },
            ]).then(insertEmployee);
            // Need breaks or you wont be able to interact with prompt inputs.
            break;
        }
        case 'Add Department': {
            prompt([
                {
                    name: 'name',
                    message: 'What is the name of the department?'
                },
            ]).then(insertDepartment)
            break;
        }
        case 'Add Role': {
            prompt([
                {
                    name: 'title',
                    message: 'What is the name/title of the role?'
                },
                {
                    name: 'salary',
                    message: 'What is the salary of the role? (Please enter numbers only (no commas))'
                },
            ]).then(insertRole)
            break;
        }
        // Add a way to get out of init()/prompt system or it will keep asking you questions.
        default: {
            process.exit();
        }
    }
}

const init = () => {
    prompt({
        message: 'What would you like to do?',
        type: 'rawlist',
        name: 'action',
        choices: [
            'View All Departments',
            'View All Roles',
            'View All Employees',
            'Add Department',
            'Add Role',
            'Add Employee',
            'Update Employee Role',
            // Must add for default to work.
            'Exit'
        ]
    }).then(handleAction);
};

// Creating the connection to the database
db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      database: 'employee_db',
    }, init()
  );
