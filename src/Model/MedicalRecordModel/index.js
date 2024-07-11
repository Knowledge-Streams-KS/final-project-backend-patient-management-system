import {  DataTypes } from 'sequelize';
import sequelize from '../../db/config.js';
import AppointmentModel from '../AppointmentModel/index.js';
import PatientModel from '../PatientModel/index.js';
import DoctorModel from '../DoctorModel/index.js';



const MedicalRecordModel = sequelize.define(
  'MedicalRecord',
  {
    // Model attributes are defined here
    medicalRecord: {
        type: DataTypes.TEXT, // or DataTypes.JSON
        allowNull: true
      }
   
  },
  {
    // Other model options go here

  },
);

// `sequelize.define` also returns the model
//console.log(User === sequelize.models.User); // true
export default MedicalRecordModel

/* Patient have many medical records but medical record has dealing 1 patient at a time */
PatientModel.hasMany(MedicalRecordModel)
MedicalRecordModel.belongsTo(PatientModel)
/* Doctor have many medical records but medical record has dealing 1 Doctor at a time */

DoctorModel.hasMany(MedicalRecordModel)
MedicalRecordModel.belongsTo(DoctorModel)

/* Appointment have many medical records but medical record has dealing 1 Appointment at a time */

AppointmentModel.hasMany(MedicalRecordModel)
MedicalRecordModel.belongsTo(AppointmentModel)


