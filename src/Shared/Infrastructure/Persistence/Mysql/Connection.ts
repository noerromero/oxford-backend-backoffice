import { createPool, PoolOptions } from "mysql2/promise";

export async function connect() {
  const connection = await createPool({
    host: "localhost",
    port: 3307,
    user: "root",
    password: "123456",
    database: "oxforddb",
    connectionLimit: 10,
  } as PoolOptions);

  return connection;
}
