import { createPool, PoolOptions } from "mysql2/promise";
import { config } from "dotenv";
config();

export async function connect() {
  const connection = await createPool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: 10,
  } as PoolOptions);

  return connection;
}
