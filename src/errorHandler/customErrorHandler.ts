export class customErrorHandler extends Error {
    constructor(message: any, code: number) {
        super(message);
        this.code = code;
    }
    code: any
}