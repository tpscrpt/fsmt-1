import { Request } from "express";

export type BodyOnlyPostRequest<T> = Request<{}, {}, T, {}>;

export type ResponseData<T> = {
  body?: T;
  error?: string;
};
