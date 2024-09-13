import "dotenv/config";
import app from './src/app';
import  sequelize  from './src/config/database';

// dotenv.config()
console.log("hello world 3");


const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);

    });
  } catch (error) {
    console.error('Failed to start server:', error);
  }
};

startServer();
