export enum UserType {
    ADMIN = 0, 
    USER = 1
}

export interface User {
    username: string;
    password: string;
    type: UserType;
}