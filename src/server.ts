import connectMongo from "connect-mongodb-session";
import cookieParser from "cookie-parser";
import "dotenv/config";
import express from "express";
import session from "express-session";
import mongoose from "mongoose";
import passport from "passport";
import { initPassport } from "./config/passport";
import { AuthRouter } from "./modules/auth/auth.controller";
import { ChatRouter } from "./controllers/chat.controller";
import { UserRouter } from "./modules/user/user.controller";

export const app = express();

const port = process.env.PORT || 5000;

const main = async () => {
	try {
		mongoose.set("useCreateIndex", true);
		await mongoose.connect(process.env.DB_URL!, { useUnifiedTopology: true, useNewUrlParser: true });

		mongoose.connection.on("error", (err) => {
			throw new Error(err.message);
		});

		mongoose.connection.on("open", () => console.log("Connected to DB"))
		const MongoStore = connectMongo(session);

		app.use(cookieParser());
		app.use(express.json());
		app.use(express.urlencoded({ extended: false }));

		const timeTillExpire = 1000 * 60 * 60 * 24;

		app.use(
			session({
				secret: process.env.SESSION_SECRET!,
				saveUninitialized: false,
				resave: false,
				cookie: {
					maxAge: timeTillExpire,
				},
				store: new MongoStore({
					collection: "chat-site-sessions",
					uri: process.env.DB_URL!,
					expires: timeTillExpire,
				}),
			})
		);

		app.use(passport.initialize());
		app.use(passport.session());

		initPassport();

		app.use("/auth", AuthRouter);
		app.use("/user", UserRouter);
		app.use("/chat", ChatRouter);

		app.get("/", (_, res) => res.send("Chat-Site Server"));
		app.listen(port, () => console.log(`Listening on Port ${port}`));
	} catch (err) {
		console.log(err);
	}
};

main();
