const UserService = require('../../services/UserService');
const UserModel = require('../../models/User');
const { mockUser, mockUsers, newUserData, updatedUserData } = require('../mocks/userMocks');

jest.mock('../../models/User', () => ({
  create: jest.fn(),
  findAll: jest.fn(),
  findById: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  deleteAll: jest.fn()
}));

describe('Сервис пользователей', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    test('должен создать нового пользователя', async () => {
      UserModel.create.mockResolvedValueOnce({ id: 1, ...newUserData });

      const result = await UserService.create(newUserData);

      expect(result).toEqual({ id: 1, ...newUserData });
      expect(UserModel.create).toHaveBeenCalledWith(newUserData);
    });

    test('должен пробрасывать ошибки из модели', async () => {
      UserModel.create.mockRejectedValueOnce(new Error('Ошибка создания пользователя'));

      await expect(UserService.create(newUserData)).rejects.toThrow('Ошибка создания пользователя');
    });
  });

  describe('getAll', () => {
    test('должен получать всех пользователей', async () => {
      UserModel.findAll.mockResolvedValueOnce(mockUsers);

      const result = await UserService.getAll();

      expect(result).toEqual(mockUsers);
      expect(UserModel.findAll).toHaveBeenCalledWith({});
    });

    test('должен получать пользователей с фильтрами', async () => {
      const filters = { role: 'developer' };
      const filteredUsers = mockUsers.filter(user => user.role === 'developer');
      
      UserModel.findAll.mockResolvedValueOnce(filteredUsers);

      const result = await UserService.getAll(filters);

      expect(result).toEqual(filteredUsers);
      expect(UserModel.findAll).toHaveBeenCalledWith(filters);
    });

    test('должен пробрасывать ошибки из модели', async () => {
      UserModel.findAll.mockRejectedValueOnce(new Error('Ошибка получения пользователей'));

      await expect(UserService.getAll()).rejects.toThrow('Ошибка получения пользователей');
    });
  });

  describe('getById', () => {
    test('должен получать пользователя по ID', async () => {
      UserModel.findById.mockResolvedValueOnce(mockUser);

      const result = await UserService.getById(1);

      expect(result).toEqual(mockUser);
      expect(UserModel.findById).toHaveBeenCalledWith(1);
    });

    test('должен выбрасывать ошибку, если пользователь не найден', async () => {
      UserModel.findById.mockResolvedValueOnce(null);

      try {
        await UserService.getById(999);
        fail('Должно выбрасывать ошибку');
      } catch (error) {
        expect(error.errorCode).toBe('USER_NOT_FOUND');
        expect(error.statusCode).toBe(404);
        expect(error.additionalData).toEqual({ id: 999 });
      }
    });

    test('должен пробрасывать ошибки из модели', async () => {
      UserModel.findById.mockRejectedValueOnce(new Error('Ошибка поиска пользователя'));

      await expect(UserService.getById(1)).rejects.toThrow('Ошибка поиска пользователя');
    });
  });

  describe('update', () => {
    test('должен обновлять пользователя', async () => {
      UserModel.findById.mockResolvedValueOnce(mockUser);
      UserModel.update.mockResolvedValueOnce({ ...mockUser, ...updatedUserData });

      const result = await UserService.update(1, updatedUserData);

      expect(result).toEqual({ ...mockUser, ...updatedUserData });
      expect(UserModel.findById).toHaveBeenCalledWith(1);
      expect(UserModel.update).toHaveBeenCalledWith(1, updatedUserData);
    });

    test('должен выбрасывать ошибку, если пользователь не найден', async () => {
      UserModel.findById.mockResolvedValueOnce(null);

      try {
        await UserService.update(999, updatedUserData);
        fail('Должно выбрасывать ошибку');
      } catch (error) {
        expect(error.errorCode).toBe('USER_NOT_FOUND');
        expect(UserModel.update).not.toHaveBeenCalled();
      }
    });

    test('должен пробрасывать ошибки из модели при проверке пользователя', async () => {
      UserModel.findById.mockRejectedValueOnce(new Error('Ошибка поиска пользователя'));

      await expect(UserService.update(1, updatedUserData)).rejects.toThrow('Ошибка поиска пользователя');
      expect(UserModel.update).not.toHaveBeenCalled();
    });

    test('должен пробрасывать ошибки из модели при обновлении', async () => {
      UserModel.findById.mockResolvedValueOnce(mockUser);
      UserModel.update.mockRejectedValueOnce(new Error('Ошибка обновления пользователя'));

      await expect(UserService.update(1, updatedUserData)).rejects.toThrow('Ошибка обновления пользователя');
    });
  });

  describe('delete', () => {
    test('должен удалять пользователя по ID', async () => {
      UserModel.findById.mockResolvedValueOnce(mockUser);
      UserModel.delete.mockResolvedValueOnce(mockUser);

      const result = await UserService.delete(1);

      expect(result).toEqual(mockUser);
      expect(UserModel.findById).toHaveBeenCalledWith(1);
      expect(UserModel.delete).toHaveBeenCalledWith(1);
    });

    test('должен выбрасывать ошибку, если пользователь не найден', async () => {
      UserModel.findById.mockResolvedValueOnce(null);

      try {
        await UserService.delete(999);
        fail('Должно выбрасывать ошибку');
      } catch (error) {
        expect(error.errorCode).toBe('USER_NOT_FOUND');
        expect(UserModel.delete).not.toHaveBeenCalled();
      }
    });

    test('должен пробрасывать ошибки из модели', async () => {
      UserModel.findById.mockResolvedValueOnce(mockUser);
      UserModel.delete.mockRejectedValueOnce(new Error('Ошибка удаления пользователя'));

      await expect(UserService.delete(1)).rejects.toThrow('Ошибка удаления пользователя');
    });
  });

  describe('deleteAll', () => {
    test('должен удалять всех пользователей', async () => {
      UserModel.deleteAll.mockResolvedValueOnce(true);

      const result = await UserService.deleteAll();

      expect(result).toBe(true);
      expect(UserModel.deleteAll).toHaveBeenCalled();
    });

    test('должен пробрасывать ошибки из модели', async () => {
      UserModel.deleteAll.mockRejectedValueOnce(new Error('Ошибка удаления пользователей'));

      await expect(UserService.deleteAll()).rejects.toThrow('Ошибка удаления пользователей');
    });
  });

  describe('prepareFilters', () => {
    test('должен подготавливать фильтры для роли', () => {
      const query = { role: 'developer' };
      const result = UserService.prepareFilters(query);
      expect(result).toEqual({ role: 'developer' });
    });

    test('должен подготавливать фильтры для полного имени', () => {
      const query = { full_name: 'Иван' };
      const result = UserService.prepareFilters(query);
      expect(result).toEqual({ full_name: 'Иван' });
    });

    test('должен подготавливать фильтры для эффективности', () => {
      const query = { efficiency: '85' };
      const result = UserService.prepareFilters(query);
      expect(result).toEqual({ efficiency: 85 });
    });

    test('должен подготавливать комбинированные фильтры', () => {
      const query = { role: 'developer', efficiency: '85' };
      const result = UserService.prepareFilters(query);
      expect(result).toEqual({ role: 'developer', efficiency: 85 });
    });

    test('должен возвращать пустой объект для пустого запроса', () => {
      const result = UserService.prepareFilters({});
      expect(result).toEqual({});
    });
  });
}); 