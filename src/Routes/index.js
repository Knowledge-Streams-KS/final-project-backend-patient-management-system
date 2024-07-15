import AppointmentRouter from "./AppointmentRoute/index.js";
import doctorRouter from "./DoctorRoute/index.js";
import medicalRecordRouter from "./MedicalRecordRoute/index.js";
import messageRouter from "./MessageRoute/index.js";
import PatientRouter from "./PatientRoute/index.js";
import userAuthRouter from "./UserAuth/index.js";


const AllRoutes = [PatientRouter,doctorRouter,AppointmentRouter,medicalRecordRouter,messageRouter,userAuthRouter];

export default AllRoutes;
