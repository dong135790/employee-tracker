-- Active: 1689296482357@@127.0.0.1@3306@employee_db
USE employee_db;

SELECT * FROM roles;
/* JOIN DEPARTMENT AND ROLES */

SELECT roles.id, title, name AS department, salary FROM roles
JOIN departments ON departments.id = roles.department_id;

SELECT employees.id, first_name, last_name, title, name AS department, salary, manager_id 
FROM employees 
JOIN roles 
ON roles.id = employees.role_id
JOIN departments 
ON departments.id = employees.role_id;

SELECT title, name AS department, salary FROM roles
JOIN departments ON departments.id = roles.department_id;
SELECT title, salary FROM roles WHERE name = Finance
JOIN departments ON departments.id = roles.department_id;