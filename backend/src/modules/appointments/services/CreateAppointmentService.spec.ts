import AppError from "@shared/errors/AppErrors";
import FakeAppointmentsRepository from "../repositories/fakes/FakeAppointmentsRepository";
import { CreateAppointmentsServices } from "./CreateAppointmentsService";

describe("CreateAppointment", () => {
  it("shold be able to create a new appointment", async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentsServices(
      fakeAppointmentsRepository
    );

    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: "123123",
    });
    expect(appointment).toHaveProperty("id");
    expect(appointment.provider_id).toBe("123123");
  });

  it("should not be able to create a new appointment on a date already scheduled", async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentsServices(
      fakeAppointmentsRepository
    );

    const appointmentDate = new Date(2021, 10, 10, 11);

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: "123123",
    });
    expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: "123123",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
