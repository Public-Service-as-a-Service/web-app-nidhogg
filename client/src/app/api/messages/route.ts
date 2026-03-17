import { cookies } from "next/headers";
import prisma from "@/../lib/prisma";
import { STORE } from "@/app/constants";

export async function GET() {
  const cookieStore = await cookies();
  const authToken = cookieStore.get(STORE.authToken)?.value;

  if (!authToken) {
    return new Response("Unauthorized", { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: authToken },
    select: { email: true },
  });

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const messages = await prisma.message.findMany({
    where: {
      sender: user.email,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      recipients: true,
    },
  });

  return new Response(JSON.stringify(messages), {
    status: 200,
    headers: { "Content-type": "application/json" },
  });
}
