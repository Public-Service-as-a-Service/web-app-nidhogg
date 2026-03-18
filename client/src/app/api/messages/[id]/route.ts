import { cookies } from "next/headers";
import prisma from "@/../lib/prisma";
import { STORE } from "@/app/constants";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const cookieStore = await cookies();
  const authToken = cookieStore.get(STORE.authToken)?.value;
  
  if (!authToken) {
    return new Response("Unauthorized", { status: 401 });
  }

  const message = await prisma.message.findUnique({
    where: { id: id },
    include: {
      recipients: true,
    },
  });

  if (!message) {
    return new Response("Message not found", { status: 404 });
  }

  return new Response(JSON.stringify(message), {
    status: 200,
    headers: { "Content-type": "application/json" },
  });
}
