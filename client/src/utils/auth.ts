import { cookies } from "next/headers";
import { STORE } from "@/app/constants";
import { resolveAuthenticatedUser } from "@/utils/session";

const unauthorized = () => new Response("Unauthorized", { status: 401 });

export async function getAuthenticatedEmail(): Promise<
  { email: string } | { response: Response }
> {
  const cookieStore = await cookies();
  const token = cookieStore.get(STORE.authToken)?.value;

  if (!token) {
    return { response: unauthorized() };
  }

  const user = await resolveAuthenticatedUser(token);
  if (!user) {
    return { response: unauthorized() };
  }

  return { email: user.email };
}

export async function getAuthenticatedUser(): Promise<
  { email: string; role: string } | { response: Response }
> {
  const cookieStore = await cookies();
  const token = cookieStore.get(STORE.authToken)?.value;

  if (!token) return { response: unauthorized() };

  const user = await resolveAuthenticatedUser(token);
  if (!user) {
    return { response: unauthorized() };
  }

  return user;
}