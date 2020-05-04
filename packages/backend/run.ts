import { setup } from "./src/main";

const mongoUri = process.env.NODE_ENV === "production" ? "tbd" : "mongodb://localhost:27017/app";
setup(mongoUri);
