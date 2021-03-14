import { hash } from "bcrypt";
import { generate } from "shortid";
import { UserResponse } from "../types";
import { User, UserModel } from "../models/user.model";

export class AuthService {
	static async register(data: User): Promise<UserResponse> {
		try {
			const doesUserExist = await UserModel.findOne({ email: data.email });

			if (doesUserExist) {
				return {
					user: null,
					error: {
						message: "User already Exists",
					},
				};
			}

			const password = await hash(data.password, 12);
			const { email, name } = data;
			const userID = generate();

			const user = await UserModel.create({ email, name, userID, password, chatIDs: [] });

			return {
				user,
				error: null,
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
