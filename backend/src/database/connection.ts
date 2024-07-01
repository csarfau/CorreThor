import { Client } from "pg";
import dotenv from "dotenv";

dotenv.config();

async function connectToDatabase() {
  const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT as unknown as number || 5432,
  });

  try {
    await client.connect();
    console.log("Conexão bem sucedida!");
    return client;

  } catch (error) {
    console.log("Erro de conexão com o banco de dados: ", error);
    throw error;
  }
}

module.exports = { connectToDatabase };