import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import ICreateUsersDTO from "types/dtos/ICreateUsersDTO";
import Users from "../../../../infra/typeorm/entities/Users";
import { uuid } from "uuidv4";

class FakeUsersRepository implements IUsersRepository {
  private users: Users[] = [];

  public async findById(id: string): Promise<Users | undefined> {
    const findUser = this.users.find((user: Users) => user.id == id);
    return findUser;
  }

  public async findByEmail(email: string): Promise<Users | undefined> {
    const findUser = this.users.find((user: Users) => user.email == email);
    return findUser;
  }

  public async createUser(userData: ICreateUsersDTO): Promise<Users> {
    const user = new Users();
    Object.assign(user, { id: uuid() }, userData);
    this.users.push(user);
    return user;
  }

  public async save(user: Users): Promise<Users> {
    const findIndex = this.users.findIndex(
      (findIndex) => findIndex.id == user.id
    );
    this.users[findIndex] = user;
    return user;
  }
}

export default FakeUsersRepository;
