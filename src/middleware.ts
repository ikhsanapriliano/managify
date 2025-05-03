import type { NextRequest } from "next/server";

export async function middleware(_request: NextRequest) {
  // const token = await getToken({ req: request });
  // return NextResponse.redirect(new URL('/home', request.url))
}

export const config = {
  matcher: "/:path*",
};
