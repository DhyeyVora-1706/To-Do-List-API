import { NextFunction, Response , Request } from 'express';
import { UsersRepository } from './users.repository';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class UserController{
    userRepository : UsersRepository

    constructor(){
        this.userRepository = new UsersRepository();
    }

    async signUp(req: Request,res : Response , next : NextFunction)
    {
        try{
            const { name , email , password } = req.body;
            const hashedPassword = await bcrypt.hash(password,12);
            const response = await this.userRepository.signUp({name , email , password : hashedPassword});
            return res.status(201).json({
                success : response.success,
                msg : "User Registered Successfully",
                res : response.res
            })
        }
        catch(err)
        {
            next(err);
        }
    }

    async logIn(req: Request,res : Response , next : NextFunction)
    {
        try{
        const {email , password } = req.body;
        const validcredentials = await this.userRepository.logIn({email,password});
        if(validcredentials.success){
                const token = jwt.sign(
                    {
                        userId : validcredentials.res._id
                    },
                    "5b0b34f435224084f946e53f09a84a6c",
                    {
                        expiresIn : "1h"
                    }
                )

                return res.status(200).json({
                    success : true,
                    message : "Login Successful",
                    token
                });
            }
    }
    catch(err)
    {
        next(err);
    }
}
}