const sql = require("mssql");

const CONFIG = {
    user: 'sa',
    password: '123456789',
    server: 'localhost',
    database: 'DBVistaVeludo',
    options: {
        encrypt: true,
        trustServerCertificate: true 
        }
}
async function getConnection() {
    try {
        const pool = await sql.connect(CONFIG);
        return pool;
    } catch (error) {
        console.error('Erro na conexão SQL Server', error);
    }
    
}

(async () => {
    const pool = await getConnection();

    if (pool) {
        console.log("Conexão com o BD realizada com sucesso!");
    }
})();

module.exports = {sql, getConnection};