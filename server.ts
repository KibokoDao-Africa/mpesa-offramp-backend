import "dotenv/config";
import app from './src/app';
import sequelize from './src/config/database';
import { createServer } from "http";

// console.log("hello world 3");

const PORT = parseInt(process.env.PORT || '8080', 10);

const startServer = () => {
const server = createServer(app);
  sequelize.sync().then(() => {
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    })
  }).catch((error) => {
    console.error('Failed to start server:', error);
  }
  )
}


startServer();
