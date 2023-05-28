import express from "express";
import { UserService } from "@services/user";
import { UserType } from "@models/User";
import { asyncWrapper } from "../utils/request-wrapper";
import { requireAdmin, requireLogin } from "../middlewares/authentication";

function userRouter(userService: UserService) {
  const router = express.Router();

  router.use(express.json());

  router.get(
    "/",
    requireLogin(),
    asyncWrapper(async (req, res) => {
      const data = await userService.getUsersDto();
      res.send(data);
    })
  );

  router.post(
    "/",
    requireAdmin(),
    asyncWrapper(async (req, res) => {
      const { username } = req.body;
      if (!username) {
        return res.status(400).send('Username required.')
      }
      await userService.addUser({ username, password: 'password', type: UserType.USER });
      res.end();
    })
  );

  router.delete(
    "/:username",
    requireAdmin(),
    asyncWrapper(async (req, res) => {
      const { username } = req.params;
      if (username === req.user?.username) {
        res.status(403).send("You cannot delete yourself.");
        return;
      }
      await userService.deleteUser(username);
      res.end();
    })
  );

  router.put(
    "/:username/type",
    requireAdmin(),
    asyncWrapper(async (req, res) => {
      const { username } = req.params;
      const { type } = req.body;
      const newType = type == 0 ? UserType.ADMIN : UserType.USER;
      await userService.setUserType(username, newType);
      res.end();
    })
  );

  router.put(
    "/:username/password",
    requireAdmin(),
    asyncWrapper(async (req, res) => {
      const { username } = req.params;
      const { password } = req.body;
      await userService.setPassword(username, password);
      res.end();
    })
  );

  return router;
}
export { userRouter };
