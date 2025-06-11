import "reflect-metadata";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import bodyParser from "body-parser";
import { v1Router } from "./api/v1";
const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));
app.use(bodyParser.urlencoded({ limit: "350mb", extended: true }))
app.use(cors({ origin: "*" }))
app.use(compression())
app.use(helmet())

app.use("/api/v1", v1Router)

export { app };
