import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// user registration
// Public
export const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  // ensures all fields
  if (!firstName || !lastName || !email || !password) {
    res.status(400);
    throw new Error("please add all fields");
  }

  // check user
  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400);
    throw new Error("User already exist");
  }

  // hash password
  const salt = await bcrypt.genSalt(10);
  const hasshedPassword = await bcrypt.hash(password, salt);

  // create user
  const user = await User.create({
    firstName,
    lastName,
    email,
    password: hasshedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token: generateToken(user._id), // genrates JWT token
      registered: true,
    });
  } else {
    res.status(406);
    throw new Error("invalid user data");
  }
});

// user login
// Public
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(202).json({
      _id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token: generateToken(user._id),
      logedIn: true,
    });
  } else {
    res.status(401);
    throw new Error("invalid credentials");
  }
});

// get user info
// PRIVATE
export const getUser = asyncHandler(async (req, res) => {
  const { _id, firstName, lastName, email } = await User.findById(req.user.id);

  res.status(200).json({
    id: _id,
    firstName,
    lastName,
    email,
  });
});
