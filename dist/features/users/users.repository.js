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
exports.UsersRepository = void 0;
const customErrorHandler_1 = require("../../errorHandler/customErrorHandler");
const users_schema_1 = require("./users.schema");
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const UserModel = mongoose_1.default.model("user", users_schema_1.userSchema);
class UsersRepository {
    signUp(userObj) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newUser = new UserModel(userObj);
                yield newUser.save();
                return { success: true, res: newUser };
            }
            catch (err) {
                if (err instanceof customErrorHandler_1.customErrorHandler) {
                    throw new customErrorHandler_1.customErrorHandler(err.message, err.code);
                }
                throw new Error(err.message);
            }
        });
    }
    logIn(userObj) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield UserModel.findOne({ email: userObj.email });
                if (!user) {
                    throw new customErrorHandler_1.customErrorHandler("User Not Found", 404);
                }
                else {
                    const storedPassword = yield bcrypt_1.default.compare(userObj.password, user.password);
                    if (storedPassword) {
                        return { success: true, res: user };
                    }
                    else {
                        throw new customErrorHandler_1.customErrorHandler("Invalid Credentials", 400);
                    }
                }
            }
            catch (err) {
                if (err instanceof customErrorHandler_1.customErrorHandler) {
                    throw new customErrorHandler_1.customErrorHandler(err.message, err.code);
                }
                throw new Error(err.message);
            }
        });
    }
}
exports.UsersRepository = UsersRepository;
