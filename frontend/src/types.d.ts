export interface TelegramWebAppData {
  user?: { id?: number };
}

export interface TelegramWindow {
  Telegram?: { WebApp?: TelegramWebAppData };
}
