import { Router } from "express";
import { login } from "../controllers/auth.controllers";

const router: Router = Router();

// routes

router.post("/login", login);

export default router;
