import { UserDTO } from "@dto/User";
import { User } from "@models/User";

export function user2userDTO(user: User): UserDTO {
  return {
    username: user.username,
    type: user.type,
  };
}
