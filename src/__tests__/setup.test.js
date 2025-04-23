describe('Файл настройки', () => {
  it('должен загружаться корректно', () => {
    expect(true).toBe(true);
  });
  
  it('должен мокировать PrismaClient', () => {
    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();
    
    expect(prisma.user).toBeDefined();
    expect(typeof prisma.user.create).toBe('function');
    expect(typeof prisma.user.findMany).toBe('function');
    expect(typeof prisma.user.findUnique).toBe('function');
    expect(typeof prisma.user.update).toBe('function');
    expect(typeof prisma.user.delete).toBe('function');
    expect(typeof prisma.user.deleteMany).toBe('function');
  });
}); 