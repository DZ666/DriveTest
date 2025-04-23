function validateDTO(DTOClass, source = 'body', as = 'dto') {
  return (req, _res, next) => {
    try {
      const dto = new DTOClass(req[source]);
      dto.validate();
      req[as] = dto;
      next();
    } catch (error) {
      next(error);
    }
  };
}

module.exports = validateDTO; 