import express from 'express';

import MessageResponse from '../interfaces/MessageResponse';
import emojis from './emojis';
import meetings from './meetings';

const router = express.Router();

router.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

router.use('/emojis', emojis);

router.use('/meetings', meetings);

router.post<{}, MessageResponse>('/test', (req, res) => {
  res.json({
    message: 'Test Route',
  });
});




export default router;
