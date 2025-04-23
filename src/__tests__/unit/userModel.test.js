const { PrismaClient } = require('@prisma/client');
const UserModel = require('../../models/User');
const { mockUser, mockUsers, newUserData } = require('../mocks/userMocks');

// Получаем mock-экземпляр Prisma
const prisma = new PrismaClient();
const mockPrismaUser = prisma.user;

describe('Модель пользователя', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    test('должен создавать нового пользователя', async () => {
      // Задаем поведение mock-объекта
      mockPrismaUser.create.mockResolvedValueOnce({ id: 1, ...newUserData });

      // Вызываем тестируемый метод
      const result = await UserModel.create(newUserData);

      // Проверяем результат
      expect(result).toEqual({ id: 1, ...newUserData });
      expect(mockPrismaUser.create).toHaveBeenCalledWith({
        data: newUserData
      });
    });

    test('должен обрабатывать ошибки при создании', async () => {
      // Задаем поведение mock-объекта для имитации ошибки
      mockPrismaUser.create.mockRejectedValueOnce(new Error('Ошибка базы данных'));

      // Проверяем, что ошибка правильно передается дальше
      await expect(UserModel.create(newUserData)).rejects.toThrow('Ошибка базы данных');
    });
  });

  describe('findAll', () => {
    test('должен получать всех пользователей', async () => {
      // Задаем поведение mock-объекта
      mockPrismaUser.findMany.mockResolvedValueOnce(mockUsers);

      // Вызываем тестируемый метод
      const result = await UserModel.findAll();

      // Проверяем результат
      expect(result).toEqual(mockUsers);
      expect(mockPrismaUser.findMany).toHaveBeenCalledWith({
        where: {}
      });
    });

    test('должен получать пользователей с фильтром', async () => {
      const filters = { role: 'developer' };
      const filteredUsers = mockUsers.filter(user => user.role === 'developer');
      
      // Задаем поведение mock-объекта
      mockPrismaUser.findMany.mockResolvedValueOnce(filteredUsers);

      // Вызываем тестируемый метод
      const result = await UserModel.findAll(filters);

      // Проверяем результат
      expect(result).toEqual(filteredUsers);
      expect(mockPrismaUser.findMany).toHaveBeenCalledWith({
        where: filters
      });
    });

    test('должен обрабатывать ошибки при получении пользователей', async () => {
      // Задаем поведение mock-объекта для имитации ошибки
      mockPrismaUser.findMany.mockRejectedValueOnce(new Error('Ошибка базы данных'));

      // Проверяем, что ошибка правильно передается дальше
      await expect(UserModel.findAll()).rejects.toThrow('Ошибка базы данных');
    });
  });

  describe('findById', () => {
    test('должен получать пользователя по ID', async () => {
      // Задаем поведение mock-объекта
      mockPrismaUser.findUnique.mockResolvedValueOnce(mockUser);

      // Вызываем тестируемый метод
      const result = await UserModel.findById(1);

      // Проверяем результат
      expect(result).toEqual(mockUser);
      expect(mockPrismaUser.findUnique).toHaveBeenCalledWith({
        where: { id: 1 }
      });
    });

    test('должен возвращать null если пользователь не найден', async () => {
      // Задаем поведение mock-объекта
      mockPrismaUser.findUnique.mockResolvedValueOnce(null);

      // Вызываем тестируемый метод
      const result = await UserModel.findById(999);

      // Проверяем результат
      expect(result).toBeNull();
      expect(mockPrismaUser.findUnique).toHaveBeenCalledWith({
        where: { id: 999 }
      });
    });

    test('должен обрабатывать ошибки при поиске пользователя', async () => {
      // Задаем поведение mock-объекта для имитации ошибки
      mockPrismaUser.findUnique.mockRejectedValueOnce(new Error('Ошибка базы данных'));

      // Проверяем, что ошибка правильно передается дальше
      await expect(UserModel.findById(1)).rejects.toThrow('Ошибка базы данных');
    });
  });

  describe('update', () => {
    test('должен обновлять пользователя', async () => {
      const updatedUser = { ...mockUser, full_name: 'Новое имя' };
      const updateData = { full_name: 'Новое имя' };
      
      // Задаем поведение mock-объекта
      mockPrismaUser.update.mockResolvedValueOnce(updatedUser);

      // Вызываем тестируемый метод
      const result = await UserModel.update(1, updateData);

      // Проверяем результат
      expect(result).toEqual(updatedUser);
      expect(mockPrismaUser.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: updateData
      });
    });

    test('должен обрабатывать ошибки при обновлении пользователя', async () => {
      const updateData = { full_name: 'Новое имя' };
      
      // Задаем поведение mock-объекта для имитации ошибки
      mockPrismaUser.update.mockRejectedValueOnce(new Error('Ошибка базы данных'));

      // Проверяем, что ошибка правильно передается дальше
      await expect(UserModel.update(1, updateData)).rejects.toThrow('Ошибка базы данных');
    });
  });

  describe('delete', () => {
    test('должен удалять пользователя', async () => {
      // Задаем поведение mock-объекта
      mockPrismaUser.delete.mockResolvedValueOnce(mockUser);

      // Вызываем тестируемый метод
      const result = await UserModel.delete(1);

      // Проверяем результат
      expect(result).toEqual(mockUser);
      expect(mockPrismaUser.delete).toHaveBeenCalledWith({
        where: { id: 1 }
      });
    });

    test('должен обрабатывать ошибки при удалении пользователя', async () => {
      // Задаем поведение mock-объекта для имитации ошибки
      mockPrismaUser.delete.mockRejectedValueOnce(new Error('Ошибка базы данных'));

      // Проверяем, что ошибка правильно передается дальше
      await expect(UserModel.delete(1)).rejects.toThrow('Ошибка базы данных');
    });
  });

  describe('deleteAll', () => {
    test('должен удалять всех пользователей', async () => {
      // Задаем поведение mock-объекта
      mockPrismaUser.deleteMany.mockResolvedValueOnce({ count: 3 });

      // Вызываем тестируемый метод
      const result = await UserModel.deleteAll();

      // Проверяем результат
      expect(result).toBe(true);
      expect(mockPrismaUser.deleteMany).toHaveBeenCalledWith({});
    });

    test('должен обрабатывать ошибки при удалении всех пользователей', async () => {
      // Задаем поведение mock-объекта для имитации ошибки
      mockPrismaUser.deleteMany.mockRejectedValueOnce(new Error('Ошибка базы данных'));

      // Проверяем, что ошибка правильно передается дальше
      await expect(UserModel.deleteAll()).rejects.toThrow('Ошибка базы данных');
    });
  });
}); 