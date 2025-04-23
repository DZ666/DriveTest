function createError(errorCode, message, statusCode = 400, additionalData = {}) {
  const error = new Error(message);
  error.errorCode = errorCode;
  error.statusCode = statusCode;
  error.additionalData = additionalData;
  return error;
}

module.exports = {
  createError
}; 