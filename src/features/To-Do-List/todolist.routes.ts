import express, { NextFunction, Response, Request } from 'express';
import { ToDoListController } from './todolist.controller';
import { validateToken } from '../../middlewares/jwt.middleware';

export const todolistRouter = express.Router();
const todolistController = new ToDoListController();

todolistRouter.post("/addTask", (req: Request, res: Response, next: NextFunction) => {
    todolistController.addTask(req, res, next);
})

todolistRouter.put("/updateTask/:taskId", (req: Request, res: Response, next: NextFunction) => {
    todolistController.updateTask(req, res, next);
})

todolistRouter.delete("/deleteTask/:taskId", (req: Request, res: Response, next: NextFunction) => {
    todolistController.deleteTask(req, res, next);
})

todolistRouter.get("/getTask/:taskId", (req: Request, res: Response, next: NextFunction) => {
    todolistController.getTask(req, res, next);
})