import { getRepository } from "typeorm";
import Users from "../infra/typeorm/entities/Users";
import path from "path";
import uploadConfig from "@config/upload";
import fs from "fs";
import AppError from "@shared/errors/AppErrors";
import { injectable, inject} from 'tsyringe';
import IUsersRepository from "../repositories/IUsersRepository";


interface IRequest {
  user_id: string;
  avatarFileName: string;
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository
  ) {}


  public async execute({ user_id, avatarFileName }: IRequest): Promise<Users> {
    /**
     * instanciar o repositorio e usar ele para checar a existencia do usuario
     * depois juntar o arquivo de foto para avatar e sua respectiva rota e encapsular numa variavel
     * checar se ja existe um avatar no usuario, se tiver => excluir a foto atual, e add a nova.
     */
    const usersReposotry = getRepository(Users);

    const user = await usersReposotry.findOne(user_id );


    if (!user) {
      throw new AppError("only authenticated users can change avatar.", 401);
    }
    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }
    user.avatar = avatarFileName;

    await usersReposotry.save(user)

    return user;
  }
}

export default UpdateUserAvatarService;
