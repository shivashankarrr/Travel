const express = require('express');
const User = require('../modal/user_modal');
const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
    return jwt.sign({ id: userId }, 'your_secret_key', { expiresIn: '1h' });
  };

class AuthController {
    register = async (req, res) => {
        try {
            const { name, email, password } = req.body;
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'Email already exists' });
            }
            const newUser = new User({ name, email, password });
            await newUser.save();
            res.status(201).json({status:true, user:newUser});
        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).json({ message: 'Server error' });
        }
    }

    login = async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
        
            if (!user) {
              return res.status(401).json({ message: 'Invalid email' });
            }
        
            if (user.password !== password) {
              return res.status(401).json({ message: 'Invalid password' });
            }
        
            const token = generateToken(user._id);
            res.status(200).json({ user, token }); 
          } catch (err) {
            res.status(500).json({ message: err.message });
          }
    }

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
}

module.exports = new AuthController();
