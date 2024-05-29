const express = require('express');
const router = express.Router();
const { createRole } = require('../api/controllers/roleController');
const { auth, authorize } = require('../middlewares/authMiddleware');

router.post('/', auth, authorize('admin'), createRole);

module.exports = router;
