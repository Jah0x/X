
# VPN Auth Mini-App

Этот репозиторий содержит бэкенд и фронтенд для Telegram мини‑приложения авторизации.

## Быстрый старт

### 1. Настройка окружения
1. Установите PostgreSQL и создайте базу `vpn`.
2. Скопируйте `.env.example` в `.env` и при необходимости отредактируйте значения `DATABASE_URL`, `PORT`, `VITE_API_URL`.
3. В директории `backend` выполните миграцию:
   ```bash
   npm install
   npx prisma migrate dev --name init
   ```

### 2. Запуск серверной части
```bash
cd backend
npm run dev
```

### 3. Запуск фронтенда
В новом терминале:

# VPN Auth MVP

## Запуск проекта

```bash
cd backend
npm install
npx prisma generate
npm run dev
```

В другом терминале:

>>>>>>> main
```bash
cd frontend
npm install
npm run dev
```


Приложение будет доступно по адресу, указанному в `VITE_API_URL`.

## Интеграция с Telegram ботом
1. Создайте бота через `@BotFather` и укажите домен мини‑приложения `https://zerologsvpn.com` в параметре **Web App**.
2. В коде бота отправьте пользователю ссылку вида `https://zerologsvpn.com` при выполнении команды `/start`. Нажатие по ссылке откроет мини‑приложение.

## Тесты и линт
Для проверки кода выполните в директории `backend`:
=======
## Тесты и линт

В директории `backend`:

>>>>>>> main
```bash
npm run lint
npm test
```


## Настройка окружения

Скопируйте `.env.example` в `.env` и при необходимости измените значения.
>>>>>>> main
