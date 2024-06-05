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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToDoListController = void 0;
const todolist_repository_1 = require("./todolist.repository");
const jwt_middleware_1 = require("../../middlewares/jwt.middleware");
class ToDoListController {
    constructor() {
        this.todolistRepository = new todolist_repository_1.todolistRepository();
        this.todolistRepository = new todolist_repository_1.todolistRepository();
    }
    addTask(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.todolistRepository.addTask(req.body.task, req.body.completed, jwt_middleware_1.userId);
                return res.status(200).json({
                    success: response.success,
                    msg: "Task added successfully",
                    res: response.res
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    updateTask(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.todolistRepository.UpdateTask(req.body, req.params.taskId, jwt_middleware_1.userId);
                return res.status(200).json({
                    success: response.success,
                    msg: "Task updated successfully",
                    res: response.res
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    deleteTask(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.todolistRepository.deleteTask(req.params.taskId, jwt_middleware_1.userId);
                return { success: true, res: response };
            }
            catch (err) {
                next(err);
            }
        });
    }
    getTask(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.todolistRepository.getTask(req.params.taskId, jwt_middleware_1.userId);
                return res.status(200).json({
                    success: response.success,
                    res: response.res
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.ToDoListController = ToDoListController;
