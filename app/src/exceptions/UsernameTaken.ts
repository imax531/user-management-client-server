import { AppException } from "./base";

export class UsernameTakenException extends AppException {
    constructor(username: string) {
        super(400, `Username ${username} is taken.`)
    }
}
