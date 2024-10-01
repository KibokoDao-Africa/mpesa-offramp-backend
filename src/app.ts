import express from 'express';
import routes from './routes';
import cors from 'cors';

const app = express();

// Enable CORS for all requests
app.use(cors());

// Use the built-in JSON middleware
app.use(express.json());

// Add a GET route for the index
app.get('/', (req, res) => {
  res.send('Server running');
});


// Use the routes
app.use('/api/onramp', routes.onrampRoutes);
app.use('/api/offramp', routes.offrampRoutes);
app.use('/api/buygoods', routes.buyGoodsRoutes);
app.use('/api/paybill', routes.paybillRoutes);
app.use('/api/b2c', routes.b2cRoutes);
app.use('/api/stkpush', routes.stkPushRoutes);

export default app;
