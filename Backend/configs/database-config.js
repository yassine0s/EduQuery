const MYSQL_HOST =  'localhost';
const MYSQL_USER = 'root';
const MYSQL_PASSWORD = 'root';
module.exports = {
  connection: {
    host: MYSQL_HOST,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
    database: 'db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  },
  database: 'db',
//   user_table: 'users',
};