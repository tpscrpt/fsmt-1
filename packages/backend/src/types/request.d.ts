import { Request } from "express";

export type BodyOnlyPostRequest<T> = Request<{}, {}, T, {}>;
