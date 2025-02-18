const express = require('express');
const router = express.Router();
const gstController = require('../../controllers/API/gstController');

// Define GST Verification Route
router.post('/verify-gst', gstController.verifyGST);

module.exports = router;
