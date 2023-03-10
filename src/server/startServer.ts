import debug from "debug";
import app from "./app.js";

const createDebug = debug("lovefriends:server");

const startServer = (port: number) => {
  app.listen(port);

  createDebug(`Server started at http://localhost:${port}`);
};

export default startServer;
