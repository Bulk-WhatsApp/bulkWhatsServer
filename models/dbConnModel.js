var MySql = require('sync-mysql');


  const connections = new MySql({
    host: "localhost",
    user: "sourabh",
    password: "password",
    //password: process.env.DB_PASS,
    database: "db_youngMind",
    charset: 'utf8mb4'
  });
  




  module.exports = connections