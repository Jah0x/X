import { useState } from "react";
import { auth } from "../services/api";
import type { TelegramWindow } from "../types";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [result, setResult] = useState<{
    uid: string;
    subscriptionEnd: string;
  } | null>(null);
  const telegram = (window as TelegramWindow).Telegram;
  const telegramId = telegram?.WebApp?.user?.id?.toString() || "";

  const handleSubmit = async () => {
    try {
      const data = await auth(email, telegramId);
      setResult(data);
    } catch (e) {
      console.error(e);
      alert("Error");
    }
  };

  return (
    <div className="p-4 space-y-4">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2"
        placeholder="Email"
      />
      <button
        type="button"
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2"
      >
        Отправить
      </button>
      {result && (
        <div>
          <p>UID: {result.uid}</p>
          <p>
            Подписка до: {new Date(result.subscriptionEnd).toLocaleDateString()}
          </p>
          <button
            type="button"
            className="underline"
            onClick={() => navigator.clipboard.writeText(result.uid)}
          >
            Скопировать UID
          </button>
        </div>
      )}
    </div>
  );
}
