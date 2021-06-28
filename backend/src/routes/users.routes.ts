import { Request, Response, Router } from "express";
import CreateUserServices from "../services/CreateUserServices";

const usersRouter = Router();

usersRouter.post("/users", async (request: Request, response: Response) => {
  try {
    const { name, email, password } = request.body;

    const CreateUser = new CreateUserServices()

    const user = await CreateUser.execute({
        name,
        email,
        password,
    });

    delete user.password;

    return response.status(201).json(user);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export {usersRouter};
