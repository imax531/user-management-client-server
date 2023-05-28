export enum UserType {
  ADMIN = 0,
  USER = 1,
}

export interface UserDTO {
  username: string;
  type: UserType;
}
