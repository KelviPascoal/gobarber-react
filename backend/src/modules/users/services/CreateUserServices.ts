import Users from "../infra/typeorm/entities/Users";
import { hash } from 'bcryptjs';
import AppError from "@shared/errors/AppErrors";
import { injectable, inject} from 'tsyringe';
import IUsersRepository from "../repositories/IUsersRepository";


interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserServices {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository) {}

  public async execute({ name, email, password }: IRequest): Promise<Users> {
    console.log('user');

    const checkUserExists = await this.userRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError("E-mail ja esta sendo ultilizado.");
    }

    const hashedPassword = await hash(password, 8)

    const user = await this.userRepository.createUser({
      name,
      email,
      password: hashedPassword,
    });

    

    return user;
  }
}
export default CreateUserServices;
