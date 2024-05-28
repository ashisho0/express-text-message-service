const express = require('express');
const router = express.Router();
const { queueMessageHandler } = require('../controllers/message.controller');

router.post('/queue', queueMessageHandler);

module.exports = router;
