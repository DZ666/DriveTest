const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const errorCatcher = require('../middlewares/errorCatcher');
const validateDTO = require('../middlewares/validateDTO');
const { CreateUserDTO, UpdateUserDTO, GetUserParamsDTO } = require('../dto/UserDTO');

router.post(
  '/create',
  validateDTO(CreateUserDTO),
  errorCatcher(UserController.create)
);

router.get(
  '/get',
  errorCatcher(UserController.get)
);

router.get(
  '/get/:userId',
  validateDTO(GetUserParamsDTO, 'params', 'paramsDTO'),
  errorCatcher(UserController.get)
);

router.patch(
  '/update/:userId',
  validateDTO(GetUserParamsDTO, 'params', 'paramsDTO'),
  validateDTO(UpdateUserDTO),
  errorCatcher(UserController.update)
);

router.delete(
  '/delete/:userId',
  validateDTO(GetUserParamsDTO, 'params', 'paramsDTO'),
  errorCatcher(UserController.delete)
);

router.delete(
  '/delete',
  errorCatcher(UserController.delete)
);

module.exports = router; 