const { 
  mockUsers, 
  mockUser, 
  newUserData, 
  updatedUserData, 
  partialUserData 
} = require('./userMocks');

describe('Моковые данные пользователей', () => {
  it('должен иметь валидный массив моковых пользователей', () => {
    expect(Array.isArray(mockUsers)).toBe(true);
    expect(mockUsers.length).toBeGreaterThan(0);
    
    mockUsers.forEach(user => {
      expect(user).toHaveProperty('id');
      expect(user).toHaveProperty('full_name');
      expect(user).toHaveProperty('role');
      expect(user).toHaveProperty('efficiency');
      
      expect(typeof user.id).toBe('number');
      expect(typeof user.full_name).toBe('string');
      expect(typeof user.role).toBe('string');
      expect(typeof user.efficiency).toBe('number');
    });
  });
  
  it('должен иметь валидный объект мокового пользователя', () => {
    expect(mockUser).toHaveProperty('id');
    expect(mockUser).toHaveProperty('full_name');
    expect(mockUser).toHaveProperty('role');
    expect(mockUser).toHaveProperty('efficiency');
    
    expect(typeof mockUser.id).toBe('number');
    expect(typeof mockUser.full_name).toBe('string');
    expect(typeof mockUser.role).toBe('string');
    expect(typeof mockUser.efficiency).toBe('number');
  });
  
  it('должен иметь валидные данные для нового пользователя', () => {
    expect(newUserData).toHaveProperty('full_name');
    expect(newUserData).toHaveProperty('role');
    expect(newUserData).toHaveProperty('efficiency');
    
    expect(typeof newUserData.full_name).toBe('string');
    expect(typeof newUserData.role).toBe('string');
    expect(typeof newUserData.efficiency).toBe('number');
  });
  
  it('должен иметь валидные данные для обновленного пользователя', () => {
    expect(updatedUserData).toHaveProperty('full_name');
    expect(updatedUserData).toHaveProperty('role');
    expect(updatedUserData).toHaveProperty('efficiency');
    
    expect(typeof updatedUserData.full_name).toBe('string');
    expect(typeof updatedUserData.role).toBe('string');
    expect(typeof updatedUserData.efficiency).toBe('number');
  });
  
  it('должен иметь валидные частичные данные пользователя', () => {
    expect(partialUserData).toHaveProperty('role');
    expect(partialUserData).toHaveProperty('efficiency');
    
    expect(typeof partialUserData.role).toBe('string');
    expect(typeof partialUserData.efficiency).toBe('number');
  });
}); 