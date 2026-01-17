import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function Login(request: NextRequest) {
  try {
    const body = await request.json();
    const apiResponse = await fetch(`${process.env.API_BASE_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (!apiResponse.ok) {
      const errorData = await apiResponse.json();
      return NextResponse.json(
        { error: errorData.message || "Login failed" },
        { status: apiResponse.status }
      );
    }
    const data = await apiResponse.json();
    // set access_token in httpOnly cookie
    const cookieStore = await cookies();
    cookieStore.set("access_token", data?.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
    cookieStore.set(
      "user",
      JSON.stringify({
        _id: data.user._id,
        name: data.user.name,
        email: data.user.email,
        role: data.user?.role,
      }),
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24,
      }
    );
    return NextResponse.json({
      user: data.user,
      success: true,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: error,
      },
      { status: 500 }
    );
  }
}
