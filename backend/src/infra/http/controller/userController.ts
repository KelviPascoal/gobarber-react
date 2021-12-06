import CreateUserServices from "app/services/CreateUserService/CreateUserServices";
import { Request, Response } from "express";
import { container } from "tsyringe";

export default class UserController {
    public async create(request: Request, response: Response): Promise<Response> {
        try {
            const { name, email, password } = request.body;
            
            const CreateUser = container.resolve(CreateUserServices);
        
            const user = await CreateUser.execute({
              name,
              email,
              password,
            });
        
            user.password = "private data!";
        
            return response.status(201).json(user);
          } catch (err: any) {
            return response.status(400).json({ error: err.message });
          }
        
       
        
    }
}