import { cookies } from "next/headers";
import { STORE } from "@/app/constants";

export async function GET() {
  const cookieStore = await cookies();
  const userId = cookieStore.get(STORE.userId)?.value;

  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { "Content-type": "application/json" },
  });
}
