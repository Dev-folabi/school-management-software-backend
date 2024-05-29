const express = require("express");
const { createStaff, getStaffs, getStaff, updateStaff, deleteStaff } = require("../../api/controllers/staffController");
const router = express.Router();


router.post("/", createStaff );
router.get("/", getStaffs );
router.get("/:id", getStaff);
router.put("/:id", updateStaff );
router.delete("/:id", deleteStaff );

module.exports = router;
