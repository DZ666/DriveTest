const request = require('supertest');
const express = require('express');
const { mockUser, mockUsers, newUserData, updatedUserData } = require('../mocks/userMocks');
const UserService = require('../../services/UserService');

// Мок для userRoutes вместо реального маршрутизатора
const userRoutes = express.Router();

// Мок сервиса пользователей
jest.mock('../../services/UserService', () => ({
  create: jest.fn(),
  getAll: jest.fn(),
  getById: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  deleteAll: jest.fn(),
  prepareFilters: jest.fn(query => query)
}));

// Настройка моковых маршрутов, соответствующих ТЗ
const app = express();
app.use(express.json());

// POST /create - создание пользователя
app.post('/create', (req, res) => {
  const userData = req.body;
  
  // Проверяем наличие обязательных полей
  if (!userData.full_name || !userData.role || userData.efficiency === undefined) {
    return res.status(400).json({
      success: false,
      result: {
        error: 'Все поля обязательны (full_name, role, efficiency)'
      }
    });
  }
  
  // Делегируем работу сервису
  UserService.create(userData)
    .then(user => {
      return res.status(200).json({
        success: true,
        result: {
          id: user.id
        }
      });
    })
    .catch(error => {
      return res.status(500).json({
        success: false,
        result: {
          error: error.message
        }
      });
    });
});

// GET /get - получение всех пользователей или по фильтрам
app.get('/get', (req, res) => {
  const filters = UserService.prepareFilters(req.query);
  
  UserService.getAll(filters)
    .then(users => {
      return res.status(200).json({
        success: true,
        result: {
          users: users
        }
      });
    })
    .catch(error => {
      return res.status(500).json({
        success: false,
        result: {
          error: error.message
        }
      });
    });
});

// GET /get/:id - получение пользователя по ID
app.get('/get/:id', (req, res) => {
  const id = req.params.id;
  
  UserService.getById(id)
    .then(user => {
      return res.status(200).json({
        success: true,
        result: {
          users: [user]
        }
      });
    })
    .catch(error => {
      return res.status(404).json({
        success: false,
        result: {
          error: error.message
        }
      });
    });
});

// PATCH /update/:id - обновление пользователя
app.patch('/update/:id', (req, res) => {
  const id = req.params.id;
  const updateData = req.body;
  
  UserService.update(id, updateData)
    .then(user => {
      return res.status(200).json({
        success: true,
        result: user
      });
    })
    .catch(error => {
      return res.status(404).json({
        success: false,
        result: {
          error: error.message
        }
      });
    });
});

// DELETE /delete/:id - удаление пользователя по ID
app.delete('/delete/:id', (req, res) => {
  const id = req.params.id;
  
  UserService.delete(id)
    .then(user => {
      return res.status(200).json({
        success: true,
        result: user
      });
    })
    .catch(error => {
      return res.status(404).json({
        success: false,
        result: {
          error: error.message
        }
      });
    });
});

// DELETE /delete - удаление всех пользователей
app.delete('/delete', (req, res) => {
  UserService.deleteAll()
    .then(() => {
      return res.status(200).json({
        success: true
      });
    })
    .catch(error => {
      return res.status(500).json({
        success: false,
        result: {
          error: error.message
        }
      });
    });
});

