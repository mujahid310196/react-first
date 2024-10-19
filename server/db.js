const mysql = require('mysql2');

// Create a connection pool
const pool = mysql.createPool({
  host: 'localhost',       // Database host (e.g., localhost)
  user: 'root',            // Your MySQL username
  password: '',            // Your MySQL password
  database: 'reactexdb', // The database you want to connect to
  waitForConnections: true,
  connectionLimit: 10,     // The maximum number of connections
  queueLimit: 0
});

// Export the pool for use in other files
module.exports = pool.promise();
