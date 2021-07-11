import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { getRepository } from "typeorm";
import Users from "../infra/typeorm/entities/Users";
import authConfig from '../../../config/auth'
import AppError from '../../../shared/errors/AppErrors'
import IUsersRepository from "../repositories/IUsersRepository";
import { injectable, inject} from 'tsyringe';

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: Users;
    token: string;
}

@injectable()
class AuthenticateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) {

    }


    public async execute ({email, password}: IRequest): Promise< IResponse > {
    
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