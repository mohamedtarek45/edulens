import User from "../models/user.js";
import { comparePassword, hashPassword } from "../../utils/HashingPassword.js";
import jwt from "jsonwebtoken";

import cookieOptions from "../../config/cookieOptions.js";

export const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email }).select(
      "+password",
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await comparePassword(req.body.password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }
    const token = jwt.sign(
      { email: user.email, role: user.role, name: user.name },
      process.env.JWT_SECRET,
    );
    res
      .status(200)
      .cookie("token", token, cookieOptions)
      .json({
        message: "Login success",
        user: {
          email: user.email,
          role: user.role,
          name: user.name,
        },
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error Logging in" });
  }
};

export const logoutUser = (req, res) => {
  res.clearCookie("token", cookieOptions);

  return res.json({ message: "Logged out successfully" });
};

export const createUser = async (req, res) => {
  const isExist = await User.findOne({ email: req.body.email });
  if (isExist) {
    return res.status(400).json({ message: "Email already exists" });
  }
  try {
    if (req.body.role === "teacher") {
      if (!req.user || req.user.role !== "teacher") {
        return res
          .status(403)
          .json({ message: "Only teacher can create teacher" });
      }
    }
    const hashedPassword = await hashPassword(req.body.password);
    req.body.password = hashedPassword;
    const user = await User.create(req.body);
    res.status(201).json({ user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error creating user" });
  }
};

export const getMe = async (req, res) => {
  const user = await User.findOne({ email: req.user.email });
  res.status(200).json({ user: user });
};
