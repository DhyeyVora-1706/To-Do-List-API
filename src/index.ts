import swagger from 'swagger-ui-express';
import express, { Request, Response, NextFunction } from 'express'
import { connectToMongoDB } from './config/db';
import { userRouter } from './features/users/users.routes';
import { customErrorHandler } from './errorHandler/customErrorHandler';
import { todolistRouter } from './features/To-Do-List/todolist.routes';
import { validateToken } from './middlewares/jwt.middleware';
import apiDocs from '../swagger.json'

export const app = express();

app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/tasks", validateToken, todolistRouter);
app.use("/api/docs",swagger.serve,swagger.setup(apiDocs));


app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof customErrorHandler) {
        return res.status(err.code).json({ error: err.message });
    }

    console.log(err);
    res.status(500).send('Something Went Wrong , Please try Later');
})


app.listen(4500, () => {
    console.log('Server is running on port 4500');
    connectToMongoDB();
})
