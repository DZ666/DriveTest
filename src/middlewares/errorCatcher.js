const { sendError, logError } = require('../utils/errorHandler');
const { createError } = require('../utils/errorUtils');

const errorCatcher = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (error) {
    logError(`middleware errorCatcher: ${fn.name || 'неизвестный обработчик'}`, error);
    
    if (res.headersSent) {
      return next(error);
    }
    
    if (error.errorCode) {
      return sendError(error, res);
    }

    if (error.code === 'P2025') {
      const notFoundError = createError(
        'USER_NOT_FOUND',
        `Пользователь с ID ${req.params.id || 'unknown'} не найден`,
        404,
        { id: req.params.id || 'unknown' }
      );
      return sendError(notFoundError, res);
    } else if (error.code === 'P2002') {
      const duplicateError = createError(
        'DUPLICATE_ENTRY',
        'Запись с таким значением уже существует',
        409
      );
      return sendError(duplicateError, res);
    } else if (error.code === 'P2000') {
      const invalidDataError = createError(
        'INVALID_DATA_TYPES',
        'Неверный тип данных',
        400
      );
      return sendError(invalidDataError, res);
    }
    
    const internalError = createError(
      'INTERNAL_SERVER_ERROR',
      error.message || 'Внутренняя ошибка сервера',
      500
    );
    return sendError(internalError, res);
  }
};

module.exports = errorCatcher; 