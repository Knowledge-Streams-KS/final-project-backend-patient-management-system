import { Router } from "express";
import medicalRecordController from "../../Controllers/MedicalRecord/index.js";
const medicalRecordRouter = Router();

medicalRecordRouter.get("/getAllMedicalRecords", medicalRecordController.getAll);
medicalRecordRouter.get("/getSingleMedicalRecord/:id",medicalRecordController.getSingle);
medicalRecordRouter.post("/AddMedicalRecord",medicalRecordController.create);
medicalRecordRouter.delete("/DropMedicalRecord/:id", medicalRecordController.delete);

export default medicalRecordRouter;