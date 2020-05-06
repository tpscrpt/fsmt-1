import { Server } from "http";
import express from "express";
import cors from "cors";
import { json } from "body-parser";
import mongoose from "mongoose";
import { routes } from "./routes";
import { handleAssertionError } from "./errors";

const app = express();
const PORT = 9000;

app.use(cors());
app.use(json());

app.get("/", (_, res) => {
  res.send("Hello, world.");
});

routes.forEach((route) => {
  app.use(`/${route.name}`, route.router);
});

app.use(handleAssertionError);

export async function setup(mongoUri: string): Promise<Server> {
  await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
  return app.listen(PORT, () => {
    if (process.env.NODE_ENV !== "test") console.log(`Listening on port: ${PORT}`);
  });
}
