import { Server } from "http";
import express from "express";
import cors from "cors";
import { json } from "body-parser";
import mongoose from "mongoose";
import { routes } from "./routes";
import { handleAssertionError } from "./errors";
import { TEST_PORT, DEV_PORT, PROD_PORT } from "./constants";

const app = express();

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
  const PORT =
    process.env.NODE_ENV === "production"
      ? PROD_PORT
      : process.env.NODE_ENV === "development"
      ? DEV_PORT
      : process.env.NODE_ENV === "test"
      ? TEST_PORT
      : 9000;
  return app.listen(PORT, () => {
    if (process.env.NODE_ENV !== "test") console.log(`Listening on port: ${PORT}`);
  });
}
