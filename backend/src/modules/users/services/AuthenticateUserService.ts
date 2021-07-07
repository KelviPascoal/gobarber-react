import { compare, hash } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { getRepository } from "typeorm";
import Users from "../infra/typeorm/entities/Users";
import authConfig from '../../../config/auth'
import AppError from '../../../shared/errors/AppErrors'

interface Request {
    email: string;
    password: string;
}

interface Response {
    user: Users;
    token: string;
}

class AuthenticateUserService {
    public async execute ({email, password}: Request): Promise< Response > {
    
    const userRepository = getRepository(Users);
        
    const user = await userRepository.findOne({where: { email } });
    if (!user) {
                 
        throw new AppError('Incorrect email/password combination.', 401);
    }

    const passwordMatched = await compare(password, user.password);

    if(!passwordMatched) {
        console.log(passwordMatched + "test 1");

        throw new AppError('Incorrect email/password combination.', 401);
    }

    const token = sign({}, authConfig.jwt.secret,{
        subject: user.id,
        expiresIn: authConfig.jwt.expiresIn,
    
    }
     
     );
    
    return {
         user, 
         token
        };

    }
}

export { AuthenticateUserService };