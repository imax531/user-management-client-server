import express from "express";
import { CLIENT_URL, IS_PROD, MONGO_CONNECTION_STRING, PORT } from "./config";
import { userRouter } from "./routes/user";
import { UserProvider } from "./providers/UserProvider";
import { UserService } from "./services/user";
import { loginRouter } from "./routes/login";
import { LoginService } from "@services/login";
import cors from "cors";
import { authenticationMiddleware } from "./middlewares/authentication";
import cookieParser from "cookie-parser";
import cookieSession from "cookie-session";

async function init() {
  const app = express();

  app.use(
    cookieSession({
      secret: "mysecret",
      secure: !IS_PROD ? false : true,
      httpOnly: !IS_PROD ? false : true,
      sameSite: !IS_PROD ? false : "none",
    })
  );

  app.use(
    cors({
      credentials: true,
      origin: CLIENT_URL,
    })
  );

  app.use(cookieParser());

  const userProvider = new UserProvider(MONGO_CONNECTION_STRING);
  await userProvider.init();

  const userService = new UserService(userProvider);
  const loginService = new LoginService(userService);

  app.use(authenticationMiddleware(loginService));

  app.use("/v1/login", loginRouter(loginService));
  app.use("/v1/users", userRouter(userService));

  app.listen(PORT, () => console.log(`listening on ${PORT}`));
}

init();
