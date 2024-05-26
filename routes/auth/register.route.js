const express = require("express");
const { createAdmin, getAdmins } = require('../../api/controllers/adminController')
const router = express.Router();


router.post("/", createAdmin )
router.get("/", getAdmins)


module.exports = router;
