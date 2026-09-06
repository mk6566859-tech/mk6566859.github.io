const baseUrl = import.meta.env.VITE_API_BASE_URL || (typeof window !== "undefined" && ["localhost", "127.0.0.1"].includes(window.location.hostname) ? "http://localhost:4000/api" : "");

export async function httpRequest(path, options = {}) {
  if (!baseUrl) {
    throw new Error("API is unavailable in the current environment.");
  }

  const response = await fetch(`${baseUrl}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    },
    ...options
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    const error = new Error(payload.message || "Request failed.");
    error.status = response.status;
    throw error;
  }

  return payload;
}
