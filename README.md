# Микросервис для работы с пользователями RULYOU

Микросервис для управления пользователями с использованием Node.js, Express и Prisma ORM. Предоставляет RESTful API с форматированными ответами для создания, получения, обновления и удаления пользователей.

## Функциональность

Сервис предоставляет RESTful API для выполнения CRUD операций над пользователями:
- Создание пользователя
- Получение пользователя(ей) с возможностью фильтрации
- Обновление пользователя
- Удаление пользователя(ей)

## Технический стек

- Node.js
- Express
- Prisma ORM
- MySQL
- Jest (для тестирования)

## Установка и запуск

1. Клонировать репозиторий
2. Установить зависимости:
   ```
   npm install
   ```
3. Создать файл `.env` в корне проекта со следующим содержимым:
   ```
   PORT=3000
   DATABASE_URL="mysql://user:password@localhost:3306/database_name"
   ```
4. Сгенерировать Prisma клиент:
   ```
   npx prisma generate
   ```
5. Запустить сервер:
   ```
   npm start
   ```
   Для разработки:
   ```
   npm run dev
   ```

## API Endpoints

### Создание пользователя
**POST /api/users**

Запрос:
```json
{
  "full_name": "Иван Иванов",
  "role": "developer",
  "efficiency": 85
}
```

Ответ (успех):
```json
{
  "success": true,
  "result": {
    "id": 1
  }
}
```

Ответ (ошибка):
```json
{
  "success": false,
  "result": {
    "error": "Все поля обязательны (full_name, role, efficiency)"
  }
}
```

### Получение пользователей

**GET /api/users** - получить всех пользователей

Ответ:
```json
{
  "success": true,
  "result": {
    "users": [
      {
        "id": 1,
        "full_name": "Иван Иванов",
        "role": "developer",
        "efficiency": 85
      },
      {
        "id": 2,
        "full_name": "Петр Петров",
        "role": "manager",
        "efficiency": 75
      }
    ]
  }
}
```

**GET /api/users?role=developer** - получить пользователей с фильтром

Ответ:
```json
{
  "success": true,
  "result": {
    "users": [
      {
        "id": 1,
        "full_name": "Иван Иванов",
        "role": "developer",
        "efficiency": 85
      }
    ]
  }
}
```

**GET /api/users/1** - получить пользователя по ID

Ответ:
```json
{
  "success": true,
  "result": {
    "users": [
      {
        "id": 1,
        "full_name": "Иван Иванов",
        "role": "developer",
        "efficiency": 85
      }
    ]
  }
}
```

### Обновление пользователя

**PATCH /api/users/1**

Запрос:
```json
{
  "full_name": "Иван Иванов Обновленный",
  "role": "senior developer"
}
```

Ответ:
```json
{
  "success": true,
  "result": {
    "id": 1,
    "full_name": "Иван Иванов Обновленный",
    "role": "senior developer",
    "efficiency": 85
  }
}
```

### Удаление пользователя

**DELETE /api/users/1** - удалить пользователя по ID

Ответ:
```json
{
  "success": true,
  "result": {
    "id": 1,
    "full_name": "Иван Иванов",
    "role": "developer",
    "efficiency": 85
  }
}
```

**DELETE /api/users** - удалить всех пользователей

Ответ:
```json
{
  "success": true
}
```

## Инициализация базы данных

При запуске приложения автоматически проверяется подключение к базе данных и наличие необходимых таблиц. Если таблицы отсутствуют, они будут созданы автоматически.

## Тестирование

Для запуска тестов используйте команду:
```bash
npm run test
```

Для запуска только интеграционных тестов:
```bash
npm run test -- src/__tests__/integration/userController.test.js
``` 