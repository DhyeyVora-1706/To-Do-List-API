"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.todolistRouter = void 0;
const express_1 = __importDefault(require("express"));
const todolist_controller_1 = require("./todolist.controller");
exports.todolistRouter = express_1.default.Router();
const todolistController = new todolist_controller_1.ToDoListController();
exports.todolistRouter.post("/addTask", (req, res, next) => {
    todolistController.addTask(req, res, next);
});
exports.todolistRouter.put("/updateTask/:taskId", (req, res, next) => {
    todolistController.updateTask(req, res, next);
});
exports.todolistRouter.delete("/deleteTask/:taskId", (req, res, next) => {
    todolistController.deleteTask(req, res, next);
});
exports.todolistRouter.get("/getTask/:taskId", (req, res, next) => {
    todolistController.getTask(req, res, next);
});
