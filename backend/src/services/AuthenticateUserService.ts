import { compare, hash } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { getRepository } from "typeorm";
import Users from "../models/Users";
import authConfig from '../config/auth'


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
    console.log( { email, password });

    const user = await userRepository.findOne({where: { email } });
    if (!user) {
        console.log(user + "test 1");
                
        throw new Error('Incorrect email/password combination.');
    }

    const passwordMatched = await compare(password, user.password);

    if(!passwordMatched) {
        console.log(passwordMatched + "test 1");

        throw new Error('Incorrect email/password combination.');
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