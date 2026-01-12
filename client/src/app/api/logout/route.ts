import { cookies } from "next/headers";
import { STORE } from "@/app/constants";

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.delete(STORE.userId);

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { "Content-type": "application/json" },
  });
}
