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
exports.todolistRepository = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const customErrorHandler_1 = require("../../errorHandler/customErrorHandler");
const todolist_schema_1 = require("./todolist.schema");
const TodoListModel = mongoose_1.default.model("task", todolist_schema_1.todolistSchema);
class todolistRepository {
    addTask(task, completed, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newTask = new TodoListModel({ task, completed, userId });
                yield newTask.save();
                return { success: true, res: newTask };
            }
            catch (err) {
                if (err instanceof customErrorHandler_1.customErrorHandler) {
                    throw new customErrorHandler_1.customErrorHandler(err.message, err.code);
                }
                throw new Error(err.message);
            }
        });
    }
    UpdateTask(updatedTaskObj, taskId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const validTask = yield this.getTaskFromTaskId(taskId);
                if (!validTask) {
                    throw new customErrorHandler_1.customErrorHandler("TaskId is Invalid", 400);
                }
                if (validTask.userId.toString() !== userId) {
                    throw new customErrorHandler_1.customErrorHandler("You can only update Task which you have created", 404);
                }
                const updatedTask = yield TodoListModel.findByIdAndUpdate(taskId, updatedTaskObj, { new: true });
                return { success: true, res: updatedTask };
            }
            catch (err) {
                if (err instanceof customErrorHandler_1.customErrorHandler) {
                    throw new customErrorHandler_1.customErrorHandler(err.message, err.code);
                }
                throw new Error(err.message);
            }
        });
    }
    deleteTask(taskId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const validTaskId = yield this.getTaskFromTaskId(taskId);
                if (!validTaskId) {
                    throw new customErrorHandler_1.customErrorHandler("TaskId is Invalid", 404);
                }
                if (validTaskId.userId.toString() !== userId) {
                    throw new customErrorHandler_1.customErrorHandler("You can not delete a task which you have not created", 400);
                }
                const deletedTask = yield TodoListModel.findByIdAndDelete(taskId);
                return { success: true, res: deletedTask };
            }
            catch (err) {
                if (err instanceof customErrorHandler_1.customErrorHandler) {
                    throw new customErrorHandler_1.customErrorHandler(err.message, err.code);
                }
                throw new Error(err.message);
            }
        });
    }
    getTask(taskId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const validTask = yield this.getTaskFromTaskId(taskId);
                if (!validTask) {
                    throw new customErrorHandler_1.customErrorHandler("TaskId is invalid", 404);
                }
                if (validTask.userId.toString() !== userId) {
                    throw new customErrorHandler_1.customErrorHandler("You can't view tasks you have not created", 400);
                }
                const task = yield TodoListModel.findById(taskId);
                return { success: true, res: task };
            }
            catch (err) {
                if (err instanceof customErrorHandler_1.customErrorHandler) {
                    throw new customErrorHandler_1.customErrorHandler(err.message, err.code);
                }
                throw new Error(err.message);
            }
        });
    }
    getTaskFromTaskId(taskId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield TodoListModel.findById(taskId);
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
exports.todolistRepository = todolistRepository;
