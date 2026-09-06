export const DEFAULT_ADMIN_CREDENTIALS = {
  username: "123",
  password: "123"
};

const ADMIN_CREDENTIALS_KEY = "portfolio_admin_credentials";

export function getAdminCredentials() {
  if (typeof window === "undefined") {
    return DEFAULT_ADMIN_CREDENTIALS;
  }

  try {
    const stored = window.localStorage.getItem(ADMIN_CREDENTIALS_KEY);
    if (!stored) {
      return DEFAULT_ADMIN_CREDENTIALS;
    }

    return {
      ...DEFAULT_ADMIN_CREDENTIALS,
      ...JSON.parse(stored)
    };
  } catch {
    return DEFAULT_ADMIN_CREDENTIALS;
  }
}

export function saveAdminCredentials(nextCredentials) {
  const credentials = {
    ...DEFAULT_ADMIN_CREDENTIALS,
    ...nextCredentials
  };

  if (typeof window !== "undefined") {
    window.localStorage.setItem(ADMIN_CREDENTIALS_KEY, JSON.stringify(credentials));
  }

  return credentials;
}
