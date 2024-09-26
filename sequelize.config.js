const path = require('path');
require('dotenv').config();  // Load environment variables from .env file

module.exports = {
  // development: {
  //   username: process.env.DB_USERNAME,
  //   password: process.env.DB_PASSWORD,
  //   database: process.env.DB_NAME,
  //   host: process.env.DB_HOST,
  //   dialect: 'postgres',
  //   dialectOptions: {
  //     ssl: process.env.DATABASE_SSL === 'true',
  //   },
  // },
  development: {
    url: process.env.DATABASE_URL,
    password: process.env.DB_PASSWORD,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true, // This will force SSL connection
        rejectUnauthorized: false, // This allows self-signed certificates
      },
  },
  },

  production: {
    url: process.env.DATABASE_URL,
    password: process.env.DB_PASSWORD,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true, // This will force SSL connection
        rejectUnauthorized: false, // This allows self-signed certificates
      },
  },
}
}
