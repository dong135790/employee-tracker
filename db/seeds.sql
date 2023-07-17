-- Active: 1689296482357@@127.0.0.1@3306@employee_db
USE employee_db;

INSERT INTO departments (name) 
    VALUES ('Engineering'), ('Finance');
INSERT INTO roles (title, salary, department_id) 
    VALUES ('Software Engineer', 120000, 1), ('Account Manager', 160000, 2);

INSERT INTO employees (first_name, last_name, role_id) 
    VALUES ('John', 'Smith', 1), ('Henry', 'Wesker', 2);
SELECT * FROM roles;
SELECT * FROM departments;
SELECT * FROM employees;
