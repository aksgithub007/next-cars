import { User } from "@/Model/UserModal";
import { dbConnect } from "../../../../DB/DBConfig";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    await dbConnect();
    const payload = await request.json();
    const mainPassword = payload.password;

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

    //Send Login Details to user
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
      to: payload.email,
      subject: "Account Register Successfully",
      html: `
      <h3>Hello ${payload.name}</h3>
      <p>You are successfully created new account. Account details as per follows: </p>
      <ul>
      <li>email: ${payload.email}</li>
      <li>Password: ${mainPassword}</li>
      </ul>
      `,
    };

    await transpoter.sendMail(mailOption);

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
