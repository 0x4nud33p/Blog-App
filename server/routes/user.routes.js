import { Router } from "express";
import {
  login,
  registerUser,
} from "../controllers/user.controller.js";

const router = Router();

router.post("/auth/signup", registerUser);
router.post("/auth/login", login);

export default router;
