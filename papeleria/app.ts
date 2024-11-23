require('dotenv').config();
import express from 'express';
import router from './routes'; // Ruta para las operaciones CRUD
import sequelize from './db/config/connection'; 
import cors from 'cors'

const app = express();
app.use(cors());
// Middlewares;
app.use(express.json());

// Probar conexión a la base de datos
sequelize.authenticate()
  .then(() => console.log('Conexión exitosa a la base de datos'))
  .catch((err) => console.error('Error al conectar con la base de datos:', err));

// Rutas
app.use('/api', router);

// Configuración del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App escuchando en el puerto ${PORT}`);
  console.log('Presiona Ctrl+C para salir.');
});
