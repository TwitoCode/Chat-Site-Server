import { NextFunction, Request, Response } from "express";
import { AuthService } from "../services/auth.service";

export const register = async (req: Request, res: Response, next: NextFunction) => {
	const registerOutput = await AuthService.register(req.body);
	if (registerOutput.error) return res.status(401).json({ error: registerOutput.error });

	req.user = registerOutput.user!;
	next();
};
