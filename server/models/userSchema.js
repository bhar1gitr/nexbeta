const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid'); // npm install uuid

const userSchema = new mongoose.Schema({
  name: String,
  profilePic: { type: String, default: 'https://avatar.iran.liara.run/public' },
  email: { type: String, unique: true },
  password: String,
  userLink: { type: String, unique: true },
  socialLinks: Array,
  products: Array
}, { timestamps: true });

// 🔒 Hash password if modified
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    } catch (err) {
      return next(err);
    }
  }

  // 🎯 Generate userLink if not set
  if (!this.userLink) {
    this.userLink = `${this.name?.toLowerCase().replace(/\s+/g, '-')}-${uuidv4().slice(0, 6)}`;
  }

  next();
});

module.exports = mongoose.model('User', userSchema);
