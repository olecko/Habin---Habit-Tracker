const User = require('../models/User');
const bcrypt = require('bcryptjs');

const Joi = require('@hapi/joi');

const userValidationSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      email,
      password: hashedPassword
    });
    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user' });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }
    // Generate and send JWT token
    // ...
  } catch (error) {
    res.status(500).json({ message: 'Error logging in' });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;
    const userId = req.user.id;

    // Validate updated data using userValidationSchema
    const { error } = userValidationSchema.validate({ email, password, firstName, lastName });
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // Update relevant fields based on request
    const updatedFields = {};
    if (email) updatedFields.email = email;
    if (password) updatedFields.password = await bcrypt.hash(password, 10);
    if (firstName) updatedFields.firstName = firstName;
    if (lastName) updatedFields.lastName = lastName;

    await User.findByIdAndUpdate(userId, updatedFields);
    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.user.id;

    // Delete user and associated habits (cascading deletion)
    await User.findByIdAndDelete(userId);

    res.status(200).json({ message: 'Account deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting account' });
  }
};

module.exports = {
  registerUser,
  loginUser,
  updateProfile,
  deleteUser
};
