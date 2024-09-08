import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('postgresql://postgres:1234@127.0.0.1:5432/postgres', 
  {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: process.env.DATABASE_SSL === 'true',
  },
  logging: false, // You can enable this to see SQL queries in the console
});

export default sequelize;
// host as 127.0.0.1,  port 5432 ,username postgres pasward 1234 database postgres?