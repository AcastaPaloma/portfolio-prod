import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// The write-ups in public/genie and public/pi load their assets by relative path, so /genie and /pi must gain a
// trailing slash. A next.config redirect can't express this: its sources treat the trailing slash as optional
// and would loop on /genie/.
export function proxy(request: NextRequest) {
  // A plain URL, because NextURL strips the trailing slash again when formatted.
  const url = new URL(request.url);
  if (url.pathname.endsWith("/")) return NextResponse.next();
  url.pathname += "/";
  return NextResponse.redirect(url, 308);
}

export const config = {
  matcher: ["/genie", "/pi"],
};
