import { compare } from "bcrypt";
import { User, UserDocument, UserModel } from "../models/user.model";

export class UserService {
	static async delete(user: UserDocument, data: Partial<User>): Promise<boolean> {
    try {
      if (user.email !== data.email) return false;
      if (!(await compare(data.password, user.password))) return false;
      
			await user.deleteOne();

			const hasFoundUser = await UserModel.findOne({ userID: user.userID });
			if (hasFoundUser) return false;

			return true;
		} catch (err) {
			return err;
		}
	}
}
