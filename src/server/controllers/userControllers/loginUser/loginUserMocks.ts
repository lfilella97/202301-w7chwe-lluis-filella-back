import { type UserCredentials } from "../../../../types";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../../../../database/models/userSchema/userSchema";

const logInUserMocks = (token: string, credentials: UserCredentials) => {
  bcrypt.compare = jest.fn().mockResolvedValue(true);

  jwt.sign = jest.fn().mockReturnValue(token);

  User.findOne = jest.fn().mockImplementationOnce(() => ({
    exec: jest.fn().mockResolvedValue({
      ...credentials,
    }),
  }));
};

export default logInUserMocks;
