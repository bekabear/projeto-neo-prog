import  config  from "../../knexfile.js";
import knex from "knex";

// Conection

import dotenv from 'dotenv'
dotenv.config()

const environment = process.env.NODE_ENV || 'development';

export const conn = knex(config[environment]);

conn.raw("SELECT 1")
.then(() => {
    console.log("🟩Conexão com banco de dados estabelecida com sucesso!");
}).catch((error) => {
    console.error("❌Erro ao conectar ao banco de dados", error.message)
})