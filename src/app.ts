import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes';

const app = express();

app.use(bodyParser.json());

app.use('/api/onramp', routes.onrampRoutes);
app.use('/api/offramp', routes.offrampRoutes);
app.use('/api/buygoods', routes.buyGoodsRoutes);
app.use('/api/paybill', routes.paybillRoutes);
app.use('/api/b2c', routes.b2cRoutes);
app.use('/api/stkpush', routes.stkPushRoutes);

export default app;
