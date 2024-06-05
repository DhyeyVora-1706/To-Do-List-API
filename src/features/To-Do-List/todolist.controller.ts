import { NextFunction, Response, Request } from 'express';
import { todolistRepository } from './todolist.repository';
import { userId } from '../../middlewares/jwt.middleware';

export class ToDoListController {
    todolistRepository = new todolistRepository();

    constructor() {
        this.todolistRepository = new todolistRepository();
    }

    async addTask(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await this.todolistRepository.addTask(req.body.task, req.body.completed, userId);
            return res.status(200).json({
                success: response.success,
                msg: "Task added successfully",
                res: response.res
            })
        }
        catch (err) {
            next(err);
        }
    }

    async updateTask(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await this.todolistRepository.UpdateTask(req.body, req.params.taskId, userId);
            return res.status(200).json({
                success: response.success,
                msg: "Task updated successfully",
                res: response.res
            });
        }
        catch (err) {
            next(err);
        }
    }

    async deleteTask(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await this.todolistRepository.deleteTask(req.params.taskId, userId);
            return { success: true, res: response };
        }
        catch (err) {
            next(err);
        }
    }

    async getTask(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await this.todolistRepository.getTask(req.params.taskId, userId);
            return res.status(200).json({
                success: response.success,
                res: response.res
            })
        } catch (err) {
            next(err);
        }
    }
}