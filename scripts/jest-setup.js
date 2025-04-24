// Заглушки для консольных методов во время тестов
if (process.env.NODE_ENV === 'test') {
  // Сохраняем оригинальные функции
  const originalConsoleError = console.error;
  const originalConsoleWarn = console.warn;
  const originalConsoleInfo = console.info;
  const originalConsoleLog = console.log;

  // Переопределяем console.error, чтобы он ничего не выводил
  console.error = jest.fn();
  console.warn = jest.fn();
  
  // Опционально - можно заглушить и другие методы
  // console.info = jest.fn();
  // console.log = jest.fn();
  
  // Восстанавливаем оригинальные функции после всех тестов
  afterAll(() => {
    console.error = originalConsoleError;
    console.warn = originalConsoleWarn;
    console.info = originalConsoleInfo;
    console.log = originalConsoleLog;
  });
} 