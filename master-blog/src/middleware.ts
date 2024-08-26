import { auth as middleware } from "@/lib/auth";
import authConfig from "@/lib/auth.config";
import NextAuth from "next-auth";
import {
  authRoutes,
  DEFAULT_HOME_REDIRECT,
  DEFAULT_LOGIN_REDIRECT,
  publicRoutes,
} from "./routes";

export default middleware((req) => {
  // console.log(req);
  // console.log("ROUTE => ", req.nextUrl.pathname);
  // console.log("AUTH INFO => ", req.auth);

  const { nextUrl } = req;
  const isLoggedIn = !!req.auth; //* true or false

  const isPublicRoute = publicRoutes.includes(nextUrl.pathname); //* true or false 
  const isAuthRoute = authRoutes.includes(nextUrl.pathname); //* true or false 

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_HOME_REDIRECT, nextUrl));
    }
    return undefined;
  }

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
  }

  return undefined;
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
