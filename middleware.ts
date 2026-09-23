import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Separa el sitio público del panel privado por dominio:
 *
 *   maranathasancristobal.com               → sitio normal (`/dashboard` da 404)
 *   admin.maranathasancristobal.com         → raíz muestra el dashboard;
 *                                             el resto se navega bajo /dashboard/*
 *
 * Se activa solo si existe la variable de entorno `ADMIN_HOST`. Sin ella
 * (local, o el deploy gratis en `*.vercel.app`) el middleware no hace nada
 * y el dashboard vive en `/dashboard` como una ruta más.
 */
const ADMIN_HOST = process.env.ADMIN_HOST?.toLowerCase();

export function middleware(req: NextRequest) {
  if (!ADMIN_HOST) return NextResponse.next();

  const host = (req.headers.get("host") ?? "").split(":")[0].toLowerCase();
  const { pathname } = req.nextUrl;

  if (host === ADMIN_HOST) {
    // La raíz del subdominio muestra el dashboard sin exponer /dashboard.
    const res =
      pathname === "/"
        ? NextResponse.rewrite(new URL("/dashboard", req.url))
        : NextResponse.next();
    // Nada del panel privado se indexa.
    res.headers.set("X-Robots-Tag", "noindex, nofollow");
    return res;
  }

  // En el dominio público el dashboard no existe.
  if (pathname === "/dashboard" || pathname.startsWith("/dashboard/")) {
    return new NextResponse(null, { status: 404 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Todo menos assets estáticos y los archivos de metadata de Next.
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|icon|apple-icon|opengraph-image|twitter-image|manifest.webmanifest).*)",
  ],
};
