require('dotenv').config();
const mysql = require('mysql2/promise');
/*var pool = mysql.createPool({
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

module.exports = pool.getConnection(function (e, conn) {
    if (e)
        return re
}*/

module.exports = mysql.createConnection({
    //host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
    //queueLimit: 0,
    //connectionLimit: 0
});//.then(() => console.log('Good')).catch(e => console.log(e));


//host: "193.xxx.xxx.xxx",
/*.then((connection) => {
    
    connection.execute(`CREATE TABLE Guilds(guildId VARCHAR(255))`);
})
.then(() => console.log('Good'))
.catch(e => console.log(e));*/

//console.log(`connection = ${module.exports}`);