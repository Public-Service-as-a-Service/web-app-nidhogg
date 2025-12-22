import { cookies } from "next/headers";
import prisma from "../../../../lib/prisma";

export async function GET() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;

  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const groups = await prisma.group.findMany({
    orderBy: {
      createDate: "desc",
    },
  });

  return new Response(JSON.stringify(groups), {
    status: 200,
    headers: { "Content-type": "application/json" },
  });
}
