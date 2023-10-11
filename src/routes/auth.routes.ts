import { Router } from "express";
import {
    login,
    logout,
    register,
    reportError,
} from "../controllers/auth.controllers";

import Auth from "../middlewares/auth.middleware";

const router: Router = Router();

// routes

router.post("/login", login);
router.post("/register", register);

router.post("/logout", Auth, logout);

router.post("/report", reportError);

export default router;
