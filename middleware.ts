import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // You can add logic here if needed
  console.log("middleware");
  return NextResponse.next();
}

console.log("middleware");

export const config = {
  matcher: ["/login", "/signup", "/admin/(.*)"],
};
