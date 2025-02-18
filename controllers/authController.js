const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userFind = await User.findOne({ email });

    if (userFind) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists." });
    }

    const newUser = new User({ name, email, password });

    newUser.password = await bcrypt.hash(password, 10);
    const savedUser = await newUser.save();

    res.status(201).json({
      success: true,
      message: "User created successfully.",
      data: savedUser,
    });
  } catch (error) {
    console.error("Error Saving: ", error);
    res.status(500).json({ success: false, message: "Internal Server Error." });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userFind = await User.findOne({ email });

    if (!userFind) {
      return res.status(403).json({
        success: false,
        message: "Auth failed! Email or Password is wrong.",
      });
    }

    const validPassword = await bcrypt.compare(password, userFind.password);

    if (!validPassword) {
      return res.status(403).json({
        success: false,
        message: "Auth failed! Email or Password is wrong.",
      });
    }

    const jwtToken = jwt.sign(
      { email: userFind.email, _id: userFind._id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(200).json({
      success: true,
      message: "Login! Successfully.",
      jwtToken,
      email,
      name: userFind.name,
      user: userFind,
    });
  } catch (error) {
    console.error("Error Saving: ", error);
    res.status(500).json({ success: false, message: "Internal Server Error." });
  }
};

module.exports = { signup, login };
