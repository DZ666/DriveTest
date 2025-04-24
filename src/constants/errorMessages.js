const ERROR_MESSAGES = {
  INTERNAL_SERVER_ERROR: {
    code: 'INTERNAL_SERVER_ERROR',
    message: 'Внутренняя ошибка сервера',
    statusCode: 500
  },
  ROUTE_NOT_FOUND: {
    code: 'ROUTE_NOT_FOUND',
    message: 'Маршрут не найден',
    statusCode: 404
  },
  
  MISSING_REQUIRED_FIELDS: {
    code: 'MISSING_REQUIRED_FIELDS',
    message: 'Все поля обязательны (full_name, role, efficiency)',
    statusCode: 400
  },
  MISSING_FULLNAME_FIELD: {
    code: 'MISSING_FULLNAME_FIELD',
    message: 'Поле full_name обязательно',
    statusCode: 400
  },
  MISSING_ROLE_FIELD: {
    code: 'MISSING_ROLE_FIELD',
    message: 'Поле role обязательно',
    statusCode: 400
  },
  MISSING_EFFICIENCY_FIELD: {
    code: 'MISSING_EFFICIENCY_FIELD',
    message: 'Поле efficiency обязательно',
    statusCode: 400
  },
  INVALID_FULL_NAME_TYPE: {
    code: 'INVALID_FULL_NAME_TYPE',
    message: 'full_name должно быть строкой',
    statusCode: 400
  },
  INVALID_ROLE_TYPE: {
    code: 'INVALID_ROLE_TYPE',
    message: 'role должно быть строкой',
    statusCode: 400
  },
  INVALID_EFFICIENCY_TYPE: {
    code: 'INVALID_EFFICIENCY_TYPE',
    message: 'efficiency должно быть числом',
    statusCode: 400
  },
  DUPLICATE_ENTRY: {
    code: 'DUPLICATE_ENTRY',
    message: 'Запись с таким значением уже существует',
    statusCode: 409
  },
  
  USER_NOT_FOUND: {
    code: 'USER_NOT_FOUND',
    message: 'Пользователь с ID {id} не найден',
    statusCode: 404
  },
  USER_ID_REQUIRED: {
    code: 'USER_ID_REQUIRED',
    message: 'ID пользователя не указан',
    statusCode: 400
  },
  
  USER_CREATE_ERROR: {
    code: 'USER_CREATE_ERROR',
    message: 'Ошибка при создании пользователя',
    statusCode: 500
  },
  USER_UPDATE_ERROR: {
    code: 'USER_UPDATE_ERROR',
    message: 'Ошибка при обновлении пользователя',
    statusCode: 500
  },
  USER_DELETE_ERROR: {
    code: 'USER_DELETE_ERROR',
    message: 'Ошибка при удалении пользователя',
    statusCode: 500
  },
  USER_GET_ERROR: {
    code: 'USER_GET_ERROR',
    message: 'Ошибка при получении пользователей',
    statusCode: 500
  },
  
  VALIDATION_ERROR: {
    code: 'VALIDATION_ERROR',
    message: 'Ошибка валидации данных',
    statusCode: 400
  }
};

module.exports = {
  ERROR_MESSAGES
}; 