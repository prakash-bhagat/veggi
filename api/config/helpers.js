const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

var database = mysql.createPool({
    connectionLimit : 1000000,
    //connectTimeout  : 60 * 60 * 1000,
    // acquireTimeout  : 60 * 60 * 1000,
    // timeout         : 60 * 60 * 1000,
     host: 'homease.cg5idmygnvsl.ap-south-1.rds.amazonaws.com',
     port: 3306,
    user: 'admin',
     password: 'Pranjal123',
     database: 'mega_shop'
  });
  //console.log(database);
  database.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
    if (error) throw error;
    console.log(error);
    console.log('The solution is: ', results[0].solution);
  });
  // database.release();


module.exports = database
