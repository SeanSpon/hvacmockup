import { NextRequest, NextResponse } from "next/server";

const DEMO_ACCOUNTS = [
  {
    email: "sarah.mann@fdpierce.com",
    password: "admin123",
    name: "Sarah Mann",
    role: "OWNER",
  },
  {
    email: "tech@fdpierce.com",
    password: "tech123",
    name: "Mike Johnson",
    role: "TECHNICIAN",
  },
];

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  const account = DEMO_ACCOUNTS.find(
    (a) => a.email === email && a.password === password
  );

  if (!account) {
    return NextResponse.json(
      { error: "Invalid email or password" },
      { status: 401 }
    );
  }

  const response = NextResponse.json({
    name: account.name,
    email: account.email,
    role: account.role,
  });

  // Set a simple demo auth cookie (not secure — this is a demo)
  response.cookies.set("fdp-demo-auth", JSON.stringify({
    name: account.name,
    email: account.email,
    role: account.role,
  }), {
    path: "/",
    maxAge: 60 * 60 * 24, // 24 hours
    sameSite: "lax",
  });

  return response;
}
