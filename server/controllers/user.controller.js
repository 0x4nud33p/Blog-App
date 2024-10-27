import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

async function hashPassword(password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
}

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!email || !password || !username) {
    return res
      .status(400)
      .json({ message: "Email, password, and username are required" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      const hashedPassword = await hashPassword(password);

      const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
      });

      return res.status(201).json({ message: "User registered successfully" });
    } else {
      return res
        .status(400)
        .json({ message: "User already exists, please login" });
    }
  } catch (error) {
    console.error("Error while signing up:", error.message);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      message: "User signed in successfully",
      token,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

export { registerUser, login };
