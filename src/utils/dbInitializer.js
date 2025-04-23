const { PrismaClient } = require('@prisma/client');
const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

const prisma = new PrismaClient();

/**
 * Проверяет соединение с базой данных
 * @returns {Promise<boolean>} Успешность соединения
 */
async function checkDatabaseConnection() {
  try {
    await prisma.$connect();
    console.log('Соединение с базой данных установлено успешно');
    return true;
  } catch (error) {
    console.error('Ошибка соединения с базой данных:', error.message);
    return false;
  }
}

/**
 * Проверяет наличие таблиц в базе данных
 * @returns {Promise<boolean>} Существуют ли таблицы
 */
async function checkTablesExist() {
  try {
    // Проверяем наличие таблицы User через запрос
    const result = await prisma.$queryRaw`SHOW TABLES LIKE 'User'`;
    return result.length > 0;
  } catch (error) {
    console.error('Ошибка при проверке таблиц:', error.message);
    return false;
  }
}

/**
 * Создает таблицы в базе данных, используя миграции Prisma
 * @returns {Promise<boolean>} Успешность создания
 */
async function createTables() {
  try {
    console.log('Начинаем инициализацию базы данных...');
    
    // Применяем миграции с помощью Prisma db push (не требует файлов миграции)
    await execPromise('npx prisma db push --accept-data-loss');
    
    console.log('Таблицы в базе данных созданы успешно');
    return true;
  } catch (error) {
    console.error('Ошибка при создании таблиц:', error.message);
    return false;
  }
}

/**
 * Инициализирует базу данных при запуске приложения
 * @returns {Promise<void>}
 */
async function initializeDatabase() {
  try {
    const isConnected = await checkDatabaseConnection();
    
    if (!isConnected) {
      console.error('Невозможно инициализировать базу данных - отсутствует соединение');
      return false;
    }
    
    const tablesExist = await checkTablesExist();
    
    if (!tablesExist) {
      console.log('Таблицы в базе данных не обнаружены. Создаем таблицы...');
      await createTables();
    } else {
      console.log('Таблицы в базе данных уже существуют');
    }
    
    return true;
  } catch (error) {
    console.error('Ошибка при инициализации базы данных:', error.message);
    return false;
  } finally {
    await prisma.$disconnect();
  }
}

module.exports = {
  initializeDatabase,
  prisma
}; 