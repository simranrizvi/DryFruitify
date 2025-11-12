import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("token")?.value; // ✅ match backend cookie name

  if (!token) {
    // Token hi nahi mila → login pe bhej do
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    // JWT ka payload nikaalo (2nd part)
    const base64Payload = token.split(".")[1];
    const payload = JSON.parse(atob(base64Payload));

    console.log("✅ JWT Payload:", payload);

    const role = payload.role; // role payload me hona chahiye

    // Agar role user hai aur /dashboard access kar raha hai
    if (request.nextUrl.pathname.startsWith("/dashboard") && role !== "admin") {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // Otherwise allow
    return NextResponse.next();
  } catch (err) {
    console.error("❌ Invalid Token:", err);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: [
    "/profile/:path*",
    "/checkout/:path*",
    "/dashboard/:path*",
    "/cart/:path*",
  ],
};
