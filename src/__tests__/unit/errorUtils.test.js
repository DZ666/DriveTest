const { createError } = require('../../utils/errorUtils');
const { ERROR_MESSAGES } = require('../../constants/errorMessages');

describe('createError', () => {
  test('должен создать объект ошибки с указанными параметрами', () => {
    const errorCode = 'TEST_ERROR';
    const message = 'Тестовая ошибка';
    const statusCode = 403;
    const additionalData = { id: 123 };

    const error = createError(errorCode, message, statusCode, additionalData);

    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe(message);
    expect(error.errorCode).toBe(errorCode);
    expect(error.statusCode).toBe(statusCode);
    expect(error.additionalData).toEqual(additionalData);
  });

  test('должен использовать значения по умолчанию для statusCode и additionalData', () => {
    const errorCode = 'TEST_ERROR';
    const message = 'Тестовая ошибка';

    const error = createError(errorCode, message);

    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe(message);
    expect(error.errorCode).toBe(errorCode);
    expect(error.statusCode).toBe(400); // Значение по умолчанию
    expect(error.additionalData).toEqual({}); // Значение по умолчанию
  });

  test('должен корректно обрабатывать числовые значения в качестве errorCode', () => {
    const errorCode = 404;
    const message = 'Тестовая ошибка';

    const error = createError(errorCode, message);

    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe(message);
    expect(error.errorCode).toBe(errorCode);
    expect(error.statusCode).toBe(400);
    expect(error.additionalData).toEqual({});
  });

  test('должен работать с предопределенным сообщением об ошибке', () => {
    const errorMessage = ERROR_MESSAGES.USER_NOT_FOUND;
    const id = 42;
    const message = errorMessage.message.replace('{id}', id);

    const error = createError(
      errorMessage.code,
      message,
      errorMessage.statusCode,
      { userId: id }
    );

    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe('Пользователь с ID 42 не найден');
    expect(error.errorCode).toBe('USER_NOT_FOUND');
    expect(error.statusCode).toBe(404);
    expect(error.additionalData).toEqual({ userId: 42 });
  });

  test('должен работать с ошибкой валидации и подробными данными', () => {
    const errorMessage = ERROR_MESSAGES.VALIDATION_ERROR;
    const details = {
      field: 'email',
      issue: 'Неверный формат email'
    };

    const error = createError(
      errorMessage.code,
      errorMessage.message,
      errorMessage.statusCode,
      { validationDetails: details }
    );

    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe('Ошибка валидации данных');
    expect(error.errorCode).toBe('VALIDATION_ERROR');
    expect(error.statusCode).toBe(400);
    expect(error.additionalData).toEqual({
      validationDetails: {
        field: 'email',
        issue: 'Неверный формат email'
      }
    });
  });
}); 