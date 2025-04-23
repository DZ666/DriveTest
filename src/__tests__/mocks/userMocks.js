const mockUsers = [
  {
    id: 1,
    full_name: "Иван Иванов",
    role: "developer",
    efficiency: 85
  },
  {
    id: 2,
    full_name: "Петр Петров",
    role: "manager",
    efficiency: 75
  },
  {
    id: 3,
    full_name: "Мария Сидорова",
    role: "developer",
    efficiency: 90
  }
];

const mockUser = {
  id: 1,
  full_name: "Иван Иванов",
  role: "developer",
  efficiency: 85
};

const newUserData = {
  full_name: "Алексей Смирнов",
  role: "tester",
  efficiency: 80
};

const updatedUserData = {
  full_name: "Иван Иванов Обновленный",
  role: "senior developer",
  efficiency: 95
};

const partialUserData = {
  role: "team lead",
  efficiency: 98
};

module.exports = {
  mockUsers,
  mockUser,
  newUserData,
  updatedUserData,
  partialUserData
}; 