import { Router } from "express";

import PatientController from "../../Controllers/Patient/index.js";
const PatientRouter = Router();

PatientRouter.get("/GetAllPatients",PatientController.getAll);

PatientRouter.get("/GetSinglePatient/:id",PatientController.getSingle);

PatientRouter.post("/AddPatients",PatientController.create);



PatientRouter.delete("/DropPatientRecord/:id", PatientController.delete)

export default PatientRouter;