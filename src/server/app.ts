import express from "express";
import cors from "cors";

const app = express();
app.disable("x-powered-by");

app.use(cors());
app.disable("x-powered-by");

export default app;
