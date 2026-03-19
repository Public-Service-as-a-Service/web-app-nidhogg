import { cookies } from "next/headers";
import { decodeJwt } from "jose";
import { STORE } from "@/app/constants";

type AuthPayload = { sub?: string; email?: string };

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get(STORE.authToken)?.value;

  if (!token) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const payload = decodeJwt<AuthPayload>(token);
    const email = payload.email;

    if (!email || typeof email !== "string") {
      return new Response("Unauthorized", { status: 401 });
    }

    return new Response(JSON.stringify({ email }), {
      status: 200,
      headers: { "Content-type": "application/json" },
    });
  } catch {
    return new Response("Unauthorized", { status: 401 });
  }
}
