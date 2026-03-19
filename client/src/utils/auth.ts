import { API_ENDPOINTS } from "@/app/constants";

const unauthorized = () => new Response("Unauthorized", { status: 401 });

export async function getAuthenticatedEmail(): Promise<
  { email: string } | { response: Response }
> {
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
      return { response: unauthorized() };
    }

    const payload = (await response.json()) as { email?: string };

    if (!payload.email || typeof payload.email !== "string") {
      return { response: unauthorized() };
    }

    return { email: payload.email };
  } catch {
    return { response: unauthorized() };
  }
}
