import sequelize from './config/database.js';
import User from './models/user.model.js';

sequelize.sync()
  .then(() => {
    console.log('La base de datos y los modelos han sido sincronizados.');
  })
  .catch(err => {
    console.error('No se pudo sincronizar la base de datos:', err);
  });
