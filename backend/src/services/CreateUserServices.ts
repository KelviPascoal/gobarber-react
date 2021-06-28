import { getRepository } from "typeorm";
import Users from "../models/Users";
import { hash } from 'bcryptjs';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserServices {
  public async execute({ name, email, password }: Request): Promise<Users> {
    const userRepository = getRepository(Users);

    const checkUserExists = await userRepository.findOne({
      where: { email },
    });

    if (checkUserExists) {
      throw new Error("E-mail ja esta sendo ultilizado.");
    }

    const hashedPassword = await hash(password, 8)

    const user = userRepository.create({
      name,
      email,
      password: hashedPassword,
    });
    await userRepository.save(user);
    return user;
  }
}
export default CreateUserServices;
