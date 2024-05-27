const Teacher = require('../../model/user/teacherModel');
const User = require('../../model/user/usersModel');
const bcrypt = require('bcrypt');
const validateUser = require('../validator/userValidate');

const createTeacher = async (req, res) => {
    try {
        const { error } = validateUser(req.body);
        if (error) return res.status(400).json({ error: error.details[0].message });

        const { firstName, lastName, email, password, classes, subjects, classTeacher } = req.body;
        let existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ error: "User already exists" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const teacher = new Teacher({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            
            classes,
            subjects,
            classTeacher
        });

        await teacher.save();

        res.status(201).json({ message: "Teacher created successfully", id: teacher._id, email: teacher.email });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


const getTeachers = async (req, res) => {
    try {
        const teacher = await Teacher.find({}).select('-password'); 
        res.status(200).json(teacher);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getTeacher = async (req, res) => {
    const { id } = req.params; 
    try {
        const teacher = await Teacher.findById(id).select('-password'); 
        if (!teacher) return res.status(404).json({ error: "Teacher not found" });
        res.status(200).json(teacher);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateTeacher = async (req, res) => {
    const { id } = req.params; 

    try {
       
        const { password, ...updateFields } = req.body;

        const teacher = await Teacher.findById(id);
        if (!teacher) return res.status(404).json({ error: "Teacher not found" });


        const updatedTeacher = await Teacher.findByIdAndUpdate(id, updateFields, { new: true }).select('-password');
        res.status(200).json(updatedTeacher);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteTeacher = async (req, res)=> {
    const {id} = req.params;
    try {
       

        const teacher = await Teacher.findById(id);
        if (!teacher) return res.status(404).json({ error: "Teacher not found" });

     await Teacher.findByIdAndDelete(id)
        res.status(200).json({message: 'user deleted'});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }

}

module.exports = {
    createTeacher,
    getTeachers,
    getTeacher,
    updateTeacher,
    deleteTeacher
};
