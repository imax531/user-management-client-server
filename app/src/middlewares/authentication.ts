import { UserType } from "@dto/User";
import { LoginService } from "@services/login";
import express from "express";

export function authenticationMiddleware(loginService: LoginService) {
  return (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    if (req.cookies.jwt) {
      const user = loginService.validateToken(req.cookies.jwt);
      if (user !== null) {
        req.user = user;
      }
    }
    next();
  };
}

export function requireLogin() {
  return (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    if (req.user === null) {
      res.status(401).send("Invalid token. Login required.");
    } else {
      next();
    }
  };
}

export function requireAdmin() {
  return (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    if (req.user?.type !== UserType.ADMIN) {
      res.status(401).send("Admin permissions are required for this method.");
    } else {
      next();
    }
  };
}
