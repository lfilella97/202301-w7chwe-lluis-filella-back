import { MongoMemoryServer } from "mongodb-memory-server";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import request from "supertest";
import bcryptjs from "bcryptjs";
import { type UserCredentials } from "../../../types";
import connectDatabase from "../../../database/connectDatabase";
import app from "./../../app";
import User from "../../../database/models/userSchema/userSchema";
import { validate } from "express-validation";

let server: MongoMemoryServer;

const newUserLogIn: UserCredentials = {
  userName: "lluis",
  password: "frtghy3j",
};

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  await connectDatabase(server.getUri());
});

afterAll(async () => {
  await server.stop();
  await mongoose.connection.close();
});

afterEach(async () => {
  await User.deleteMany();
});

describe("Given a POST user/login ", () => {
  beforeAll(async () => {
    const saltLength = 10;
    const hashedPassword = await bcryptjs.hash(
      newUserLogIn.password,
      saltLength
    );
    const user = { ...newUserLogIn, password: hashedPassword };

    await User.create(user);
  });

  describe("When it receives a request with name lluis and password 12345678", () => {
    describe("And the userName and the password are the same in the database", () => {
      test("Then it should return token", async () => {
        const mockUser: UserCredentials = newUserLogIn;
        const status = 200;
        const expectedToken = "jankjfnioasdnmfgijondjfnfgjndf";

        jwt.sign = jest.fn().mockReturnValue(expectedToken);

        const response = await request(app)
          .post("/user/login")
          .send(mockUser)
          .expect(status);

        expect(response.body).toHaveProperty("token", expectedToken);
      });
    });
  });
});
