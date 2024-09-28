import "dotenv/config";
import app from './src/app';
import sequelize from './src/config/database';

console.log("hello world 3");

const PORT = parseInt(process.env.PORT || '3000', 10);

const startServer = async () => {
  try {
    await sequelize.sync();
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
  }
};

startServer();
