// Import and require mysql2 and inquirer
const inquirer = require('inquirer');
const mysql = require('mysql2');

const prompt = inquirer.createPromptModule();

// Let database live as a variable before use.
let db;

// Notice how there is repition in the switch/case. We can input the tableName instead and shorten the code.
const getTable = (tableName) => {
    // IMPORTANT ===> ?? instead of ? ===> due to string parameter we are inputing
    db.query('SELECT * FROM ??', tableName, (err, data) => {
        console.table(data);
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
            //     console.table(employees);
            //     init();
            // });
            break;
        }
        case 'View All Departments': {
            getTable('departments');
            // db.query('SELECT * FROM departments', (err, departments) => {
            //     console.table(departments);
            //     init();
            // });
            break;
        }
        case 'View All Roles': {
            getTable('roles');
            // db.query('SELECT * FROM roles', (err, roles) => {
            //     console.table(roles);
            //     init();
            // });
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
            'View All Employees',
            'View All Departments',
            'View All Roles',
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
