const express = require('express');
const router = express.Router();
const gstController = require('../../controllers/API/gstController');

router.post('/verify-gst', gstController.verifyGST);

module.exports = router;
