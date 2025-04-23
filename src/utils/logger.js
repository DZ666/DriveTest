function error(message, meta = {}) {
  console.error(`[ERROR] ${message}`, meta);
}

function info(message, meta = {}) {
  console.info(`[INFO] ${message}`, meta);
}

function warn(message, meta = {}) {
  console.warn(`[WARN] ${message}`, meta);
}

function debug(message, meta = {}) {
  console.debug(`[DEBUG] ${message}`, meta);
}

module.exports = {
  error,
  info,
  warn,
  debug
}; 