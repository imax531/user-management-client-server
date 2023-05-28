import express from "express";
import { LoginService } from "@services/login";
import { asyncWrapper } from "../utils/request-wrapper";

function loginRouter(LoginService: LoginService) {
  const router = express();

  router.use(express.json())

  router.post("/", asyncWrapper(async (req, res) => {
    const { username, password } = req.body;
    const token = await LoginService.login(username, password);
    if (token !== null) {
      res.cookie('jwt', token);
      res.send(token);
    } else {
      res.status(400).send('Bad Credentials');
    }
  }));

  router.post("/verify", asyncWrapper(async (req, res) => {
    const {token} = req.body;
    if (LoginService.validateToken(token) !== null) {
      res.status(200).end();
    } else {
      res.status(400).end();
    }
  }));

  return router;
}
export { loginRouter };
