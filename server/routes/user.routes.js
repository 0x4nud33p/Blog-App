import { Router } from "express";
import {
  login,
  registerUser,
  getUserData,
} from "../controllers/user.controller.js";

const router = Router();

router.post("/auth/signup", registerUser);
router.post("/auth/login", login); 
router.get("/user", getUserData);

export default router;