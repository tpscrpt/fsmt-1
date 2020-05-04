import { AssertionError } from "assert";
import { Request, Response, NextFunction } from "express";

export function $(fn: (req: Request, res: Response, next?: NextFunction) => Promise<void>) {
  return function (req: Request, res: Response, next: NextFunction): void {
    fn(req, res, next).catch(next);
  };
}

export function invalidProperty(property: string): string {
  return `Invalid property provided: ${property}`;
}

export function handleAssertionError(err: Error, _: Request, res: Response, next: NextFunction): void {
  if (err instanceof AssertionError) {
    res.status(400).json({
      error: err.message,
    });
  } else {
    next(err);
  }
}
