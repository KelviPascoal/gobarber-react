import AppError from "domain/errors/AppErrors";
import { FakeHashProvider } from "../../../providers/HashProvider/fakes/FakeHashProvider";
import FakeUsersRepository from "../../../domain/repositories/fakes/FakeUsersRepository";
import { AuthenticateUserService } from "./AuthenticateUserService";
import CreateUserServices from "../CreateUserService/CreateUserServices";

describe("CreateAppointment", () => {
  it("shold be able to create a new user", async () => {

    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserServices(
        fakeUsersRepository,
        fakeHashProvider,
    );

    const authenticateUser = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider);

    const user = await createUser.execute({
      name: "Jhon Doe",
      email: "jhondoe@exemple.com",
      password: "123456",
    });

    const response = await authenticateUser.execute({
      email: "jhondoe@exemple.com",
      password: "123456",
    });

    expect(response).toHaveProperty("token");
    expect(response.user).toEqual(user);

  });
});
