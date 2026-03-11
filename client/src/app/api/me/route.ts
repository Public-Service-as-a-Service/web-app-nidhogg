import { getAuthenticatedEmail } from "@/utils/auth";

export async function GET() {
  const auth = await getAuthenticatedEmail();
  console.log("[/api/me] auth result:", auth);

  if ("response" in auth) return auth.response;

  return Response.json({ email: auth.email });
}