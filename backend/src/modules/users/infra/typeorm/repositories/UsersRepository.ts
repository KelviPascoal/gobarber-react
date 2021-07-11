import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import { getRepository, Repository } from "typeorm";
import ICreateUsersDTO from '@modules/users/dtos/ICreateUsersDTO'
import Users from '../entities/Users';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<Users>;

  constructor() {
    this.ormRepository = getRepository(Users);
  }

 public async findById(id: string): Promise<Users | undefined> {
  const user = await this.ormRepository.findOne({where: {id: id}})
  if (!user) {
    throw new Error('Error')
  }
  return user;
 } 

 public async findByEmail(email: string): Promise<Users | undefined> {
   const user = await this.ormRepository.findOne({where: {email: email}})
  if (!user) {
    throw new Error('Error')
  }
  return user;
  }

  public async createUser(userData: ICreateUsersDTO): Promise<Users> {
    const User = this.ormRepository.create(userData)
    await this.ormRepository.save(User);
    return User;
  }

  public async save(user: Users): Promise<Users> {
    return this.ormRepository.save(user)
  }

}



export default UsersRepository;
