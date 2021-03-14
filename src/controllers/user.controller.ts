import { NextFunction, Request, Response } from "express";
import { UserDocument } from "../models/user.model";
import { UserService } from "../services/user.service";

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
	if (req.session) {
		const isUserDeleted = await UserService.delete(req.user as UserDocument, req.body);

		if (!isUserDeleted) {
			return res.status(500).json({ error: { message: "Could not delete User" } });
		}

		req.logout();
		req.session.destroy(() => console.log("Destroyed Session"));

		return res.status(200).json({ deleted: true });
	}

	res.status(400).json({ error: { message: "Session not found" } });
};
