const User = require('../models/userSchema'); // adjust the path as per your project structure
const bcrypt = require('bcryptjs');

// Fetch user profile
const fetchUser = async (req, res) => {
  try {
    const userId = req.user.id; // assuming you're using JWT middleware and user id is in req.user
    const user = await User.findById(userId).select('-password'); // exclude password
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

// Update user profile
const updateProfile = async (req, res) => {
  try {
    const { name, email, password, userId, profilePic, socialLinks } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (name) user.name = name;
    if (email) user.email = email;
    if (profilePic) user.profilePic = profilePic;
    if (Array.isArray(socialLinks)) user.socialLinks = socialLinks;
    if (password) user.password = password; // Will get hashed by middleware

    const updatedUser = await user.save();

    const userWithoutPassword = updatedUser.toObject();
    delete userWithoutPassword.password;

    res.status(200).json({ message: 'Profile updated', user: userWithoutPassword });

  } catch (err) {
    console.error("Error updating profile:", err);
    res.status(500).json({ message: 'Update failed', error: err.message });
  }
};

const deleteAccount = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findByIdAndDelete(userId);

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ message: 'Account deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Deletion failed', error: err.message });
  }
};

module.exports = { updateProfile, deleteAccount, fetchUser };
