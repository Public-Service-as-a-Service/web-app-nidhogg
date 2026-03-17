import { NextRequest } from "next/server";
import { API_ENDPOINTS } from "@/app/constants";

export async function POST(req: NextRequest) {
  const credentials = await req.json();

  const upstream = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${API_ENDPOINTS.login}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(credentials),
    cache: "no-store",
  });

  const body = await upstream.text();
  const headers = new Headers();

  const contentType = upstream.headers.get("content-type");
  if (contentType) headers.set("content-type", contentType);

  const setCookie = upstream.headers.get("set-cookie");
  if (setCookie) headers.append("set-cookie", setCookie);

  return new Response(body, {
    status: upstream.status,
    headers,
  });
}