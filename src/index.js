require('dotenv').config();
const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const { sendError } = require('./utils/errorHandler');
const { createError } = require('./utils/errorUtils');
const { initializeDatabase } = require('./utils/dbInitializer');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/', userRoutes);

console.log('Маршруты загружены');

app.use('*', (req, res) => {
  const error = createError('ROUTE_NOT_FOUND', 'Маршрут не найден', 404);
  sendError(error, res);
});

app.use((err, _req, res, _next) => {
  console.error(err.stack);
  
  if (err.errorCode && err.statusCode) {
    return sendError(err, res);
  } 
  
  const error = createError('INTERNAL_SERVER_ERROR', 'Внутренняя ошибка сервера', 500);
  sendError(error, res);
});

async function startServer() {
  try {
    const dbInitialized = await initializeDatabase();
    
    if (!dbInitialized) {
      console.error('Не удалось инициализировать базу данных. Сервер не будет запущен.');
      process.exit(1);
    }
    
    const server = app.listen(PORT);
    
    server.on('error', (error) => {
      if (error.code === 'EADDRINUSE') {
        console.error(`Порт ${PORT} уже используется. Пытаемся освободить...`);
        
        try {
          process.exit(0);
        } catch (e) {
          console.error('Не удалось освободить порт:', e);
          process.exit(1);
        }
      } else {
        console.error('Ошибка при запуске сервера:', error);
        process.exit(1);
      }
    });
    
    server.on('listening', () => {
      console.log(`Сервер запущен на порту ${PORT}`);
    });
    
  } catch (error) {
    console.error('Ошибка при запуске сервера:', error);
    process.exit(1);
  }
}

startServer(); 