const fs = require('fs');
const path = require('path');

// Проверка наличия директории public
const publicDir = path.join(__dirname, '..', 'public');
if (!fs.existsSync(publicDir)) {
  console.log('Creating public directory...');
  fs.mkdirSync(publicDir, { recursive: true });
}

// Создаем placeholder-файл, если директория пуста
const files = fs.readdirSync(publicDir);
if (files.length === 0) {
  console.log('Public directory is empty, creating placeholder...');
  fs.writeFileSync(
    path.join(publicDir, 'placeholder.txt'),
    'This file ensures that the public directory exists in the repository.'
  );
}

console.log('Public directory check completed successfully.'); 