import { Router } from "express";
import DoctorController from "../../Controllers/Doctor/index.js";
const doctorRouter = Router();

doctorRouter.get("/getAllDoctors", DoctorController.getAll);
doctorRouter.get("/findDoctor/:id",DoctorController.getSingle);
doctorRouter.post("/AddDoctors",DoctorController.create);
doctorRouter.delete("/DropDoctors/:id",DoctorController.delete);

export default doctorRouter