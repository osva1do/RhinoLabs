import { Router } from "express";
import { loginC, Authenticated } from "../login/controller/login.js";

const router = Router();

router.get("/authenticated", Authenticated, (req, res) => {
  res.status(200).json({ logged: true });
});

router.post("/login", loginC);

export default router;
