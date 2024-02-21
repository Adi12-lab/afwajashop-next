import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import type { NextRequest } from "next/server";
import { requireAuth, authRoutes, publicRoutes } from "~/routes";

async function getUserFromToken(token: RequestCookie) {
  try {
    const response = await fetch(
      (process.env.NEXT_PUBLIC_SERVER_URL as string) + "/auth/is-auth",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
        }),
      }
    );
    return await response.json();
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function middleware(req: NextRequest) {
  const { nextUrl, cookies } = req;
  // const isRequireAuth = requireAuth.includes(nextUrl.pathname);
  const isAuthRoutes = authRoutes.includes(nextUrl.pathname);

  // if (!isRequireAuth) return;

  const user = await getUserFromToken(
    cookies.get("access_token") as RequestCookie
  );

  if (isAuthRoutes && user.email) {
    return Response.redirect(
      new URL("/akun-saya", process.env.NEXT_PUBLIC_DOMAIN)
    );
  }

  if (nextUrl.pathname === "/admin" && user?.role !== "ADMIN") {
    return Response.redirect(new URL("/", process.env.NEXT_PUBLIC_DOMAIN));
  }

  if (nextUrl.pathname === "/akun-saya" && !user) {
    return Response.redirect(
      new URL("/auth/login", process.env.NEXT_PUBLIC_DOMAIN)
    );
  }
}

export const config = {
  matcher: ["/auth/:path*", "/admin/:path*", "/akun-saya/:path*"],
};
