const Users = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userCtrl = {
  registerUser: async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const user = await Users.findOne({ email: email });
      if (user) {
        return res.status(400).json({
          message: "The email is already registered with another account.",
        });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new Users({
        username,
        email,
        password: hashedPassword,
      });
      await newUser.save();

      res.status(200).json({
        message: "registered successfully",
        newUser,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await Users.findOne({ email: email });
      if (user) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
          const payload = { id: user._id, name: user.username };
          const token = jwt.sign(payload, process.env.TOKEN, {
            expiresIn: "4h",
          });

          res.status(200).json({ message: "logged in successfully", token });
        } else {
          return res
            .status(404)
            .json({ message: "Incorrect email or password" });
        }
      } else {
        return res.status(404).json({ message: "Incorrect email or password" });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};

module.exports = userCtrl;
