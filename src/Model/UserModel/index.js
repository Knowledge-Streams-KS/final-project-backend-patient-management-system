import {  DataTypes } from 'sequelize';
import sequelize from '../../db/config.js';


const UserModel = sequelize.define(
  'User',
  {
    // Model attributes are defined here
    name:{
        type : DataTypes.STRING,
        allowNull : false
    },
    phoneNo: {
        type: DataTypes.STRING,
        // allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        validate:{
            isEmail:true,  
        },
        unique: true
    },
    password: {
        type:DataTypes.STRING,
        // allowNull:false
    },
    confirmPassword : {
        type: DataTypes.STRING,
        // allowNull:false
    },
    // role: {
    //     type: DataTypes.ENUM('patient', 'doctor', 'admin'),
    //     allowNull: false,
    //   },
   
    },
  


  {
    // Other model options go here

  },
);

// `sequelize.define` also returns the model
//console.log(User === sequelize.models.User); // true
export default UserModel