import { Router } from "express";
import ensureAuthenticated from "infra/http/middlewares/ensureAuthenticated";
import AppointmentsController from "../controller/appointmentsController";

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();

appointmentsRouter.use(ensureAuthenticated)

// appointmentsRouter.get("/appointments", async (request: Request, response: Response) => {
//   console.log(request.user);
    // const appointments = await appointmentsRepository.find();
    // return response.status(200).json(appointments);
//   }
// );

appointmentsRouter.post("/appointments", appointmentsController.create)


export { appointmentsRouter };