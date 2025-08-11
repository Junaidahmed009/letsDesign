import userSchema from "./../Models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  // Email regex validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }
  try {
    const userexists = await userSchema.findOne({ email });
    if (userexists) {
      return res.status(400).json({ message: "User Already exists" });
    }
    const hasedPassword = await bcrypt.hash(password, 10);
    const user = await userSchema.create({
      name,
      email,
      password: hasedPassword,
    });
    // i dont want cookie or jwt bcz i move user to login after that.
    // const jwttoken = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
    //   expiresIn: "7d",
    // });
    // res.cookie("jwt", jwttoken, {
    //   httpOnly: true,
    //   secure: true,
    //   sameSite: "strict",
    //   maxAge: 7 * 24 * 60 * 60 * 1000,
    // });
    res.status(201).json({
      message: "User Registered Susess",
      user: { _id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(401).json({ message: "Creadentials missing" });
  }
  try {
    const user = await userSchema.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }
    const jwttoken = jwt.sign(
      { id: user._id, email: user.email },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );
    res.cookie("token", jwttoken, {
      httpOnly: true, // prevent JS access
      secure: process.env.NODE_ENV === "production", // only on https in production
      sameSite: "strict", // protect against CSRF
      maxAge: 1 * 60 * 60 * 1000, // 1 hour
    });
    res.json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// GET user profile after authentication
export const getUserProfile = async (req, res) => {
  // console.log(req.user);
  try {
    // req.user is already set by middleware
    const user = await userSchema.findById(req.user.id); // exclude password

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  res.json({ message: "Logged out successfully" });
};
