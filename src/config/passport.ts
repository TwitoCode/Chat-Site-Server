import { compare } from "bcrypt";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { UserModel } from "../models/user.model";

export function initPassport() {
	try {
		passport.use(
			new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
				try {
					const user = await UserModel.findOne({ email });
					console.log("this ran")
					if (!user) return done("User not found");
					console.log("this ran")

					const isPasswordValid = await compare(password, user.password);
					if (!isPasswordValid) return done("Password is invalid");

					return done(null, user);
				} catch (err) {
					return done(err);
				}
			})
		);

		passport.serializeUser((user: any, done) => done(null, user.userID));
		
		passport.deserializeUser(async (userID: string, done) => {
			const user = await UserModel.findOne({ userID });
			if (!user) return done("User not found");

			return done(null, user);
		});
	} catch (err) {
		console.log(err.message);
	}
}
