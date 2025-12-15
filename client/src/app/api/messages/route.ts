import { cookies } from "next/headers";
import prisma from "../../../../lib/prisma";

export async function GET() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;

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
