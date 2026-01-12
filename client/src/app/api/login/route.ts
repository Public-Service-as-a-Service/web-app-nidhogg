import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import prisma from "@/../lib/prisma";
import { STORE } from "@/app/constants";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  const user = await prisma.user.findUnique({
    where: { email: email, password: password },
  });

  if (!user) {
    return new Response("User not found.", { status: 401 });
  }

  const cookieStore = await cookies();
  cookieStore.set(STORE.userId, user.id, {
    httpOnly: true,
    secure: true,
    path: "/",
  });

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { "Content-type": "application/json" },
  });
}
