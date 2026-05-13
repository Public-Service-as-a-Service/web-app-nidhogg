import { decodeJwt } from "jose";

type AuthUser = { email: string; role: string };

type AuthPayload = {
  email?: string;
  role?: string;
  exp?: number;
};

export async function resolveAuthenticatedUser(
  token: string,
): Promise<AuthUser | null> {
  try {
    const payload = decodeJwt<AuthPayload>(token);

    if (typeof payload.email !== "string") {
      return null;
    }

    if (typeof payload.exp === "number") {
      const inSeconds = Math.floor(Date.now() / 1000);
      if (payload.exp <= inSeconds) {
        return null;
      }
    }

    if (payload.role != null && typeof payload.role !== "string") {
      return null;
    }

    return { email: payload.email, role: payload.role ?? "USER" };
  } catch {
    return null;
  }
}
