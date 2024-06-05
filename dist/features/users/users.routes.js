"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const users_controller_1 = require("./users.controller");
exports.userRouter = express_1.default.Router();
const userController = new users_controller_1.UserController();
exports.userRouter.post("/signUp", (req, res, next) => {
    userController.signUp(req, res, next);
});
exports.userRouter.post("/logIn", (req, res, next) => {
    userController.logIn(req, res, next);
});
