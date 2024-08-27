import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes';

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api', routes);

// Error Handling
app.use((err: any, req: any, res: any, next: any) => {
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
  });
});

export default app;
