import { Request, Response, NextFunction } from "express";
import { verify } from 'jsonwebtoken';
import authConfig from '../config/auth'

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): void {
    // validação do token JWT
    const authHeader = request.headers.authorization;
    
    console.log(authHeader);


    if (!authHeader) {
        throw new Error('JWT token is missing');
    }

    const [, token] = authHeader.split(' ')

    try {
        const decoded = verify(token, authConfig.jwt.secret);

        return next();


    } catch {
        throw new Error('invalid JWT token')
    }
}
