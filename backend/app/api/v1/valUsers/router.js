import express from "express";
import { login, logout, showLoginPage } from "./controller.js";
const router = express.Router();

router.get("/login", showLoginPage);
router.post("/login", login);
router.delete("/logout", logout);
router.get("/dashboard", (req, res) => {
  if (!req.session.user) {
    return res.redirect("/BEM_PeTIK/login"); // Redirect ke login jika belum login
  }

  res.render("beranda_user", { user: req.session.user });
});

export default router;
