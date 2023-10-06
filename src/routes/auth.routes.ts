import { Router } from "express";
import { login, logout, register } from "../controllers/auth.controllers";

const router: Router = Router();

// routes

router.post("/login", login);
router.post("/register",register)

router.post("/logout",logout)
export default router;
