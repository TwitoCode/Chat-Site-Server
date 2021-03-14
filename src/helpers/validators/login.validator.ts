import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { LoginDTO } from "../dto/login.dto";

export const LoginValidator = Joi.object<LoginDTO>({
	email: Joi.string()
		.email()
		.error(new Error("Invalid Email"))
		.required()
		.error(new Error("Email is required")),
	password: Joi.string()
		.min(6)
		.error(new Error("Password Minimum 6 characters"))
		.required()
		.error(new Error("Password is required")),
});

export const loginValidator = (req: Request, res: Response, next: NextFunction) => {
	const isValid = LoginValidator.validate(req.body);
	if (isValid.error) return res.status(500).json({ error: { message: isValid.error.message } });

	next();
};
