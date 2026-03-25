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

export async function GET(_req: NextRequest, { params }: Params) {
  const result = await getAuthenticatedUser();
  if ("response" in result) return result.response;
  if (result.role !== "ADMIN") return new Response("Forbidden", { status: 403 });

  const { id } = await params;
  const upstream = await fetch(`${usersBaseUrl()}/ids/${id}`, {
    headers: await authHeader(),
  });
  const text = await upstream.text();
  return new Response(text, {
    status: upstream.status,
    headers: { "Content-Type": "application/json" },
  });
}

export async function PATCH(req: NextRequest, { params }: Params) {
  const result = await getAuthenticatedUser();
  if ("response" in result) return result.response;
  if (result.role !== "ADMIN") return new Response("Forbidden", { status: 403 });

  const { id } = await params;
  const body = await req.json();
  const upstream = await fetch(`${usersBaseUrl()}/ids/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", ...(await authHeader()) },
    body: JSON.stringify(body),
  });

  const text = await upstream.text();
  return new Response(text, {
    status: upstream.status,
    headers: { "Content-Type": "application/json" },
  });
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const result = await getAuthenticatedUser();
  if ("response" in result) return result.response;
  if (result.role !== "ADMIN") return new Response("Forbidden", { status: 403 });

  const { id } = await params;
  const upstream = await fetch(`${usersBaseUrl()}/ids/${id}`, {
    method: "DELETE",
    headers: await authHeader(),
  });

  return new Response(null, { status: upstream.status });
}
