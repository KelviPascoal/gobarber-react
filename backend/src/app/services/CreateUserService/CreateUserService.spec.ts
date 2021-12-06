import FakeUsersRepository from "domain/repositories/fakes/FakeUsersRepository";
import AppError from "domain/errors/AppErrors";
import { FakeHashProvider } from "providers/HashProvider/fakes/FakeHashProvider";
import CreateUserServices from "./CreateUserServices";

describe("CreateAppointment", () => {
  it("shold be able to create a new user", async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserServices(
        fakeUsersRepository,
        fakeHashProvider
    )

    const user = await createUser.execute({
      name: 'Jhon Doe',
      email: 'jhondoe@exemple.com',
      password: '123456'
    });
    expect(user).toHaveProperty("id");
  });

  it("should not be able to create a new user using an email already registered", async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserServices(
        fakeUsersRepository,
        fakeHashProvider
    )

    await createUser.execute({
      name: 'Jhon Doe',
      email: 'jhondoe@exemple.com',
      password: '123456'
    });

    expect(createUser.execute({
        name: 'Jhon Doe',
        email: 'jhondoe@exemple.com',
        password: '123456'})).rejects.toBeInstanceOf(AppError)
    })

  });