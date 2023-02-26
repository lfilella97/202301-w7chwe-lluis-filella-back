import { Router } from "express";
import { validate } from "express-validation";
import loginUser from "../../controllers/userControllers/loginUser/loginUser.js";
import logInSchema from "../../schemas/logInSchema.js";

const userRouter = Router();

userRouter.post(
  "/login",
  validate(logInSchema, {}, { abortEarly: false }),
  loginUser
);

export default userRouter;
