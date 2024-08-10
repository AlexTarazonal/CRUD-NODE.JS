import { Sequelize, DataTypes } from 'sequelize';
import { sequelize } from '../database.js'; 
import User from './user.models.js';

const Task = sequelize.define('Task', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [1, 255]  
    }
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [1, 1000]  
    }
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    },
    allowNull: false
  }

}, {
  timestamps: true,
  tableName: 'tasks' 
});
  
User.hasMany(Task, { foreignKey: 'userId' });
Task.belongsTo(User, { foreignKey: 'userId' });

sequelize.sync({ force: false }) 
  .then(() => {
    console.log('Database & tables created!');
  })
  .catch(error => {
    console.error('Unable to create tables:', error.message); // Mensaje de error más detallado
  });
 
export default Task;
