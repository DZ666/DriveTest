const { createError } = require('../utils/errorUtils');
const { ERROR_MESSAGES } = require('../constants/errorMessages');

class CreateUserDTO {
  constructor(data) {
    this.full_name = data.full_name;
    this.role = data.role;
    this.efficiency = data.efficiency;
  }

  validate() {
    if (!this.full_name || !this.role || this.efficiency === undefined) {
      throw createError(
        ERROR_MESSAGES.MISSING_REQUIRED_FIELDS,
        'MISSING_REQUIRED_FIELDS',
        400
      );
    }

    if (typeof this.full_name !== 'string') {
      throw createError(
        ERROR_MESSAGES.INVALID_FULL_NAME_TYPE,
        'INVALID_FULL_NAME_TYPE',
        400
      );
    }

    if (typeof this.role !== 'string') {
      throw createError(
        ERROR_MESSAGES.INVALID_ROLE_TYPE,
        'INVALID_ROLE_TYPE',
        400
      );
    }

    if (typeof this.efficiency !== 'number') {
      throw createError(
        ERROR_MESSAGES.INVALID_EFFICIENCY_TYPE,
        'INVALID_EFFICIENCY_TYPE',
        400
      );
    }

    return this;
  }

  toObject() {
    return {
      full_name: this.full_name,
      role: this.role,
      efficiency: this.efficiency
    };
  }
}

class UpdateUserDTO {
  constructor(data) {
    if (data.full_name !== undefined) {
      this.full_name = data.full_name;
    }
    
    if (data.role !== undefined) {
      this.role = data.role;
    }
    
    if (data.efficiency !== undefined) {
      this.efficiency = data.efficiency;
    }
  }

  validate() {
    if (this.full_name !== undefined && typeof this.full_name !== 'string') {
      throw createError(
        ERROR_MESSAGES.INVALID_FULL_NAME_TYPE,
        'INVALID_FULL_NAME_TYPE',
        400
      );
    }

    if (this.role !== undefined && typeof this.role !== 'string') {
      throw createError(
        ERROR_MESSAGES.INVALID_ROLE_TYPE,
        'INVALID_ROLE_TYPE',
        400
      );
    }

    if (this.efficiency !== undefined && typeof this.efficiency !== 'number') {
      throw createError(
        ERROR_MESSAGES.INVALID_EFFICIENCY_TYPE,
        'INVALID_EFFICIENCY_TYPE',
        400
      );
    }

    return this;
  }

  toObject() {
    const result = {};
    
    if (this.full_name !== undefined) {
      result.full_name = this.full_name;
    }
    
    if (this.role !== undefined) {
      result.role = this.role;
    }
    
    if (this.efficiency !== undefined) {
      result.efficiency = this.efficiency;
    }
    
    return result;
  }
}

class GetUserParamsDTO {
  constructor(params) {
    if (params.userId) {
      this.id = Number(params.userId);
    }
  }

  validate() {
    if (this.id !== undefined && isNaN(this.id)) {
      throw createError(
        'ID пользователя должно быть числом',
        'INVALID_ID_FORMAT',
        400
      );
    }

    return this;
  }
}

module.exports = {
  CreateUserDTO,
  UpdateUserDTO,
  GetUserParamsDTO
}; 