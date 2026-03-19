import { API_ENDPOINTS } from "@/app/constants";

export type AuthenticatedEmailResult =
  | { ok: true; email: string }
  | { ok: false; error: "unauthorized" };

export async function getAuthenticatedEmail(): Promise<AuthenticatedEmailResult> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}${API_ENDPOINTS.email}`,
      {
        method: "GET",
        credentials: "include",
        cache: "no-store",
      },
    );

    if (!response.ok) {
      return { ok: false, error: "unauthorized" };
    }

    const payload = (await response.json()) as { email?: string };

    if (!payload.email || typeof payload.email !== "string") {
      return { ok: false, error: "unauthorized" };
    }

    return { ok: true, email: payload.email };
  } catch {
    return { ok: false, error: "unauthorized" };
  }
}
