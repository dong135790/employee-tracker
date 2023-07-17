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

const employeeTable = (tableName) => {
    db.query('SELECT employees.id, first_name, last_name, title, name AS department, salary, manager_id FROM ?? JOIN roles ON roles.id = employees.role_id JOIN departments ON departments.id = employees.role_id',tableName, (err, result) => {
        if (err) {
            return console.error(err);
        }
        console.table(result);
        init();
    });
}
const roleTable = (tableName) => {
    db.query('SELECT roles.id, title, name AS department, salary FROM ?? JOIN departments ON departments.id = roles.department_id',tableName, (err, result) => {
        if (err) {
            return console.error(err);
        }
        console.table(result);
        init();
    });
}
// For entering employee
const insertEmployee = (data) => {
    db.query('INSERT INTO employees SET ?', data , (err, result) => {
        if (err) {
            return console.error(err);
        }
        console.log('Added Employee');
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
// const updateEmployee = (data) => {
//     // add sql in here
//     db.query('', data, (err, result) => {
//         if (err) {
//             return console.error(err);
//         }
//         console.log('Added Selected Employee to the Database!');
//         init();
//     })
// }

const getTotal = (data) => {
    db.query('SELECT departments, salary, SUM(salary) AS total_salary FROM roles WHERE department = ??', data, (err, result) => {
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
            employeeTable('employees');
            break;
        }
        case 'View All Departments': {
            getTable('departments');
            // Need breaks or you wont be able to interact with prompt inputs.
            break;
        }
        case 'View All Roles': {
            roleTable('roles');
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
                // {
                //     name: 'role_id',
                //     message: 'What is the employee role?',
                //     // TODO
                // },
                // {
                //     name: 'manager_id',
                //     message: 'Who is the employees manager?',
                //     // TODO
                // },
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
                // {
                //     name: 'department_id',
                //     message: 'Which department does the role belong to?',
                //     // Add it into the sql
                //     type: 'number',
                //     choices: [
                //         1,
                //         2,
                //         3,
                //         4,
                //         5,
                //         6
                //         // 'Service',
                //         // 'Sales',
                //         // 'Engineering',
                //         // 'Finance',
                //         // 'Legal',
                //         // 'Other'
                //     ]
                // }
            ]).then(insertRole);
            break;
        }
        case 'Update Employee Role': {
            prompt([
                {
                    name: 'update',
                    message: 'Which employees role do you want to update?',
                    // How to select data from the database with prompt systems.
                    // TODO add the names of the employees that you wish to update. ('SELECT first_name, last_name FROM employees')
                    choices: [
                        
                    ]
                },
                {
                    name: 'assign',
                    message: 'Which role do you want to assign the selected employee?',
                    choices: [
                        'Sales Lead',
                        'Lead Engineer',
                        'Software Engineer',
                        'Account Manager',
                        'Accountant',
                        'Legal Team Lead'
                    ]
                }
                // TODO function
            ]).then(updateEmployee);
            break;
        }
        case 'View total budget of department': {
            prompt([
                {
                    name: 'total',
                    message: 'Which department would you like to view?',
                    choices: [
                        'Service',
                        'Sales',
                        'Engineering',
                        'Finance',
                        'Legal',
                        'Other'
                    ]
                }
            ]).then(getTotal);
            break;
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
            'View total budget of department',
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
