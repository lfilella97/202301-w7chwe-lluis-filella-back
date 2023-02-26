import bcrypt from "bcryptjs";
import { type NextFunction, type Request, type Response } from "express";
import { type UserCredentials } from "../../../../types";
import CustomError from "../../../../CustomError/CustomError";
import User from "../../../../database/models/userSchema/userSchema";
import logInUserMocks from "./loginUserMocks";
import loginUser from "./loginUser";

type RequestWithLluisCredentials = Request<
  Record<string, unknown>,
  Record<string, unknown>,
  UserCredentials
>;

const lluisCredentials: UserCredentials = {
  password: "12345678",
  userName: "lluis",
};

const request: Partial<RequestWithLluisCredentials> = {
  body: lluisCredentials,
};

const response: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

const next: NextFunction = jest.fn().mockReturnThis();

beforeEach(() => jest.clearAllMocks());

describe("Given logInUser controller", () => {
  describe("When it recieves the lluis user with password `12345678`", () => {
    test("Then it should respond with status 200 and generate a token", async () => {
      const expectedStatus = 200;
      const mockedToken =
        "$2y$10$GT6K.TAnsjnLshM9KdwehOJsmDADR8y2x7tLr3C5CxUvfgh4NZUwm";
      const expectedBody = {
        token: mockedToken,
      };

      logInUserMocks(mockedToken, lluisCredentials);

      await loginUser(
        request as RequestWithLluisCredentials,
        response as Response,
        next
      );

      expect(response.status).toHaveBeenCalledWith(expectedStatus);
      expect(response.json).toHaveBeenCalledWith(expectedBody);
    });

    test("Then it should call next function with  `Incorrect user` error message", async () => {
      const customError = new CustomError(
        "Incorrect user",
        401,
        "Incorrect credentials"
      );

      User.findOne = jest.fn().mockReturnValue(false);

      await loginUser(
        request as RequestWithLluisCredentials,
        response as Response,
        next
      );

      expect(next).toBeCalledWith(customError);
    });

    test("Then it should call next function with `Incorrect password` error message", async () => {
      const customError = new CustomError(
        "Incorrect password",
        401,
        "Incorrect credentials"
      );
      const next: NextFunction = jest.fn().mockReturnThis();

      User.findOne = jest.fn().mockReturnValue(true);
      bcrypt.compare = jest.fn().mockResolvedValue(false);

      await loginUser(
        request as RequestWithLluisCredentials,
        response as Response,
        next
      );

      expect(next).toBeCalledWith(customError);
    });
  });
});
