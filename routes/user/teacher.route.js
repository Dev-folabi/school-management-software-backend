const express = require("express");
const { createTeacher, getTeachers, getTeacher, updateTeacher, deleteTeacher } = require("../../api/controllers/teacherController");
const router = express.Router();


router.post("/", createTeacher );
router.get("/", getTeachers );
router.get("/:id", getTeacher);
router.put("/:id", updateTeacher );
router.delete("/:id", deleteTeacher );

module.exports = router;
