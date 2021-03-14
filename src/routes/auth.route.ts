import { Router } from "express";
import passport from "passport";
import { register } from "../controllers/auth.controller";
import { loginValidator } from "../helpers/validators/login.validator";
import { registerValidator } from "../helpers/validators/register.validator";

const router = Router();

router.post("/login", loginValidator, passport.authenticate("local"), (req, res) => {
	res.status(200).json({ user: req.user });
});

router.post("/register", registerValidator, register, passport.authenticate("local"), (req, res) => {
	res.status(200).json({ user: req.user });
});

export { router as AuthRouter };
