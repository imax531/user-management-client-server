import { UserDTO } from "@dto/User";
import { UsernameTakenException } from "../exceptions/UsernameTaken";
import { User, UserType } from "../models/User";
import { IUserProvider } from "../providers/IUserProvider";
import { user2userDTO } from "../parsers/user";

export class UserService {
  constructor(private userProvider: IUserProvider) {}

  public async addUser(user: User): Promise<void> {
    const existingUser = await this.userProvider.getUser(user.username);
    if (existingUser !== null) {
      throw new UsernameTakenException(user.username);
    }
    await this.userProvider.addUser(user);
  }

  public async deleteUser(username: string): Promise<void> {
    await this.userProvider.deleteUser(username);
  }

  public async setUserType(username: string, type: UserType): Promise<void> {
    await this.userProvider.updateUser(username, { type });
  }

  public async setPassword(username: string, password: string): Promise<void> {
    await this.userProvider.updateUser(username, { password });
  }

  public async getUsers(): Promise<User[]> {
    return await this.userProvider.getUsers();
  }

  public async getUsersDto(): Promise<UserDTO[]> {
    const users = await this.userProvider.getUsers();
    return users.map(user2userDTO);
  }

  public async getUser(username: string): Promise<User | null> {
    return await this.userProvider.getUser(username);
  }
}
