const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../modal/user_modal');

class UserController {
    profile = async (req, res) => {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, 'your_secret_key');
            const user = await User.findById(decoded.id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json({ user }); 
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    update_user = async (req, res) => {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, 'your_secret_key');
            const user = await User.findById(decoded.id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            const { name, email, password } = req.body; 
            user.name = name;
            user.email = email;
            user.password = password; 
            await user.save();
            res.status(200).json({ user });
        } catch (error) {
            console.error('Error updating user:', error);
            res.status(500).json({ message: 'Server error' });
        }
    }
}

module.exports = new UserController();
