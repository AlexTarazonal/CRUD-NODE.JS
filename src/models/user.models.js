import { Sequelize, DataTypes } from 'sequelize';
import { sequelize } from '../database.js'; 

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    trim: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,  // Asegúrate de que no haya más de una declaración UNIQUE en este campo
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: true, 
});

export default User;
