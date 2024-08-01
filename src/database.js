import {createPool} from 'mysql2/promise';
import { Sequelize } from 'sequelize';

const pool = createPool({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'xander',
    database: 'Prueba01'
});

const sequelize = new Sequelize('Prueba01', 'root', 'xander', {
    host: 'localhost',
    dialect: 'mysql'
    
});

(async () => {
  try {
      await sequelize.authenticate();
      console.log('Conexión establecida exitosamente con Sequelize.');

      // Sincronizar los modelos
      await sequelize.sync({ alter: true }); // Usa 'force: true' si quieres eliminar y recrear tablas, pero con cuidado
      console.log('Modelos sincronizados exitosamente.');
  } catch (err) {
      console.error('No se puede conectar a la base de datos con Sequelize:', err);
  }
})();

  export { Sequelize, sequelize };
export default pool;