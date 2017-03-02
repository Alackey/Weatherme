import express from 'express';
import { createAlert } from '../database/db';

const router = express.Router();

/* GET alerts listing. */
router.get('/', (req, res) => {
  res.send('display alter');
});

/* POST adds alert */
router.post('/', (req, res) => {
  console.log(`Request body: ${req.body}`);
  let response;

  // Create an alert based on post data
  createAlert(req.body).then((msg) => {
    response = { status: msg };
  }).catch((err) => {
    response = {
      status: 'error',
      message: err,
    };
  }).then(() => {
    // Sends the response to client
    res.json(response);
  });
});

export default router;
