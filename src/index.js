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
    
    app.listen(PORT, () => {
      console.log(`Сервер запущен на порту ${PORT}`);
    });
  } catch (error) {
    console.error('Ошибка при запуске сервера:', error);
    process.exit(1);
  }
}

startServer(); 