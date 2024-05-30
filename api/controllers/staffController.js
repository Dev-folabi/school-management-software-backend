const Staff = require('../../model/user/staffModel');
const Role = require('../../model/roleModel');
const bcrypt = require('bcrypt');
const validateStaff = require('../validator/staffValidate');

const createStaff = async (req, res) => {
    try {
        const { error } = validateStaff(req.body);
        if (error) return res.status(400).json({ error: error.details[0].message });

        const { firstName, lastName, email, password, gender, address, role, DOB, salary, qualification, classes, section, subjects, classTeacher } = req.body;

        let staff = await Staff.findOne({ email });
        if (staff) {
            return res.status(400).send({ error: 'Staff member already exists.' });
        }

        const staffRole = await Role.findOne({ role });
        if (!staffRole) {
            return res.status(400).send({ error: 'Invalid role.' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        staff = new Staff({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            gender,
            address,
            role: staffRole._id,
            DOB,
            salary,
            qualification,
            classes,
            section,
            subjects,
            classTeacher,
        });

        await staff.save();
        await staff.populate('role')
        const token = staff.generateAuthToken();
        res.status(201).json({ message: "User created successfully", token, id: staff._id, email: staff.email });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getStaffs = async (req, res) => {
    try {
        const staffs = await Staff.find({}).populate('role').select('-password');
        res.status(200).json(staffs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getStaff = async (req, res) => {
    const { id } = req.params;
    try {
        const staff = await Staff.findById(id).populate('role').select('-password');
        if (!staff) return res.status(404).json({ error: "Staff not found" });
        res.status(200).json(staff);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateStaff = async (req, res) => {
    const { id } = req.params;
    try {
        const { password, role, ...updateFields } = req.body;

        let staff = await Staff.findById(id);
        if (!staff) return res.status(404).json({ error: "Staff not found" });

        const staffRole = await Role.findOne({ role });

        if (!staffRole) {
            return res.status(400).send({ error: 'Invalid role.' });
        }else{ updateFields.role =  staffRole._id }

        if (password) {
            const salt = await bcrypt.genSalt(10);
            updateFields.password = await bcrypt.hash(password, salt);
        }

        staff = await Staff.findByIdAndUpdate(id, updateFields, { new: true }).populate('role').select('-password');
        res.status(200).json(staff);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteStaff = async (req, res) => {
    const { id } = req.params;
    try {
        const staff = await Staff.findById(id);
        if (!staff) return res.status(404).json({ error: "Staff not found" });

        await Staff.findByIdAndDelete(id);
        res.status(200).json({ message: 'User deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    createStaff,
    getStaffs,
    getStaff,
    updateStaff,
    deleteStaff
};
