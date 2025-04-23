const { logError } = require('../utils/errorHandler');
const { prisma } = require('../utils/dbInitializer');

class UserModel {
  async create(userData) {
    try {
      return await prisma.user.create({
        data: userData
      });
    } catch (error) {
      logError('Ошибка модели при создании пользователя', error);
      throw error;
    }
  }

  async findAll(filters = {}) {
    try {
      return await prisma.user.findMany({
        where: filters
      });
    } catch (error) {
      logError('Ошибка модели при получении пользователей', error);
      throw error;
    }
  }

  async findById(id) {
    try {
      return await prisma.user.findUnique({
        where: { id: Number(id) }
      });
    } catch (error) {
      logError(`Ошибка модели при получении пользователя с id ${id}`, error);
      throw error;
    }
  }

  async update(id, userData) {
    try {
      return await prisma.user.update({
        where: { id: Number(id) },
        data: userData
      });
    } catch (error) {
      logError(`Ошибка модели при обновлении пользователя с id ${id}`, error);
      throw error;
    }
  }

  async delete(id) {
    try {
      return await prisma.user.delete({
        where: { id: Number(id) }
      });
    } catch (error) {
      logError(`Ошибка модели при удалении пользователя с id ${id}`, error);
      throw error;
    }
  }

  async deleteAll() {
    try {
      await prisma.user.deleteMany({});
      return true;
    } catch (error) {
      logError('Ошибка модели при удалении всех пользователей', error);
      throw error;
    }
  }
}

module.exports = new UserModel(); 