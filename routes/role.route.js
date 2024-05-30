const express = require('express');
const router = express.Router();
const { createRole, getRoles, updateRole, deleteRole } = require('../api/controllers/roleController');
const { auth, authorize } = require('../middlewares/authMiddleware');

router.post('/', auth, authorize('Super Admin', 'Admin'), createRole);
router.get('/', auth, authorize('Super Admin', 'Admin'), getRoles);
router.put('/', auth, authorize('Super Admin', 'Admin'), updateRole);
router.delete('/', auth, authorize('Super Admin', 'Admin'), deleteRole)

module.exports = router;