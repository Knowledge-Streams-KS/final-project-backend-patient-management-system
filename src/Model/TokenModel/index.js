import {  DataTypes } from 'sequelize';
import sequelize from '../../db/config.js';


const TokenModel = sequelize.define(
  'token',
  {
    // Model attributes are defined here
    token:{
        type : DataTypes.STRING(500),
       // allowNull : false
    },

   
    },
  


  {
    // Other model options go here

  },
);

// `sequelize.define` also returns the model
//console.log(User === sequelize.models.User); // true
export default TokenModel