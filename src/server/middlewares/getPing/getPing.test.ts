import { type Request } from "express";
import { type Response } from "express-serve-static-core";
import getPing from "./getPing";

const request: Partial<Request> = {};
const response: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn().mockReturnValue({ ping: "pong" }),
};

describe("Given getPing middleweare", () => {
  describe("When it recieves any request", () => {
    test("Then it should emit a response with the ping", async () => {
      const status = 200;

      await getPing(request as Request, response as Response);

      expect(response.status).toBeCalledWith(status);
    });

    test("Then it shpuld emit a response with status 200", async () => {
      await getPing(request as Request, response as Response);

      expect(response.json).toBeCalledWith({ ping: "pong" });
    });
  });
});
