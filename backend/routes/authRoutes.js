import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "secret123";

// Signup route
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      role: "user", // default role
    });

    const token = jwt.sign({ id: newUser._id, role: "user" }, JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(201).json({ token, isAdmin: false, user: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Signup failed" });
  }
});

// Login route
// Login route
router.post("/login", async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // 1️⃣ Hardcoded Admin check
    if (
      email.toLowerCase() === "starayza@gmail.com" &&
      password === "Starayza@123" &&
      role === "Admin"
    ) {
      const token = jwt.sign({ email, role: "admin" }, JWT_SECRET, { expiresIn: "7d" });
      return res.json({
        token,
        isAdmin: true,
        user: { email, role: "admin" },
      });
    }

    // 2️⃣ Regular user login (ignore role sent from frontend)
    const user = await User.findOne({ email: email.toLowerCase() }); // make sure email is lowercased
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    // 3️⃣ Return JWT
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: "7d" });

    res.json({ token, isAdmin: user.role === "admin", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Login failed" });
  }
});


export default router;
