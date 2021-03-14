import { DocumentType, getModelForClass, ModelOptions, Prop, Severity } from "@typegoose/typegoose";

@ModelOptions({ options: { customName: "chat-site-sessions" } })
export class Session {
	@Prop()
	_id: string;
}

export const SessionModel = getModelForClass(Session);
export type SessionDocument = DocumentType<Session>;
