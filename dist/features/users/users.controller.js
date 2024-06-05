"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const users_repository_1 = require("./users.repository");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class UserController {
    constructor() {
        this.userRepository = new users_repository_1.UsersRepository();
    }
    signUp(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, password } = req.body;
                const hashedPassword = yield bcrypt_1.default.hash(password, 12);
                const response = yield this.userRepository.signUp({ name, email, password: hashedPassword });
                return res.status(201).json({
                    success: response.success,
                    msg: "User Registered Successfully",
                    res: response.res
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    logIn(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const validcredentials = yield this.userRepository.logIn({ email, password });
                if (validcredentials.success) {
                    const token = jsonwebtoken_1.default.sign({
                        userId: validcredentials.res._id
                    }, "5b0b34f435224084f946e53f09a84a6c", {
                        expiresIn: "1h"
                    });
                    return res.status(200).json({
                        success: true,
                        message: "Login Successful",
                        token
                    });
                }
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.UserController = UserController;
