import app from './app';
import db from './models';
import './indexer/apibaraIndexer'; // This will start the Apibara indexer

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    // Connect to the database
    await db.sequelize.sync();

    // Start the Express server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};

startServer();
