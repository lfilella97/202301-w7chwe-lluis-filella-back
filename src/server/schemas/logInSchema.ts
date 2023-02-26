import { Joi } from "express-validation";

const logInSchema = {
  body: Joi.object({
    userName: Joi.string().min(3).max(14).required(),
    password: Joi.string().min(8).max(17).required(),
  }),
};

export default logInSchema;
