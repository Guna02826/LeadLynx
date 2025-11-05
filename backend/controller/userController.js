import { User } from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "User already exists" });

    const user = new User({ name, email, password });
    await user.save();

    res.json({ message: "User registered successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "User cannot be created", error: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!req.body.email || !req.body.password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });

    if (!user.isMatch(password))
      return res.status(400).json({ message: "Invalid email or password" });

    const generatedToken = generateToken(user.id, user.email);

    res
      .status(200)
      .json({
        message: "Logged in Successfully",
        token: generatedToken,
        user: user.name,
      });
    ``;
  } catch (error) {
    res.status(500).json("User cannot be logged in", error.message);
  }
};
