const userService = require('../services/UserService');
const { CreateUserDTO, UpdateUserDTO, GetUserParamsDTO } = require('../dto/UserDTO');
const { sendError } = require('../utils/errorHandler');
const logger = require('../utils/logger');

class UserController {
  async create(req, res) {
    try {
      const userDTO = new CreateUserDTO(req.body).validate();
      const user = await userService.create(userDTO.toObject());
      
      logger.info('Пользователь создан', { id: user.id });
      return res.status(200).json({
        success: true,
        result: {
          id: user.id
        }
      });
    } catch (error) {
      return sendError(error, res);
    }
  }

  async get(req, res) {
    try {
      if (req.params.userId) {
        const params = new GetUserParamsDTO(req.params).validate();
        const user = await userService.getById(params.id);
        
        logger.info('Получен пользователь по ID', { id: params.id });
        return res.status(200).json({
          success: true,
          result: {
            users: [user]
          }
        });
      } 
      
      const filters = userService.prepareFilters(req.query);
      const users = await userService.getAll(filters);
      
      logger.info('Получен список пользователей', { count: users.length });
      return res.status(200).json({
        success: true,
        result: {
          users: users
        }
      });
    } catch (error) {
      return sendError(error, res);
    }
  }

  async update(req, res) {
    try {
      const params = new GetUserParamsDTO(req.params).validate();
      const userDTO = new UpdateUserDTO(req.body).validate();
      const updatedUser = await userService.update(params.id, userDTO.toObject());
      
      logger.info('Пользователь обновлен', { id: params.id });
      return res.status(200).json({
        success: true,
        result: updatedUser
      });
    } catch (error) {
      return sendError(error, res);
    }
  }

  async delete(req, res) {
    try {
      if (req.params.userId) {
        const params = new GetUserParamsDTO(req.params).validate();
        const deletedUser = await userService.delete(params.id);
        
        logger.info('Пользователь удален', { id: params.id });
        return res.status(200).json({
          success: true,
          result: deletedUser
        });
      } 
      
      await userService.deleteAll();
      
      logger.info('Все пользователи удалены');
      return res.status(200).json({
        success: true
      });
    } catch (error) {
      return sendError(error, res);
    }
  }
}

module.exports = new UserController(); 