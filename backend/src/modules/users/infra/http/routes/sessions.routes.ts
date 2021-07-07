import { Request, Response, Router } from "express";
import { AuthenticateUserService } from "@modules/users/services/AuthenticateUserService";


const sessionsRouter = Router();

sessionsRouter.post("/sessions", async (request: Request, response: Response) => {
  try {
    const { email, password } = request.body;

    
    const authenticateUser = new AuthenticateUserService();
    
    const { user, token } = await authenticateUser.execute({email, password});

    user.password = "private data!";

    return response.status(200).json({user, token})

  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export {sessionsRouter};
