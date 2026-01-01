// lib/authClient.ts
// Handles authentication API calls

const API_BASE_URL = "http://localhost:3000";

export async function registerUser(name: string, email: string, password: string) {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  });
  if (!response.ok) {
    throw new Error("Registration failed");
  }
  return response.json();
}

export async function loginUser(email: string, password: string) {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) {
    throw new Error("Login failed");
  }
  const data = await response.json();
  if (data.access_token) {
    localStorage.setItem("access_token", data.access_token);
  }
  if (data.user) {
    localStorage.setItem("user", JSON.stringify(data.user));
  }
  return data;
}
