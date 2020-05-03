import { Router } from "express";

export class Route {
  public name: string;
  public router: Router;

  constructor(name: string, router: Router) {
    this.name = name;
    this.router = router;
  }
}
