
import mongoose from 'mongoose';
import { customErrorHandler } from "../../errorHandler/customErrorHandler";
import { todolistSchema } from "./todolist.schema";

const TodoListModel = mongoose.model("task", todolistSchema);

export class todolistRepository {

    async addTask(task: string, completed: boolean, userId: string): Promise<{ success: boolean; res: any }> {
        try {
            const newTask = new TodoListModel({ task, completed, userId });
            await newTask.save();
            return { success: true, res: newTask };
        }
        catch (err: any) {
            if (err instanceof customErrorHandler) {
                throw new customErrorHandler(err.message, err.code);
            }

            throw new Error(err.message);
        }
    }

    async UpdateTask(updatedTaskObj: { task: string, completed: boolean }, taskId: string, userId: string): Promise<{ success: boolean; res: any }> {
        try {
            const validTask = await this.getTaskFromTaskId(taskId);

            if (!validTask) {
                throw new customErrorHandler("TaskId is Invalid", 400);
            }
            if (validTask.userId.toString() !== userId) {
                throw new customErrorHandler("You can only update Task which you have created", 404);
            }

            const updatedTask = await TodoListModel.findByIdAndUpdate(taskId, updatedTaskObj, { new: true });
            return { success: true, res: updatedTask };
        }
        catch (err: any) {
            if (err instanceof customErrorHandler) {
                throw new customErrorHandler(err.message, err.code);
            }

            throw new Error(err.message);
        }
    }

    async deleteTask(taskId: string, userId: string): Promise<{ success: boolean; res: any }> {
        try {
            const validTaskId = await this.getTaskFromTaskId(taskId);

            if (!validTaskId) {
                throw new customErrorHandler("TaskId is Invalid", 404);
            }

            if (validTaskId.userId.toString() !== userId) {
                throw new customErrorHandler("You can not delete a task which you have not created", 400);
            }

            const deletedTask = await TodoListModel.findByIdAndDelete(taskId);
            return { success: true, res: deletedTask }
        }
        catch (err: any) {
            if (err instanceof customErrorHandler) {
                throw new customErrorHandler(err.message, err.code);
            }

            throw new Error(err.message);
        }
    }

    async getTask(taskId: string, userId: string) {
        try {
            const validTask = await this.getTaskFromTaskId(taskId);

            if (!validTask) {
                throw new customErrorHandler("TaskId is invalid", 404);
            }

            if (validTask.userId.toString() !== userId) {
                throw new customErrorHandler("You can't view tasks you have not created", 400);
            }

            const task = await TodoListModel.findById(taskId);
            return { success: true, res: task };
        }
        catch (err: any) {
            if (err instanceof customErrorHandler) {
                throw new customErrorHandler(err.message, err.code);
            }

            throw new Error(err.message);
        }
    }

    async getTaskFromTaskId(taskId: string) {
        try {
            return await TodoListModel.findById(taskId);
        }
        catch (err: any) {
            if (err instanceof customErrorHandler) {
                throw new customErrorHandler(err.message, err.code);
            }

            throw new Error(err.message);
        }
    }

}