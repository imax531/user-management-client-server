export class AppException extends Error {
    constructor(public code: number, public message: string) {
        super(message);
    }
}