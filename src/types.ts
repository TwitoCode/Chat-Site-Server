import { Chat } from "./models/chat.model";
import { User } from "./models/user.model";

export interface UserResponse {
	user: User | UserWithChats | null;
	error: Error | null;
}


export interface UserWithChats extends User {
	chats: Chat[];
}

export interface Error {
	message: string;
}
