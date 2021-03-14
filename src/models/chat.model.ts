import { DocumentType, getModelForClass, ModelOptions, Prop, Severity } from "@typegoose/typegoose";

@ModelOptions({ options: { customName: "chat-site-chats", allowMixed: Severity.ALLOW } })
export class Chat {
	@Prop({ type: () => [String], unique: true })
	users: string[];

	@Prop()
	chatID: string;
}

export const ChatModel = getModelForClass(Chat);
export type ChatDocument = DocumentType<Chat>;
