USE employee_db;

INSERT INTO departments (name) 
    VALUES ('Engineering'), ('Finance');
INSERT INTO roles (title, salary) 
    VALUES ('Software Engineer', 120000), ('Account Manager', 160000);
INSERT INTO employees (first_name, last_name) 
    VALUES ('John', 'Smith'), ('Henry', 'Wesker'), ('James', 'Baker');

SELECT * FROM departments;
SELECT * FROM roles;
SELECT * FROM employees;