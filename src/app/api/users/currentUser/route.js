import { dbConnect } from "@/DB/DBConfig";
import { validateToken } from "@/Helper/ValidateToken";
import { User } from "@/Model/UserModal";
import { NextResponse } from "next/server";

export async function GET(request) {
  dbConnect();
  try {
    const userId = await validateToken(request);

    const user = await User.findById(userId).select("-password");
    if (!user) {
      throw new Error("Not a Valid User");
    }
    return NextResponse.json({
      message: "User is a Valid",
      data: user,
      isSuccess: true,
    });
  } catch (error) {
    return NextResponse.json({
      message: error.message || "User is a notValid",
      isSuccess: false,
    });
  }
}
