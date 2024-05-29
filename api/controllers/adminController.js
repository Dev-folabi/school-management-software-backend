const Admin = require('../../model/user/adminModel');
const User = require('../../model/user/usersModel');
const bcrypt = require('bcrypt');
const validateUser = require('../validator/staffValidate');

const createAdmin = async (req, res) => {
    try {
        const { error } = validateUser(req.body);
        if (error) return res.status(400).json({ error: error.details[0].message });

        const { firstName, lastName, email, password } = req.body;
        let existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ error: "User already exists" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const admin = new Admin({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            role: 'admin' 
        });

        await admin.save();

        const token = admin.generateAuthToken()

        res.status(201).json({ message: "Admin created successfully", token, id: admin._id, email: admin.email });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getAdmins = async (req, res) => {
    try {
        const admins = await Admin.find({}).select('-password'); 
        if(!admins) return res.status(400).json('No Admin found')
        res.status(200).json(admins);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getAdmin = async (req, res) => {
    const { id } = req.params; 
    try {
        const admin = await Admin.findById(id).select('-password'); 
        if (!admin) return res.status(404).json({ error: "Admin not found" });
        res.status(200).json(admin);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateAdmin = async (req, res) => {
    const { id } = req.params; 

    try {
       
        const { password, ...updateFields } = req.body;

        const admin = await Admin.findById(id);
        if (!admin) return res.status(404).json({ error: "Admin not found" });


        const updatedAdmin = await Admin.findByIdAndUpdate(id, updateFields, { new: true }).select('-password');
        res.status(200).json(updatedAdmin);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteAdmin = async (req, res)=> {
    const {id} = req.params;
    try {
       

        const admin = await Admin.findById(id);
        if (!admin) return res.status(404).json({ error: "Admin not found" });

     await Admin.findByIdAndDelete(id)
        res.status(200).json({message: 'user deleted'});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }

}

module.exports = {
    createAdmin,
    getAdmins,
    getAdmin,
    updateAdmin,
    deleteAdmin 
};
