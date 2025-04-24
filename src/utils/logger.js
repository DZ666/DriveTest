function error(message, meta = {}) {
  // Пропускаем логирование, если находимся в тестовой среде
  if (process.env.NODE_ENV === 'test') return;
  console.error(`[ERROR] ${message}`, meta);
}

function info(message, meta = {}) {
  // Пропускаем логирование, если находимся в тестовой среде
  if (process.env.NODE_ENV === 'test') return;
  console.info(`[INFO] ${message}`, meta);
}

function warn(message, meta = {}) {
  // Пропускаем логирование, если находимся в тестовой среде
  if (process.env.NODE_ENV === 'test') return;
  console.warn(`[WARN] ${message}`, meta);
}

function debug(message, meta = {}) {
  // Пропускаем логирование, если находимся в тестовой среде
  if (process.env.NODE_ENV === 'test') return;
  console.debug(`[DEBUG] ${message}`, meta);
}

module.exports = {
  error,
  info,
  warn,
  debug
}; 