import { Request, Response, NextFunction } from "express";
import { verify } from 'jsonwebtoken';
import authConfig from 'app/config/auth'
import AppError from "@shared/errors/AppErrors";

interface ITokenPayload {
    iat: number;
    exp: number;
    sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): void {
    // validação do token JWT
    const authHeader = request.headers.authorization;
    
    if (!authHeader) {
        throw new AppError('JWT token is missing', 401);
    }

    const [, token] = authHeader.split(' ')

    try {
        const decoded = verify(token, authConfig.jwt.secret);
        
        const { sub } = decoded as ITokenPayload;

        request.user = {
            id: sub,
        }

        return next();

    } catch {
        throw new AppError('invalid JWT token', 401)
    }
}
