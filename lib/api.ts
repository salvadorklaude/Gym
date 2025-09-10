export const API_URL = "http://localhost:8000/api";

// POST request (public, like register/login)
export async function post(endpoint: string, data: any) {
  const res = await fetch(`${API_URL}/${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API error: ${text}`);
  }

  return res.json();
}

// GET request with token
export async function authGet(endpoint: string, token: string) {
  const res = await fetch(`${API_URL}/${endpoint}`, {
    headers: {
      "Authorization": `Bearer ${token}`,
      "Accept": "application/json",
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API error: ${text}`);
  }

  return res.json();
}

// POST request with token
export async function authPost(endpoint: string, data: any, token: string) {
  const res = await fetch(`${API_URL}/${endpoint}`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API error: ${text}`);
  }

  return res.json();
}
