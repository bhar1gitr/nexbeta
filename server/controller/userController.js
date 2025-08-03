const User = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(req.body);

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                userLink: user.userLink, // ✅ Add this
                profilePic: user.profilePic, // (optional if needed)
                socialLinks: user.socialLinks || [], // (optional)
                products: user.products || [], // (optional)
            }
        });

    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

const Register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const newUser = new User({ name, email, password });
        await newUser.save(); // triggers pre('save') => hashes password

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

const fetchUser = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required.' });
    }

    const user = await User.findById(userId).populate('products');

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

module.exports = { Login, Register, fetchUser }