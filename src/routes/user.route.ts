import { Router } from "express";
import passport from "passport";
import { deleteUser } from "../controllers/user.controller";

const router = Router();

router.delete("/delete", passport.authenticate("local"), deleteUser);

export { router as UserRouter };
