import jwt from "jsonwebtoken";
import expressAsyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const protect = expressAsyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.token) {
    try {
      token = req.headers.token;

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (err) {
      console.log(err);
      res.status(401).json({ message: err.message });
      throw new Error("Not authorised");
    }
  }

  if (!token) {
    res.status(401).json({ message: "no token" });
    throw new Error("Not authorised, no token");
  }
});

export default protect;
