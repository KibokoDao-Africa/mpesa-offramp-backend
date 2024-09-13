import { Sequelize } from 'sequelize';
// import * as dotenv from 'dotenv';
// dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL as string, 
  {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
      ssl: process.env.DATABASE_SSL === 'true',
    },
    logging: false, // You can enable this to see SQL queries in the console
  }
);

export default sequelize;
