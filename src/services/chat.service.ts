import { generate } from "shortid";
import { UserResponse } from "../types";
import { UserDocument, UserModel } from "../models/user.model";
import { ChatDocument, ChatModel } from "../models/chat.model";

export class ChatService {
	private static async getChats(user: UserDocument): Promise<ChatDocument[]> {
		const chats = await Promise.all(
			user.chatIDs.map(async (chatID) => {
				return ChatModel.findOne({ chatID });
			})
		);

		let filteredChats: ChatDocument[] = [];

		chats.forEach((chat) => {
			chat !== null && filteredChats.push(chat);
		});

		return filteredChats;
	}

	static async create(userID: string, user: UserDocument): Promise<UserResponse> {
		try {
			const chatID = generate();

			//Check if user exists
			const otherUser = await UserModel.findOne({ userID });

			if (!otherUser) {
				return {
					user: null,
					error: {
						message: "Other user does not exist",
					},
				};
			}

			//Create a new chat and save the chatID with the 2 users
			const chat = await new ChatModel({ chatID, users: [user.userID, otherUser.userID] }).save();

			user.chatIDs.push(chat.chatID);
			otherUser.chatIDs.push(chat.chatID);

			const savedUser = await user.save();
			await otherUser.save();

			return {
				error: null,
				user: {
					...savedUser,
					chats: await ChatService.getChats(savedUser),
				},
			};
		} catch (err) {
			return {
				user: null,
				error: {
					message: err.message,
				},
			};
		}
	}
}
