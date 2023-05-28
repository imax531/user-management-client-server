import { User } from "@models/User";

export interface IUserProvider {
  init(): Promise<void>;

  addUser(user: User): Promise<void>;

  deleteUser(username: string): Promise<void>;

  getUsers(): Promise<User[]>;
  getUser(username: string): Promise<User | null>;

  updateUser(username: string, user: Partial<User>): Promise<void>;
}
