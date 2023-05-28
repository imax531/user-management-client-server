import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";
import { UserDTO } from "@dto/User";
import { UserService } from "./user";
import { User } from "@models/User";

export class LoginService {
  constructor(private userService: UserService) {}

  public async login(
    username: string,
    password: string
  ): Promise<string | null> {
    const user = await this.validateCredentials(username, password);
    if (user != null) {
      return this.generateToken(user.username, user.type);
    }
    return null;
  }

  public async validateCredentials(
    username: string,
    password: string
  ): Promise<User | null> {
    const user = await this.userService.getUser(username);
    if (user?.password === password) {
      return user;
    }
    return null;
  }

  public generateToken(username: string, type: number): string {
    return jwt.sign({ username, type }, JWT_SECRET);
  }

  public validateToken(token: string): UserDTO {
    return jwt.verify(token, JWT_SECRET) as UserDTO;
  }
}
