import express from "express";
import cors from "cors";

const app = express();
const PORT = 9000;

app.use(cors());

app.get("/", (_, res) => {
  res.send("Hello, world.");
});

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
