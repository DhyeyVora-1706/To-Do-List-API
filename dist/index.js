"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const express_1 = __importDefault(require("express"));
const db_1 = require("./config/db");
const users_routes_1 = require("./features/users/users.routes");
const customErrorHandler_1 = require("./errorHandler/customErrorHandler");
const todolist_routes_1 = require("./features/To-Do-List/todolist.routes");
const jwt_middleware_1 = require("./middlewares/jwt.middleware");
const swagger_json_1 = __importDefault(require("../swagger.json"));
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
exports.app.use("/api/users", users_routes_1.userRouter);
exports.app.use("/api/tasks", jwt_middleware_1.validateToken, todolist_routes_1.todolistRouter);
exports.app.use("/api/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));
exports.app.use((err, req, res, next) => {
    if (err instanceof customErrorHandler_1.customErrorHandler) {
        return res.status(err.code).json({ error: err.message });
    }
    console.log(err);
    res.status(500).send('Something Went Wrong , Please try Later');
});
exports.app.listen(4500, () => {
    console.log('Server is running on port 4500');
    (0, db_1.connectToMongoDB)();
});
