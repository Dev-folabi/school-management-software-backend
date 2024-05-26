const Admin = require('../../model/user/adminModel');
const User = require('../../model/user/usersModel');
const bcrypt = require('bcrypt');
const validateUser = require('../validator/userValidate');

const createAdmin = async (req, res) => {
    try {
        const { error } = validateUser(req.body);
        if (error) return res.status(400).json({ error: error.details[0].message });

        const { firstName, lastName, email, password } = req.body;
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ error: "User already exists" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new Admin({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            role: 'admin'
        });

        await user.save();

        res.status(201).json({ message: "Admin created successfully", user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getAdmins = async (req, res) => {
    try {
        const admins = await Admin.find({});
        res.status(200).json(admins);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    createAdmin,
    getAdmins
};
