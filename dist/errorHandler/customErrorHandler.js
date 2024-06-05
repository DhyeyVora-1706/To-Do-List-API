"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customErrorHandler = void 0;
class customErrorHandler extends Error {
    constructor(message, code) {
        super(message);
        this.code = code;
    }
}
exports.customErrorHandler = customErrorHandler;
