import express from "express";
import cors from "cors";
import { json } from "body-parser";
import { routes } from "./routes";

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

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
