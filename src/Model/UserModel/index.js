import { DataTypes } from 'sequelize';
import sequelize from '../../db/config.js';

const UserModel = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    validate: {
      isEmail: true,
    },
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
  },
  confirmPassword: {
    type: DataTypes.STRING,
  },
  role: {
    type: DataTypes.ENUM('patient', 'doctor', 'admin'),
  },
});

export default UserModel;
