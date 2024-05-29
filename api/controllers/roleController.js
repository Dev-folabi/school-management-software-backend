const express = require('express');
const router = express.Router();
const Role = require('../../model/roleModel');

const createRole = async (req, res) => {
    const { role } = req.body;
    try {
        const existingRole = await Role.findOne({ role });
        if (existingRole) {
            return res.status(400).json({ msg: 'Role already exists' });
        }

        const newRole = new Role({ role });
        await newRole.save();

        res.status(201).json(newRole);
    } catch (err) {
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
};

const getRoles = async (req, res) =>{
    try{
const roles = await Role.find({})

if(!roles) return res.status(400).json('role empty')

res.status(200).json({roles})

    }
    catch(err){
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
}

const updateRole = async (req, res) => {

    try {

        const role = await Role.findOne(req.body.role);
        if (!role) return res.status(404).json({ error: "role not found" });


        const updatedRole = await Role.findOneAndUpdate(role, updateFields, { new: true })
        res.status(200).json(updatedRole);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteRole = async (req, res)=> {
    try {

        const role = await Role.findOne(req.body.role);
        if (!role) return res.status(404).json({ error: "role not found" });


        const updatedRole = await Role.findOneAndUpdate(id, updateFields, { new: true })
        res.status(200).json(updatedRole);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }

}

module.exports = {
    createRole,
    getRoles,
}


