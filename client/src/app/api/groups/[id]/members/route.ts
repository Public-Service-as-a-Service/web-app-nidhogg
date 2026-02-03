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
  const userId = cookieStore.get(STORE.userId)?.value;

  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const members = await prisma.groupMember.findMany({
    where: { groupId: Number(id) },
    include: {
      employee: true,
    },
  });

  return new Response(JSON.stringify(members), {
    status: 200,
    headers: { "Content-type": "application/json" },
  });
}
