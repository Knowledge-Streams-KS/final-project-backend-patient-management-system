import { Router } from "express";
import AppointmentController from "../../Controllers/Appointment/index.js";
const AppointmentRouter = Router();

AppointmentRouter.get("/AllAppointments", AppointmentController.getAll);
AppointmentRouter.get("/getSingleAppointment/:id", AppointmentController.getSingle);
AppointmentRouter.post("/AddAppointment", AppointmentController.create);
AppointmentRouter.delete("/DropAppointments/:id", AppointmentController.delete);
// Route to get appointments for a specific patient
AppointmentRouter.get('/appointments/patient/:patientId', AppointmentController.getPatientAppointments);
export default AppointmentRouter