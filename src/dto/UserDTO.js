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
        'MISSING_REQUIRED_FIELDS',
        ERROR_MESSAGES.MISSING_REQUIRED_FIELDS.message,
        400
      );
    }

    if (typeof this.full_name !== 'string') {
      throw createError(
        'INVALID_FULL_NAME_TYPE',
        ERROR_MESSAGES.INVALID_FULL_NAME_TYPE.message,
        400
      );
    }

    if (typeof this.role !== 'string') {
      throw createError(
        'INVALID_ROLE_TYPE',
        ERROR_MESSAGES.INVALID_ROLE_TYPE.message,
        400
      );
    }

    if (typeof this.efficiency !== 'number') {
      throw createError(
        'INVALID_EFFICIENCY_TYPE',
        ERROR_MESSAGES.INVALID_EFFICIENCY_TYPE.message,
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
        'INVALID_FULL_NAME_TYPE',
        ERROR_MESSAGES.INVALID_FULL_NAME_TYPE.message,
        400
      );
    }

    if (this.role !== undefined && typeof this.role !== 'string') {
      throw createError(
        'INVALID_ROLE_TYPE',
        ERROR_MESSAGES.INVALID_ROLE_TYPE.message,
        400
      );
    }

    if (this.efficiency !== undefined && typeof this.efficiency !== 'number') {
      throw createError(
        'INVALID_EFFICIENCY_TYPE',
        ERROR_MESSAGES.INVALID_EFFICIENCY_TYPE.message,
        400
      );
    }

    if (this.full_name !== undefined && this.full_name === "") {
      throw createError(
        'MISSING_REQUIRED_FIELDS',
        ERROR_MESSAGES.MISSING_FULLNAME_FIELD.message,
        400
      );
    }

    if (this.role !== undefined && this.role === "") {
      throw createError(
        'MISSING_ROLE_FIELD',
        ERROR_MESSAGES.MISSING_ROLE_FIELD.message,
        400
      );
    }

    if (this.efficiency !== undefined && this.efficiency === "") {
      throw createError(
        'MISSING_EFFICIENCY_FIELD',
        ERROR_MESSAGES.MISSING_EFFICIENCY_FIELD.message,
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
        'INVALID_ID_FORMAT',
        'ID пользователя должно быть числом',
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