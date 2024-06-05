import { customErrorHandler } from "../../errorHandler/customErrorHandler";
import { userSchema } from "./users.schema";
import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const UserModel = mongoose.model("user",userSchema);

export class UsersRepository {
    async signUp(userObj : {name:string , email : string , password : string}):Promise< { success : boolean ; res : any } >
    {
        try{
            const newUser = new UserModel(userObj);
            await newUser.save();
            return { success : true, res : newUser };
        }
        catch(err : any)
        {
            if(err instanceof customErrorHandler)
            {
                throw new customErrorHandler(err.message,err.code);
            }

            throw new Error(err.message);
        }
    }

    async logIn(userObj : {email : string , password : string}):Promise< { success : boolean ; res : any } >
    {
        try{
            const user = await UserModel.findOne({email : userObj.email});

            if(!user)
            {
                throw new customErrorHandler("User Not Found",404);
            }
            else
            {
                const storedPassword = await bcrypt.compare(userObj.password,user.password);

                if(storedPassword){
                    return { success : true , res : user}
                }else{
                    throw new customErrorHandler("Invalid Credentials",400);
                }
            }
        }   
        catch(err : any)
        {
            if(err instanceof customErrorHandler)
            {
                throw new customErrorHandler(err.message,err.code);
            }

            throw new Error(err.message);
        }
    }
}