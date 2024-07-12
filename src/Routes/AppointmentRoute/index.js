import { Router } from "express";
import AppointmentController from "../../Controllers/Appointment/index.js";
const AppointmentRouter = Router();

AppointmentRouter.get("/AllAppointments", AppointmentController.getAll);
AppointmentRouter.get("/getSingleAppointment", AppointmentController.getSingle);
AppointmentRouter.post("/AddAppointment", AppointmentController.create);
AppointmentRouter.delete("/DropAppointments/:id", AppointmentController.delete);

export default AppointmentRouter