import express,{ NextFunction, Response , Request } from 'express';
import { UserController } from './users.controller';

export const userRouter = express.Router();
const userController = new UserController();

userRouter.post("/signUp",(req : Request , res : Response , next : NextFunction) => {
    userController.signUp(req,res,next);
})

userRouter.post("/logIn",(req : Request , res : Response , next : NextFunction) => {
    userController.logIn(req,res,next);
})