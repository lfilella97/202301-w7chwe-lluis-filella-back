import { type NextFunction, type Request, type Response } from "express";
import CustomError from "../../../CustomError/CustomError";
import notFoundError from "./notFoundError";

const request: Partial<Request> = {};
const response: Partial<Response> = {};
const next: NextFunction = jest.fn();

const expectedError = new CustomError(
  "Path not not found",
  404,
  "Endpoint not found"
);

describe("Given the middleware notFoundError", () => {
  describe("When it receives an empty request", () => {
    test("Then it should call the next function with custom error Path not found", () => {
      notFoundError(request as Request, response as Response, next);

      expect(next).toBeCalledWith(expectedError);
    });
  });
});
