import "./loadEnvironment.js";
import connectDatabase from "./database/connectDatabase.js";
import startServer from "./server/startServer.js";

const port = process.env.PORT ?? 4000;
const databaseUrl: string = process.env.DATABASE_URL!;

await connectDatabase(databaseUrl);
startServer(+port);
