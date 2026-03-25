import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  const joinedPath = path.join("/");
  const { search } = new URL(req.url);
  
  const upstream = await fetch(
    `${process.env.API_PROXY_TARGET_TEAMSSENDER}/api/teamssender/${joinedPath}${search}`,
    { redirect: "manual", cache: "no-store" }
  );

  if (joinedPath === "callback") {
    const success = upstream.ok || upstream.status === 302;
    return new Response(
      `<html><body><script>
        const bc = new BroadcastChannel("ms-auth");
        bc.postMessage({ type: "ms-auth", success: ${success} });
        bc.close();
        window.close();
      </script></body></html>`,
      { headers: { "content-type": "text/html" } }
    );
  }

  const location = upstream.headers.get("location");
  return Response.redirect(location!, 302);
}