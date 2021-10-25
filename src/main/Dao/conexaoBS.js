
const {Pool} = require('pg');

const pool = new Pool({ //criando objeto pool a partir dos BD   
    user: "postgres",
    password: "postgres",
    host: "localhost",
    database: "projetoweb",
    port: 5432
})

module.exports = pool;
