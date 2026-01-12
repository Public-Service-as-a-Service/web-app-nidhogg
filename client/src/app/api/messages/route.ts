import { cookies } from "next/headers";
import prisma from "@/../lib/prisma";
import { STORE } from "@/app/constants";

export async function GET() {
  const cookieStore = await cookies();
  const userId = cookieStore.get(STORE.userId)?.value;

  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const messages = await prisma.message.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      createDate: "desc",
    },
  });

  return new Response(JSON.stringify(messages), {
    status: 200,
    headers: { "Content-type": "application/json" },
  });
}
