import { NextFunction, Request, Response } from "express";
import { UserDocument } from "../models/user.model";
import { ChatService } from "../services/chat.service";

export const createChat = async (req: Request, res: Response, next: NextFunction) => {
	if (!req.params.userID) return res.status(404).json({ error: { message: "UserID was not passed" } });
	const createChatResponse = await ChatService.create(req.params.userID, req.user as UserDocument);

	if (createChatResponse.error) return res.status(500).json({ error: { message: createChatResponse.error } });

	res.status(201).json({ user: createChatResponse.user });
};

export const deleteChat = async (req: Request, res: Response, next: NextFunction) => {};
