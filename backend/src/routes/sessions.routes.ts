import { Request, Response, Router } from "express";
import { AuthenticateUserService } from "../services/AuthenticateUserService";


const sessionsRouter = Router();

sessionsRouter.post("/sessions", async (request: Request, response: Response) => {
  try {
    const { email, password } = request.body;

    const authenticateUser = new AuthenticateUserService();
    console.log( "to na rota",request.body);
    
    const { user, token } = await authenticateUser.execute({email, password});

    delete user.password;

    return response.status(200).json({user, token})

  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export {sessionsRouter};
