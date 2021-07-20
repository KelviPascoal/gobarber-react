import Users from "../infra/typeorm/entities/Users";
import AppError from "@shared/errors/AppErrors";
import { injectable, inject} from 'tsyringe';
import IUsersRepository from "../repositories/IUsersRepository";
import IHashProvider from '../providers/HashProvider/models/IHashProvider'

interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserServices {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
    ) {}

  public async execute({ name, email, password }: IRequest): Promise<Users> {

    const checkUserExists = await this.userRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError("E-mail ja esta sendo ultilizado.");
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.userRepository.createUser({
      name,
      email,
      password: hashedPassword,
    });
    console.log('user');
    
    // const userTest = await this.userRepository.save(user)
    

    return user;
  }
}
export default CreateUserServices;
