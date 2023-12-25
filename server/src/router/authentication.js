import express from "express";
import { createUser, userExists } from "../db/users.js";
import bcrypt from "bcrypt";
import passport from "passport";

const router = express.Router();

router.post("/login", async (req, res, next) => {
  passport.authenticate("local", (e, user, info) => {
    if (e) {
      return res.status(500).json({ msg: e });
    }
    if (!user) {
      return res.status(401).json({ msg: info.msg });
    }
    req.logIn(user, (e) => {
      if (e) {
        return res.status(500).json({ msg: e });
      }
      return res
        .status(200)
        .json({ msg: "Login successful", isAdmin: user.isAdmin, user });
    });
  })(req, res, next);
});

router.get("/profile", (req, res) => {
  if (req.isAuthenticated()) {
    const user = req.user;
  } else {
    res.status(401).json({ msg: "Not authenticated" });
  }
});

router.get("/logout", (req, res) => {
  req.logout((e) => {
    if (e) {
      return res.status(500).json({ msg: "Logout error" });
    }
    return res.status(200).json({ msg: "Logged Out" });
  });
});

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const regex_password =
      /^(?=.*[\d]{1,})(?=.*[a-z]{1,})(?=.*[A-Z]{1,})(?=.*[<>(){}\"|;':.,~!?@#$%^=&*\\\[\]]{1,})[a-z\dA-Z<>(){}\"|;':.,~!?@#$%^=&*\\\[\]]{10,}$/;
    const regex_email = /^[a-zA-Z\d\.\-_]+@[a-zA-Z\d-]+\.[a-zA-Z\d]{2,8}$/;

    if (!regex_email.test(email)) {
      return res.status(401).send({ msg: "email: wrong format" });
    }
    if (!regex_password.test(password)) {
      return res.status(401).send({ msg: "password: wrong format" });
    }

    if (await userExists(username, email)) {
      return res.status(401).send({ msg: "username or email already exists" });
    }

    const password_hashed = await bcrypt.hash(password, 10);

    await createUser({
      username,
      email,
      password: password_hashed,
      cart: [],
      isAdmin: false,
    });

    res.status(200).send({ msg: "REGISTERED SUCCESSFULLY" });
  } catch (e) {
    console.log(e.message);
  }
});

export default router;
