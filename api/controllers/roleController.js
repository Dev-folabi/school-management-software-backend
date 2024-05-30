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

const getRoles = async (req, res) => {
    try {
        const roles = await Role.find({});
        if (!roles || roles.length === 0) {
            return res.status(400).json({ msg: 'No roles found' });
        }

        res.status(200).json(roles);
    } catch (err) {
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
};

const updateRole = async (req, res) => {
    const { id } = req.params;
    const { role } = req.body;

    try {
        const existingRole = await Role.findById(id);
        if (!existingRole) {
            return res.status(404).json({ error: 'Role not found' });
        }

        existingRole.role = role;
        const updatedRole = await existingRole.save();

        res.status(200).json(updatedRole);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteRole = async (req, res) => {
    const { id } = req.params;

    try {
        const role = await Role.findById(id);
        if (!role) {
            return res.status(404).json({ error: 'Role not found' });
        }

        await Role.findByIdAndDelete(id);
        res.status(200).json({ message: 'Role deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    createRole,
    getRoles,
    updateRole,
    deleteRole
};
