import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const database = process.env.DB_NAME as string;
const username = process.env.DB_USERNAME as string;
const password = process.env.DB_PASSWORD as string;
const host = process.env.DB_HOST as string;
const port = process.env.DB_PORT as string;
const dialect = 'mysql';

const sequelize = new Sequelize(database, username, password, {
  host: host,
  port: parseInt(port), // Specify the port here
  dialect: dialect,
  logging: false,
});

const createDatabase = async () => {
  try {
    // Connect to the database server
    const sequelizeWithoutDb = new Sequelize('', username, password, {
      host: host,
      port: parseInt(port), // Specify the port here
      dialect: dialect,
      logging: false,
    });

    // Create the database if it doesn't exist
    await sequelizeWithoutDb.query(`CREATE DATABASE IF NOT EXISTS ${database};`);

    console.log(`Database ${database} created or already exists.`);
  } catch (error) {
    console.error('Unable to create the database:', error);
  } finally {
    await sequelize.close();
  }
};

createDatabase();