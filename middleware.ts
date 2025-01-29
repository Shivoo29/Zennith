import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token

    // Only allow users with admin role to access admin routes
    if (token?.role !== "admin") {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => token?.role === "admin",
    },
  },
)

export const config = {
  matcher: ["/admin/:path*"],
}

