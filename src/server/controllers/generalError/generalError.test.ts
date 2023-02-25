import { type Response, type Request, type NextFunction } from "express";
import CustomError from "../../../CustomError/CustomError";
import generalError from "./generalError";

const request: Partial<Request> = {};
const response: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};
const next: NextFunction = jest.fn();

describe("Given the controller generalError", () => {
  describe("When it receives an error", () => {
    test("Then it should emit a response with the error", async () => {
      const error: CustomError = new CustomError(
        "Path not not found",
        404,
        "Endpoint not found"
      );

      const errorStatus = 404;
      generalError(error, request as Request, response as Response, next);

      expect(response.status).toBeCalledWith(errorStatus);
    });
  });
});
