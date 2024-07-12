import {  DataTypes } from 'sequelize';
import sequelize from '../../db/config.js';


const PatientModel = sequelize.define(
  'Patient',
  {
    // Model attributes are defined here
    PatientName: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    DateOfBirth: {
      type: DataTypes.DATE,
      // allowNull defaults to true
    },
    gender: {
      //  type :DataTypes.STRING,
      type: DataTypes.ENUM(['Male', 'Female', 'Other']),
       
    },
    address : {
        type: DataTypes.STRING
    },
    medicalHistory : {
        type : DataTypes.TEXT
    }
  },
  {
    // Other model options go here

  },
);

// `sequelize.define` also returns the model
//console.log(User === sequelize.models.User); // true
export default PatientModel