function validateUserInput(userData) {
  const errors = [];
  
  if (!userData.name) {
    errors.push({ 
      field: 'name', 
      message: 'Имя пользователя обязательно' 
    });
  } else {
    if (userData.name.length < 2) {
      errors.push({ 
        field: 'name', 
        message: 'Имя должно содержать не менее 2 символов' 
      });
    }
    if (userData.name.length > 100) {
      errors.push({ 
        field: 'name', 
        message: 'Имя должно содержать не более 100 символов' 
      });
    }
  }
  
  if (!userData.email) {
    errors.push({ 
      field: 'email', 
      message: 'Email обязателен' 
    });
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.email)) {
      errors.push({ 
        field: 'email', 
        message: 'Неверный формат email' 
      });
    }
  }
  
  if (userData.age !== undefined) {
    if (typeof userData.age !== 'number') {
      errors.push({ 
        field: 'age', 
        message: 'Возраст должен быть числом' 
      });
    } else {
      if (userData.age < 18) {
        errors.push({ 
          field: 'age', 
          message: 'Возраст должен быть не меньше 18 лет' 
        });
      }
      if (userData.age > 100) {
        errors.push({ 
          field: 'age', 
          message: 'Возраст должен быть не больше 100 лет' 
        });
      }
    }
  }
  
  return errors;
}

module.exports = {
  validateUserInput
}; 