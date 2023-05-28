import * as mongoDB from "mongodb";
import { User } from "@models/User";
import { IUserProvider } from "./IUserProvider";

export class UserProvider implements IUserProvider {
  constructor(private mongoConnectionString: string) {}

  private collection!: mongoDB.Collection;

  public async init() {
    const client: mongoDB.MongoClient = new mongoDB.MongoClient(
      this.mongoConnectionString
    );

    await client.connect();

    const db: mongoDB.Db = client.db("myDB");

    this.collection = db.collection("users");
  }

  public async addUser(user: User) {
    this.collection.insertOne(user);
  }

  public async deleteUser(username: string) {
    this.collection.findOneAndDelete({ username });
  }

  public async getUsers() {
    const users = await this.collection.find<User>({}).toArray();
    return users;
  }

  public async getUser(username: string) {
    const user = await this.collection.findOne<User>({ username });
    return user;
  }

  public async updateUser(username: string, details: Partial<User>) {
    await this.collection.findOneAndUpdate({ username }, { $set: details });
  }
}
