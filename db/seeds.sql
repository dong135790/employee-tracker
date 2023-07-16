USE employee_db;

INSERT INTO departments (name) 
    VALUES ('Customer Service'), ('Marketing');
INSERT INTO roles (title, salary) 
    VALUES ('Receptionist', 60000), ('Tele-Marketer', 70000);
INSERT INTO employees (first_name, last_name) 
    VALUES ('John', 'Smith'), ('Henry', 'Wesker'), ('James', 'Baker');

SELECT * FROM departments;
SELECT * FROM roles;
SELECT * FROM employees;