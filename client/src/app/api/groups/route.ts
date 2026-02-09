import { cookies } from "next/headers";
import prisma from "@/../lib/prisma";
import { STORE } from "@/app/constants";

export async function GET() {
  const cookieStore = await cookies();
  const userId = cookieStore.get(STORE.userId)?.value;

  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const groups = await prisma.group.findMany({
    where: { userId },
    include: {
      employees: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return new Response(JSON.stringify(groups), {
    status: 200,
    headers: { "Content-type": "application/json" },
  });
}
