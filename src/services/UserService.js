const UserModel = require('../models/User');
const { createError } = require('../utils/errorUtils');

class UserService {
  async create(userData) {
    return await UserModel.create(userData);
  }

  async getAll(filters = {}) {
    return await UserModel.findAll(filters);
  }

  async getById(id) {
    const user = await UserModel.findById(id);
    
    if (!user) {
      throw createError(
        'USER_NOT_FOUND',
        `Пользователь с ID ${id} не найден`,
        404,
        { id }
      );
    }
    
    return user;
  }

  async update(id, userData) {
    await this.getById(id);
    
    return await UserModel.update(id, userData);
  }

  async delete(id) {
    await this.getById(id);
    
    return await UserModel.delete(id);
  }

  async deleteAll() {
    return await UserModel.deleteAll();
  }

  prepareFilters(queryFilters) {
    const filters = {};
    
    if (queryFilters.role) {
      filters.role = queryFilters.role;
    }
    
    if (queryFilters.full_name) {
      filters.full_name = queryFilters.full_name;
    }
    
    if (queryFilters.efficiency !== undefined) {
      filters.efficiency = parseInt(queryFilters.efficiency);
    }
    
    return filters;
  }
}

module.exports = new UserService(); 