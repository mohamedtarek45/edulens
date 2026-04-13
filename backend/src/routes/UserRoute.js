import express from "express";
import { createUser, getMe, loginUser ,logoutUser} from "../Controllers/UserControllers.js";
import {
  validateCreateUser,
  validateLogin,
} from "../../middleware/userValidator.js";
import { authOptional, authRequired } from "../../middleware/auth.js";


const router = express.Router();
router

  .post("/login", validateLogin, loginUser)
  .get("/me", authRequired, getMe)
  .post("/logout", logoutUser)
  .post("/singup", validateCreateUser, authOptional, createUser);

export default router;
