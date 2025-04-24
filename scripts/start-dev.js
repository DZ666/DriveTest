const { spawn, execSync } = require('child_process');
const path = require('path');

// Импортируем скрипт очистки порта
require('./kill-server');

// Запускаем nodemon через 1 секунду, чтобы порт успел освободиться
setTimeout(() => {
  console.log('Запускаем сервер разработки...');
  
  const nodemonProcess = spawn('nodemon', [
    '--config',
    path.join(__dirname, '..', 'nodemon.json'),
    path.join(__dirname, '..', 'src', 'index.js')
  ], {
    stdio: 'inherit',
    shell: true
  });
  
  // Обрабатываем выход из процесса
  nodemonProcess.on('close', (code) => {
    console.log(`Процесс nodemon завершен с кодом ${code}`);
    process.exit(code);
  });
  
  // Обрабатываем Ctrl+C
  process.on('SIGINT', () => {
    console.log('Получен сигнал SIGINT, завершаем работу...');
    nodemonProcess.kill('SIGINT');
  });
  
}, 1000); 