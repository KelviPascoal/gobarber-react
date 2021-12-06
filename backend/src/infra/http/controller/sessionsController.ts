import { AuthenticateUserService } from "app/services/Auth/AuthenticateUserService";
import { Request, Response } from "express";
import { container } from "tsyringe";
import UsersRepository from "../../typeorm/repositories/UsersRepository";

export default class SessionsController {
    public async create(request: Request, response: Response): Promise<Response> {
        try {
            const { email, password } = request.body;
        
            const userRepository = new UsersRepository()
            const authenticateUser = container.resolve(AuthenticateUserService);
            
            const { user, token } = await authenticateUser.execute({email, password});
        
            user.password = "private data!";
        
            return response.status(200).json({user, token})
        
          } catch (err: any) {
            return response.status(400).json({ error: err.message });
          }
    }
}