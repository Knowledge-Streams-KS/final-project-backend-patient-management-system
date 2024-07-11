import {  DataTypes } from 'sequelize';
import sequelize from '../../db/config.js';
import PatientModel from '../PatientModel/index.js';
import DoctorModel from '../DoctorModel/index.js';


const AppointmentModel = sequelize.define(
  'Appointment',
  {
    // Model attributes are defined here
    AppointmentDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    // PatientName : {
    //     type: DataTypes.STRING,
    // },
    AppointmentTime: {
      type: DataTypes.TIME,
      // allowNull defaults to true
    },
    Department: {
        type : DataTypes.STRING
    },
    hasVisited: {
      type: DataTypes.BOOLEAN
    },
    status : {
         type: DataTypes.ENUM(['pending', 'Accepted', 'Rejected']),
  defaultValue: 'pending'
    },
    medicalHistory: {
      type :DataTypes.BOOLEAN
    }
  },
  {
    // Other model options go here

  },
);

// `sequelize.define` also returns the model
//console.log(User === sequelize.models.User); // true
export default AppointmentModel

PatientModel.hasMany(AppointmentModel);
AppointmentModel.belongsTo(PatientModel);
DoctorModel.hasMany(AppointmentModel);
AppointmentModel.belongsTo(DoctorModel);