import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwtIssuer from "../utils/jwtIssuer.js";

const router = express.Router();

router.get("/checkUsername", async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (user === null) {
    return res.status(200).json({ message: "Username available", user: user });
  }
  if (user !== null) {
    return res
      .status(409)
      .json({ message: "Username already in use", user: user });
  }
});

router.post("/register", async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  console.log(hashedPassword);
  const checkUser = await User.findOne({ username: req.body.username });
  const checkEmail = await User.findOne({ username: req.body.email });

  if (checkUser !== null)
    return res
      .status(409)
      .json({ message: "username already in use", user: checkUser });
  if (checkEmail !== null)
    return res
      .status(409)
      .json({ message: "email already in use", email: checkEmail });

  const { username, firstname, lastname, email } = req.body;

  try {
    const userToAdd = await User.create({
      username: username,
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: hashedPassword,
    });
    return res
      .status(200)
      .json({ message: "user registered successfully", created: userToAdd });
  } catch (error) {
    return res.status(400).json({ message: "Error happened", error: error });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!password) {
      return res.status(400).json({ message: "please supply password" });
    }

    const user = await User.findOne({ email: email });

    if (user === null) {
      return res
        .status(400)
        .json({ message: "No user with that email address" });
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (checkPassword) {
      console.log("authentication successful");
      const token = await jwtIssuer.generateToken(user);
      return res
        .status(200)
        .json({ message: "Authentication successful", token: token });
    } else {
      return res.status(401).json({ message: "Authentication failed" });
    }
  } catch (error) {
    return res.status(401).json({ message: "Authentication error" });
  }
});

export default router;
