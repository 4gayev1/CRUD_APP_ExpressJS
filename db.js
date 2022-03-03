const db = require('mysql2');

const pool = db.createPool({
    host:"localhost",
    user:"root",
    password:"Aa1674838",
    database:"crud"
})


module.exports = pool.promise();