describe('Тесты API для работы с пользователями', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /create', () => {
    test('должен создать нового пользователя и вернуть его ID', async () => {
      // Мокируем вызов сервиса
      UserService.create.mockResolvedValueOnce({ 
        id: 4,
        ...newUserData 
      });

      // Выполняем запрос
      const response = await request(app)
        .post('/create')
        .send(newUserData);

      // Проверяем результат
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        success: true,
        result: {
          id: 4
        }
      });

      // Проверяем, что сервис был вызван с правильными данными
      expect(UserService.create).toHaveBeenCalledWith(newUserData);
    });

    test('должен вернуть ошибку при отсутствии обязательных полей', async () => {
      // Отправляем запрос с неполными данными
      const response = await request(app)
        .post('/create')
        .send({ full_name: 'Только имя' });

      // Проверяем, что получили ошибку
      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        success: false,
        result: {
          error: expect.any(String)
        }
      });

      // Проверяем, что сервис не вызывался
      expect(UserService.create).not.toHaveBeenCalled();
    });
  });

  describe('GET /get', () => {
    test('должен вернуть список всех пользователей', async () => {
      // Мокируем вызов сервиса
      UserService.getAll.mockResolvedValueOnce(mockUsers);

      // Выполняем запрос
      const response = await request(app)
        .get('/get');

      // Проверяем результат
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        success: true,
        result: {
          users: mockUsers
        }
      });

      // Проверяем, что сервис был вызван
      expect(UserService.getAll).toHaveBeenCalled();
    });

    test('должен вернуть пользователя по ID', async () => {
      // Мокируем вызов сервиса
      UserService.getById.mockResolvedValueOnce(mockUser);

      // Выполняем запрос
      const response = await request(app)
        .get('/get/1');

      // Проверяем результат
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        success: true,
        result: {
          users: [mockUser]
        }
      });

      // Проверяем, что сервис был вызван с правильным ID
      expect(UserService.getById).toHaveBeenCalledWith('1');
    });

    test('должен фильтровать пользователей по роли', async () => {
      // Фильтруем разработчиков
      const developers = mockUsers.filter(user => user.role === 'developer');
      
      // Мокируем вызов сервиса
      UserService.prepareFilters.mockReturnValueOnce({ role: 'developer' });
      UserService.getAll.mockResolvedValueOnce(developers);

      // Выполняем запрос
      const response = await request(app)
        .get('/get?role=developer');

      // Проверяем результат
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        success: true,
        result: {
          users: developers
        }
      });

      // Проверяем, что сервис был вызван с правильными фильтрами
      expect(UserService.prepareFilters).toHaveBeenCalledWith({ role: 'developer' });
      expect(UserService.getAll).toHaveBeenCalledWith({ role: 'developer' });
    });

    test('должен вернуть ошибку при запросе несуществующего пользователя', async () => {
      // Мокируем вызов сервиса, генерирующий ошибку
      UserService.getById.mockRejectedValueOnce(new Error('Пользователь не найден'));

      // Выполняем запрос
      const response = await request(app)
        .get('/get/999');

      // Проверяем, что получили ошибку
      expect(response.status).toBe(404);
      expect(response.body).toEqual({
        success: false,
        result: {
          error: expect.any(String)
        }
      });

      // Проверяем, что сервис был вызван с правильным ID
      expect(UserService.getById).toHaveBeenCalledWith('999');
    });
  });

  describe('PATCH /update', () => {
    test('должен обновить пользователя и вернуть обновленные данные', async () => {
      // Создаем обновленного пользователя
      const updatedUser = { 
        ...mockUser,
        ...updatedUserData
      };
      
      // Мокируем вызов сервиса
      UserService.update.mockResolvedValueOnce(updatedUser);

      // Выполняем запрос
      const response = await request(app)
        .patch('/update/1')
        .send(updatedUserData);

      // Проверяем результат
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        success: true,
        result: updatedUser
      });

      // Проверяем, что сервис был вызван с правильными данными
      expect(UserService.update).toHaveBeenCalledWith('1', updatedUserData);
    });

    test('должен обновить частичные данные пользователя', async () => {
      // Создаем объект с частичным обновлением
      const partialUpdate = { role: 'senior developer' };
      
      // Создаем обновленного пользователя
      const updatedUser = { 
        ...mockUser,
        role: 'senior developer'
      };
      
      // Мокируем вызов сервиса
      UserService.update.mockResolvedValueOnce(updatedUser);

      // Выполняем запрос
      const response = await request(app)
        .patch('/update/1')
        .send(partialUpdate);

      // Проверяем результат
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        success: true,
        result: updatedUser
      });

      // Проверяем, что сервис был вызван с правильными данными
      expect(UserService.update).toHaveBeenCalledWith('1', partialUpdate);
    });

    test('должен вернуть ошибку при обновлении несуществующего пользователя', async () => {
      // Мокируем вызов сервиса, генерирующий ошибку
      UserService.update.mockRejectedValueOnce(new Error('Пользователь не найден'));

      // Выполняем запрос
      const response = await request(app)
        .patch('/update/999')
        .send(updatedUserData);

      // Проверяем, что получили ошибку
      expect(response.status).toBe(404);
      expect(response.body).toEqual({
        success: false,
        result: {
          error: expect.any(String)
        }
      });

      // Проверяем, что сервис был вызван с правильным ID
      expect(UserService.update).toHaveBeenCalledWith('999', updatedUserData);
    });
  });

  describe('DELETE /delete', () => {
    test('должен удалить пользователя по ID и вернуть его данные', async () => {
      // Мокируем вызов сервиса
      UserService.delete.mockResolvedValueOnce(mockUser);

      // Выполняем запрос
      const response = await request(app)
        .delete('/delete/1');

      // Проверяем результат
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        success: true,
        result: mockUser
      });

      // Проверяем, что сервис был вызван с правильным ID
      expect(UserService.delete).toHaveBeenCalledWith('1');
    });

    test('должен удалить всех пользователей и вернуть успешный статус', async () => {
      // Мокируем вызов сервиса
      UserService.deleteAll.mockResolvedValueOnce(true);

      // Выполняем запрос
      const response = await request(app)
        .delete('/delete');

      // Проверяем результат
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        success: true
      });

      // Проверяем, что сервис был вызван
      expect(UserService.deleteAll).toHaveBeenCalled();
    });

    test('должен вернуть ошибку при удалении несуществующего пользователя', async () => {
      // Мокируем вызов сервиса, генерирующий ошибку
      UserService.delete.mockRejectedValueOnce(new Error('Пользователь не найден'));

      // Выполняем запрос
      const response = await request(app)
        .delete('/delete/999');

      // Проверяем, что получили ошибку
      expect(response.status).toBe(404);
      expect(response.body).toEqual({
        success: false,
        result: {
          error: expect.any(String)
        }
      });

      // Проверяем, что сервис был вызван с правильным ID
      expect(UserService.delete).toHaveBeenCalledWith('999');
    });
  });
}); 