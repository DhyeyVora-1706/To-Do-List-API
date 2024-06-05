"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = exports.userId = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function validateToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
    }
    try {
        const secret = "5b0b34f435224084f946e53f09a84a6c";
        if (!secret) {
            throw new Error('Missing JWT secret in environment variables');
        }
        const payload = jsonwebtoken_1.default.verify(token, secret);
        exports.userId = payload.userId;
    }
    catch (err) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
    }
    next();
}
exports.validateToken = validateToken;
