import { DataTypes } from 'sequelize';
import sequelize from '../../db/config.js';
import UserModel from '../UserModel/index.js';

const PatientModel = sequelize.define('Patient', {
  PatientName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  DateOfBirth: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});



export default PatientModel;
