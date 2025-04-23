const { createError } = require('./errorUtils');
const logger = require('./logger');

function sendError(error, res) {
  if (error.errorCode) {
    logger.error(`Ошибка ${error.errorCode}: ${error.message}`, error.additionalData || {});
    
    return res.status(error.statusCode || 500).json({
      success: false,
      result: {
        error: error.message
      }
    });
  }
  
  logger.error(`Необработанная ошибка: ${error.message}`, { stack: error.stack });
  
  return res.status(500).json({
    success: false,
    result: {
      error: 'Внутренняя ошибка сервера'
    }
  });
}

function logError(context, error) {
  let errorMessage = context;
  let errorDetails = {};
  
  if (error) {
    errorDetails = {
      message: error.message,
      code: error.errorCode,
      statusCode: error.statusCode,
      stack: error.stack,
      additionalData: error.additionalData
    };
  }

  logger.error(errorMessage, errorDetails);
}

module.exports = {
  sendError,
  logError
}; 