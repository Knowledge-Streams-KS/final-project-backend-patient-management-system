import { Model, Op } from 'sequelize';
import AppointmentModel from '../../Model/AppointmentModel/index.js';

import DoctorModel from '../../Model/DoctorModel/index.js';
import MedicalRecordModel from '../../Model/MedicalRecordModel/index.js';
import PatientModel from '../../Model/PatientModel/index.js';


const AppointmentController = {
  getAll: async (req, res) => {
    try {
      const getAllAppointments = await AppointmentModel.findAll({
        include: [
          // {
          //   model: PatientModel,
          //   attributes: ['PatientName'],
          // },
          {
            model: DoctorModel,
            attributes: ['DoctorName'],
          },
          {
            model: MedicalRecordModel
          }
        ],
      });
      res.status(200).json({
        Success: 'Get Appointment List Successfully',
        AppointMentRecord: getAllAppointments,
      });
    } catch (error) {
      res.status(500).json({ Error: 'Internal server error' });
    }
  },
  getSingle: async (req, res) => {
    try {
      const { id } = req.params;
      const findSingleAppointment = await AppointmentModel.findByPk(id);
      if (!findSingleAppointment) {
        return res.status(404).json({ Warning: `Appointment against this id ${id} is not found` });
      }
      res.status(200).json({ Success: 'Find Record of Appointment', Appointment: findSingleAppointment });
    } catch (error) {
      res.status(500).json({ Error: 'Internal server error' });
    }
  },
  create: async (req, res) => {
    try {
      const id = req.params.id;
      const { AppointmentDate, AppointmentTime, PatientName, 
        DoctorName, Department,hasVisited, medicalHistory} = req.body;

      // Find patient and doctor (with checks for existence)
     const patient = await PatientModel.findOne({ where: { PatientName : PatientName } });
      const doctor = await DoctorModel.findOne({
        where: {
          DoctorName: DoctorName
        }
      });
      if (!patient) {
        return res.status(400).json({ Error: 'Patient not found' });
      }

      if (!doctor) {
        return res.status(400).json({ Error: 'Doctor not found' });
      }
      console.log("doctor name is", doctor)

    
      // Log the patient and doctor objects
      console.log('Patient Object =>', patient);
      console.log('Doctor Object =>', doctor);

      // Build and save the appointment using patient and doctor IDs
      const AddAppointment = AppointmentModel.build({
        AppointmentDate,
        AppointmentTime,
        PatientName,
        PatientId: patient.id,  // Use patient ID
        DoctorId: doctor.id,    // Use doctor ID
        Department,
        hasVisited,
        medicalHistory
       
      });
      await AddAppointment.save();
      console.log("Appointment Date : ", AppointmentDate, "Appointment Time = ", AppointmentTime, "Patient = ", PatientName, "Doctor = ", DoctorName, "Department => ", Department, "Has visited => ", hasVisited)
      
      res.status(200).json({ success: 'Successfully Assigning new Appointment', AddAppointment: AddAppointment
      });
      console.log(AddAppointment)
    } catch (error) {
      console.error(error);  // Log the error for debugging
      res.status(500).json({ Error: 'Internal server error' });
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const deleteAppointment = await AppointmentModel.destroy({
        where: {
          id,
        },
      });
      if (deleteAppointment === 0) {
        return res.status(404).json({ Warning: `Appointment against this id ${id} cannot be dropped Unfortunately` });
      }
      res.status(200).json({ success: 'Dropped successfully', DropAppointment: deleteAppointment });
    } catch (error) {
      res.status(500).json({ Error: 'Internal server error' });
    }
  },
};

export default AppointmentController;
