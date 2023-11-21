import { User } from "@/Model/UserModal";
import { dbConnect } from "../../../../DB/DBConfig";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import nodemailer from "nodemailer";
export async function POST(request) {
  try {
    await dbConnect();
    const payload = await request.json();

    //Check if user is present or not

    const user = await User.findOne({ email: payload.email });
    if (!user) {
      throw new Error("User is not register please create user");
    }

    //Check Password is match or not
    const password = await bcrypt.compare(payload.password, user.password);

    if (!password) {
      throw new Error("User credential is mismatch");
    }
    //Generate Token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    //Set Cookie
    cookies().set(
      "token",
      token,
      {
        path: "/",
        httpOnly: true,
      },
      { maxAge: "1d" }
    );
    //Send Login Info To user
    const transpoter = nodemailer.createTransport({
      service: "gmail",
      secure: true,
      auth: {
        user: "aksgithub@gmail.com",
        pass: process.env.App_Password,
      },
    });

    const mailOption = {
      from: "aksgithub@gmail.com",
      to: user.email,
      subject: "Login SuccessFully",
      html: `
      <h3>Hello ${user.name}</h3>
      <p>You are successfully logged in. but if you are not log in then please inform to our support center</p>
      `,
    };

    await transpoter.sendMail(mailOption);

    return NextResponse.json(
      {
        message: "login Form Submited",
        token: token,
        user: user,
        isSuccess: true,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: error.message, isSuccess: false },
      { status: 401 }
    );
  }
}
