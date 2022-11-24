import { NextResponse, userAgent } from "next/server";

// 追い払いたい Bot たち
const uaBlackList = Object.freeze(["PetalBot", "SemrushBot"]);

export function middleware(req) {
  const { ua } = userAgent(req);
  // robot.txt へのアクセスは除く
  if (
    uaBlackList.some((blackUa) => ua.indexOf(blackUa) > -1) &&
    req.nextUrl.pathname !== "/robots.txt"
  ) {
    req.nextUrl.pathname = "/403.html";
    return NextResponse.rewrite(req.nextUrl, { status: 403 });
  }
  return NextResponse.next();
}
