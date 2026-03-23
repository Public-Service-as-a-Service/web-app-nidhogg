import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { getAuthenticatedUser } from "@/utils/auth";
import { STORE } from "@/app/constants";

type Params = { params: Promise<{ id: string }> };

const usersBaseUrl = () =>
  `${process.env.API_PROXY_TARGET_USERS}/api/users`;

async function authHeader(): Promise<Record<string, string>> {
  const cookieStore = await cookies();
  const token = cookieStore.get(STORE.authToken)?.value;
  return token ? { Cookie: `${STORE.authToken}=${token}` } : {};
}

export async function PATCH(req: NextRequest, { params }: Params) {
  const result = await getAuthenticatedUser();
  if ("response" in result) return result.response;
  if (result.role !== "ADMIN") return new Response("Forbidden", { status: 403 });

  const { id } = await params;
  const password = await req.text();

  const upstream = await fetch(`${usersBaseUrl()}/ids/${id}/password`, {
    method: "PATCH",
    headers: { "Content-Type": "text/plain", ...(await authHeader()) },
    body: password,
  });

  return new Response(null, { status: upstream.status });
}
