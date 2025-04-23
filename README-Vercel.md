# Деплой на Vercel

Этот проект настроен для деплоя на платформе Vercel. Ниже приведены инструкции по настройке и деплою.

## Подготовка к деплою

1. Создайте аккаунт на [Vercel](https://vercel.com) если у вас его еще нет
2. Установите Vercel CLI:
   ```
   npm i -g vercel
   ```
3. Авторизуйтесь через CLI:
   ```
   vercel login
   ```

## Настройка переменных окружения

В Vercel необходимо добавить следующие переменные окружения:

1. `DATABASE_URL` - URL для подключения к базе данных MySQL или PostgreSQL
2. `PORT` - порт для запуска приложения (обычно Vercel игнорирует это значение)
3. `NODE_ENV` - значение `production` для продакшн-режима

Для настройки переменных через интерфейс Vercel:
1. Перейдите в настройки проекта
2. Откройте вкладку "Environment Variables"
3. Добавьте необходимые переменные

## Настройка базы данных

Для Vercel рекомендуется использовать одно из следующих решений:

### MySQL
- [PlanetScale](https://planetscale.com/) - MySQL-совместимая база данных
- [AWS RDS](https://aws.amazon.com/rds/mysql/)
- [DigitalOcean Managed MySQL](https://www.digitalocean.com/products/managed-databases-mysql)

### PostgreSQL
- [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres)
- [Supabase](https://supabase.com/)
- [Neon](https://neon.tech/)

При использовании PostgreSQL необходимо изменить провайдер в `prisma/schema.prisma`:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
  directUrl = env("DIRECT_URL") // для Vercel Postgres
}
```

## Деплой

### Автоматический деплой через GitHub

1. Импортируйте репозиторий в Vercel
2. Настройте переменные окружения
3. Vercel автоматически запустит сборку при пуше в репозиторий

### Ручной деплой

Для деплоя вручную через CLI:

```
vercel
```

Для деплоя в продакшн:

```
vercel --prod
```

## Проверка конфигурации

В проекте уже настроены все необходимые файлы для деплоя на Vercel:

- `vercel.json` - конфигурация для Vercel
- Скрипт `vercel-build` в `package.json`
- `@vercel/node` для запуска Node.js приложения

## Устранение неполадок

Если возникают ошибки при деплое:

1. Проверьте логи сборки в Vercel Dashboard
2. Убедитесь, что переменные окружения настроены правильно
3. Проверьте, что база данных доступна из внешней сети
4. Проверьте, что все зависимости указаны в `package.json` 