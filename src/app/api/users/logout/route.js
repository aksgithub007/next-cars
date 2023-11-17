import { NextResponse } from "next/server";

export async function GET() {
  try {
    let response = NextResponse.json({
      message: "Log out successfully",
      data: null,
      isLogout: true,
    });
    await response.cookies.delete("token");
    return response;
  } catch (error) {
    return NextResponse.json({
      message: error.message,
      data: null,
      isLogout: false,
    });
  }
}
