import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.delete("userId");

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { "Content-type": "application/json" },
  });
}
