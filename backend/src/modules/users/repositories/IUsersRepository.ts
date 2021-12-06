import Users from "../../../infra/typeorm/entities/Users";
import IUsersDTO from "types/dtos/ICreateUsersDTO";

export default interface IUsersRepository {
  findById(id: string): Promise<Users | undefined>;
  findByEmail(email: string): Promise<Users | undefined>;
  createUser(data: IUsersDTO): Promise<Users>;
  save(user: Users): Promise<Users>;
}
