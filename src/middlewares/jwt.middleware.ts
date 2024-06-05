import jwt from 'jsonwebtoken';
import { NextFunction, Response ,Request } from 'express';

interface UserPayload {
  userId: string;
}

export let userId: string;
export function validateToken(req: Request , res: Response, next: NextFunction) {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  try {
   
    const secret = "5b0b34f435224084f946e53f09a84a6c";
    if (!secret) {
      throw new Error('Missing JWT secret in environment variables');
    }

    const payload = jwt.verify(token, secret) as UserPayload; 
    userId = payload.userId;
    

  } catch (err) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }
  next();
}
