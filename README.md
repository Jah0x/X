# VPN Auth MVP

## Запуск проекта

```bash
cd backend
npm install
npx prisma generate
npm run dev
```

В другом терминале:

```bash
cd frontend
npm install
npm run dev
```

## Тесты и линт

В директории `backend`:

```bash
npm run lint
npm test
```

## Настройка окружения

Скопируйте `.env.example` в `.env` и при необходимости измените значения.
