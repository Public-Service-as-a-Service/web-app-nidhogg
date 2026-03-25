import { cookies } from "next/headers";
import { decodeJwt } from "jose";
import { STORE } from "@/app/constants";

type AuthPayload = { sub?: string; email?: string; role?: string };

const unauthorized = () => new Response("Unauthorized", { status: 401 });

export async function getAuthenticatedEmail(): Promise<
  { email: string } | { response: Response }
> {
  const cookieStore = await cookies();
  const token = cookieStore.get(STORE.authToken)?.value;

  if (!token) {
    return { response: unauthorized() };
  }

  try {
    const payload = decodeJwt<AuthPayload>(token);
    const email = payload.email;

    if (!email || typeof email !== "string") {
      return { response: unauthorized() };
    }
    return { email };
  } catch {
    return { response: unauthorized() };
  }
}

export async function getAuthenticatedUser(): Promise<
  { email: string; role: string } | { response: Response }
> {
  const cookieStore = await cookies();
  const token = cookieStore.get(STORE.authToken)?.value;

  if (!token) return { response: unauthorized() };

  try {
    const payload = decodeJwt<AuthPayload>(token);
    const email = payload.email;

    if (!email || typeof email !== "string") {
      return { response: unauthorized() };
    }
    return { email, role: payload.role ?? "USER" };
  } catch {
    return { response: unauthorized() };
  }
}