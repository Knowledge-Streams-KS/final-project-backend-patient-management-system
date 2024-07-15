import { Router } from "express";
import userAuthController from "../../UserAuth/index.js";
const userAuthRouter = Router();
userAuthRouter.post("/UserAuth/SignUp", userAuthController.SignUp);
userAuthRouter.post("/UserAuth/SignIn", userAuthController.SignIn);

export default userAuthRouter