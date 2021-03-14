import { DocumentType, getModelForClass, ModelOptions, Prop, Severity } from "@typegoose/typegoose";

@ModelOptions({ options: { customName: "chat-site-users"} })
export class User {
	@Prop({ unique: false })
	email: string;

	@Prop({ minlength: 1 })
	name: string;

	@Prop({ unique: false })
	userID: string;

	@Prop({ type: () => [String] })
	chatIDs: string[];

	@Prop()
	password: string;
}

export const UserModel = getModelForClass(User);
export type UserDocument = DocumentType<User>;
