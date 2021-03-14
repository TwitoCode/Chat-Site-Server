import { Router } from "express";
import passport from "passport";
import { createChat, deleteChat } from "./../controllers/chat.controller";

const router = Router();

router.post("/create/:userID", passport.authenticate("local"), createChat);
router.delete("delete/:chatID", passport.authenticate("local"), deleteChat);

export { router as ChatRouter };
