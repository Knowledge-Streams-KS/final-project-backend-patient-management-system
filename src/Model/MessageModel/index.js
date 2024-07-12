import {  DataTypes } from 'sequelize';
import sequelize from '../../db/config.js';




const MessageModel = sequelize.define(
  'Message',
  {
    // Model attributes are defined here
    firstName :
    {
      type : DataTypes.STRING
    },
    lastName : {
        type : DataTypes.STRING
    },
    email : {
        type : DataTypes.STRING
    },
    message: {
        type: DataTypes.STRING(500), // or DataTypes.JSON
        allowNull: true
      }
   
  },
  {
    // Other model options go here

  },
);

// `sequelize.define` also returns the model
//console.log(User === sequelize.models.User); // true
export default MessageModel



