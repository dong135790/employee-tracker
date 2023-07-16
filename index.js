// Import and require mysql2
const express = require('express');
// Import and require mysql2 (GETTING THE CLIENT)
const mysql = require('mysql2');
// Setting port to 3001 or any other available port in environment.
const PORT = process.env.PORT || 3001;
// to execute express if need.
const app = express();

// Express middleware... WHAT DOES IT DO?
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Creating the connection to the database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: '',
      database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
  );