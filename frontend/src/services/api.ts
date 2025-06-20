export interface AuthResponse {
  uid: string;
  subscriptionEnd: string;
}

export async function auth(
  email: string,
  telegramId: string,
): Promise<AuthResponse> {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, telegramId }),
  });
  if (!res.ok) {
    throw new Error("Auth failed");
  }
  return res.json();
}
