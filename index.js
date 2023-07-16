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
        console.log('Added ______ to the database');
        init();
    })
}

const insertRole = (data) => {
    db.query('INSERT INTO roles SET ?', data, (err, result) => {
        if (err) {
            return console.error(err);
        }
        console.log('Added ______ to roles');
        init();
    })
}
const updateEmployee = (data) => {
    // add sql in here
    db.query('', data, (err, result) => {
        if (err) {
            return console.error(err);
        }
        console.log('Added Selected Employee to the Database!');
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
            // Need breaks or you wont be able to interact with prompt inputs.
            break;
        }
        case 'View All Roles': {
            getTable('roles');
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
                {
                    name: 'role_id',
                    message: 'What is the employee role?',
                    // TODO
                },
                {
                    name: 'manager_id',
                    message: 'Who is the employees manager?',
                    // TODO
                },
            ]).then(insertEmployee);
            break;
        }
        case 'Add Department': {
            prompt([
                {
                    name: 'name',
                    message: 'What is the name of the department?'
                },
            ]).then(insertDepartment);
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
                {
                    name: 'department_id',
                    message: 'Which department does the role belong to?',
                    // 
                    choices: [
                        'Service',
                        'Sales',
                        'Engineering',
                        'Finance',
                        'Legal',
                        'Other'
                    ]
                }
            ]).then(insertRole);
            break;
        }
        case 'Update Employee Role': {
            prompt([
                {
                    name: 'update',
                    message: 'Which employees role do you want to update?',
                    // TODO add the names of the employees that you wish to update
                    choices: [
                        
                    ]
                }
            ]).then(updateEmployee);
        }
        // Add a way to get out of init()/prompt system or it will keep asking you questions.
        default: {
            process.exit();
        };
    };
};

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
