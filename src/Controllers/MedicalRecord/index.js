import AppointmentModel from "../../Model/AppointmentModel/index.js"
import DoctorModel from "../../Model/DoctorModel/index.js"
import MedicalRecordModel from "../../Model/MedicalRecordModel/index.js"
import PatientModel from "../../Model/PatientModel/index.js"

const medicalRecordController = {
  getAll: async (req, res) => {
    try {
      const medicalRecords = await MedicalRecordModel.findAll({
        include: [
          {
            model: AppointmentModel,
            attributes: ['Department'] 
          },
          {
            model : PatientModel, 
            attributes : ['PatientName']
          },
       
          {
            model: DoctorModel,
            attributes: ['DoctorName']
          }
        ]
      })
      res.status(200).json({ success: "Find All Medical Records", medicalRecords })
      console.log(medicalRecords)
    } catch (error) {
      console.error(error)
      res.status(500).json({ Error: "Internal Server Error" })
    }
  },

  getSingle: async (req, res) => {
    try {
      const { id } = req.params
      const medicalRecord = await MedicalRecordModel.findByPk(id)
      if (!medicalRecord) {
        return res.status(404).json({ Warning: `Medical Record against this particular id ${id} is not found` })
      }
      res.status(200).json({ success: `Medical Record for this id ${id} is found successfully`, medicalRecord })
    } catch (error) {
      console.error(error)
      res.status(500).json({ Error: "Internal Server Error" })
    }
  },

  create: async (req, res) => {
    try {
        // Log the incoming request body for debugging
        console.log('Request Body:', req.body);

        const { medicalRecord, patientName, doctorName, departmentName } = req.body;

        // Validate inputs
        if (!medicalRecord || !patientName || !doctorName || !departmentName) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Find the associated models
         const patient = await PatientModel.findOne({ where: { PatientName: patientName } });
        const doctor = await DoctorModel.findOne({ where: { DoctorName: doctorName } });
        const appointment = await AppointmentModel.findOne({ where: { Department: departmentName ,
       

        } });

        // Check if the patient, doctor, and appointment exist
        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }
        if (!doctor) {
            return res.status(404).json({ error: 'Doctor not found' });
        }
        if (!appointment) {
            return res.status(404).json({ error: 'Department not found' });
        }

        // Create the new medical record
        const newMedicalRecord = await MedicalRecordModel.create({
            medicalRecord,
            PatientId: patient.id,
            DoctorId: doctor.id,
            AppointmentId: appointment.id
        });

        // Send the response
        res.status(201).json({ success: "Successfully created the medical record", newMedicalRecord });
    } catch (error) {
        console.error(error);
        res.status(500).json({ Error: "Internal Server Error" });
    }
},

  delete: async (req, res) => {
    try {
      const { id } = req.params
      const deletedMedicalRecord = await MedicalRecordModel.destroy({ where: { id } })
      if (deletedMedicalRecord === 0) {
        return res.status(404).json({ Warning: `Cannot drop the medical record against this id ${id}` })
      }
      res.status(200).json({ success: "Drop Medical Record successfully!" })
    } catch (error) {
      console.error(error)
      res.status(500).json({ Error: "Internal Server Error" })
    }
  }
}

export default medicalRecordController