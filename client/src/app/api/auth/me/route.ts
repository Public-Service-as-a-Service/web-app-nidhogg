import { getAuthenticatedUser } from "@/utils/auth";

export async function GET() {
  const result = await getAuthenticatedUser();
  if ("response" in result) return result.response;
  return Response.json({ email: result.email, role: result.role });
}
