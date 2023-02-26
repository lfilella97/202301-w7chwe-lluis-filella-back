import "./loadEnvironment.js";
import connectDatabase from "./database/connectDatabase.js";
import startServer from "./server/startServer.js";
import debug from "debug";

const createDebug = debug("lovefriends:root");

const port = process.env.PORT ?? 4000;
const databaseUrl: string = process.env.DATABASE_URL!;

try {
  await connectDatabase(databaseUrl);

  startServer(+port);
} catch (error) {
  const errorMessage = (error as Error).message;

  createDebug(
    errorMessage ? `${errorMessage}` : `Can't connect server or database`
  );
}
