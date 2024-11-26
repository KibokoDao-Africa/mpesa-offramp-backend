import { Sequelize } from 'sequelize';
// import * as dotenv from 'dotenv';
// dotenv.config();

const sequelize = new Sequelize(process.env.LOCAL_DATABASE_URL as string, 
  {
    dialect: 'postgres',
    protocol: 'postgres',
    // dialectOptions: {
    //   ssl: process.env.DATABASE_SSL === 'false',
    // },
    logging: false, // You can enable this to see SQL queries in the console
  }
);

try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

export default sequelize;
