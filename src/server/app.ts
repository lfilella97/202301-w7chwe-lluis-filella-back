import express from "express";
import cors from "cors";
import morgan from "morgan";
import getPing from "./middlewares/getPing/getPing.js";
import notFoundError from "./middlewares/notFoundError/notFoundError.js";
import generalError from "./controllers/generalError/generalError.js";

const app = express();

app.use(cors());
app.disable("x-powered-by");

app.use(morgan("dev"));
app.use(express.json());

app.use("/", getPing);

app.use(notFoundError);
app.use(generalError);

export default app;
