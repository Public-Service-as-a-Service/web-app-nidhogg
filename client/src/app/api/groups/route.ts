import { cookies } from "next/headers";
import prisma from "@/../lib/prisma";
import { STORE } from "@/app/constants";

export async function GET() {
  const cookieStore = await cookies();
  const authToken = cookieStore.get(STORE.authToken)?.value;

  if (!authToken) {
    return new Response("Unauthorized", { status: 401 });
  }

  const groups = await prisma.group.findMany({
    
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
