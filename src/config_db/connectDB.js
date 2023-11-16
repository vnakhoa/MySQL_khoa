
const mysql = require('mysql2')

var connection = mysql.createConnection({
    // host: "localhost",
    user: "root",
    port: 3306,
    password: "03012001",
    database: "testdb"
});
// Kết nối cơ sở dữ liệu
connection.connect((err) => {
    if (err) {
        console.error('Connect Unsucessfully! : ', err);
        return;
    }
    console.log('Connect Sucessfully !!!');
});

module.exports = { connection }