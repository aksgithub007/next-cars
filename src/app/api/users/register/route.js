import { User } from "@/Model/UserModal";
import { dbConnect } from "../../../../DB/DBConfig";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    await dbConnect();
    const payload = await request.json();

    //Check If user is allready exist or not
    const user = await User.findOne({ email: payload.email });
    if (user) {
      throw new Error("User Already Exists Please Login");
    }

    //Convert password into hash

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hash(payload.password, salt);
    payload.password = hashPassword;
    // console.log(payload);
    const response = await User.create(payload);
    // console.log(response);
    return NextResponse.json(
      {
        message: "User Successfully Register",
        isSuccess: true,
        data: response,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
        isSuccess: false,
      },
      { status: 400 }
    );
  }
}
