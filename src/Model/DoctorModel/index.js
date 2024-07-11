import {  DataTypes } from 'sequelize';
import sequelize from '../../db/config.js';


const DoctorModel = sequelize.define(
  'Doctor',
  {
    // Model attributes are defined here
    DoctorName: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    Specialization: {
      type: DataTypes.STRING,
    
      // allowNull defaults to true
    },
    // gender: {
    //    type :DataTypes.STRING
    // },
    // address : {
    //     type: DataTypes.STRING
    // },
    // medicalHistory : {
    //     type : DataTypes.TEXT
    // }
  },
  {
    // Other model options go here

  },
);

// `sequelize.define` also returns the model
//console.log(User === sequelize.models.User); // true
export default DoctorModel