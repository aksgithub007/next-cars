import { dbConnect } from "@/DB/DBConfig";
import { validateToken } from "@/Helper/ValidateToken";
import { Booking } from "@/Model/BookingModel";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const stripe = require("stripe")(
  "sk_test_51ODNAXSHryygRBaf9yvQIia25TWzTfKKyxdwAqQzvh9t8UVnzNTNxKzUDymhDYa0D5yOIU4TphByY0uvzbtnc0Im00G81gNY5w"
);

export async function GET(request) {
  await dbConnect();

  try {
    const userId = await validateToken(request);
    const { searchParams } = new URL(request.url);
    const user = searchParams.get("user");
    const response = await Booking.find({ user })
      .populate("car")
      .populate("user");
    return NextResponse.json({
      message: "Getting All Booking Details Successfully",
      isSuccess: true,
      data: response,
    });
  } catch (error) {
    return NextResponse.json({ message: error.message, isSuccess: true });
  }
}

export async function POST(request) {
  await dbConnect();

  try {
    const userId = await validateToken(request);
    const requestBody = await request.json();

    //Create Customer

    const customer = await stripe.customers.create({
      email: requestBody.token.email,
    });

    //Create Payments
    const paymentIntent = await stripe.paymentIntents.create(
      {
        amount: Number(requestBody.totalRent) * 100,
        currency: "USD",
      },
      {
        idempotencyKey: requestBody.token.id,
      }
    );

    //Add Payment in request body
    requestBody.paymentId = paymentIntent.id;

    await Booking.create(requestBody);

    //Send Booking  Info To user
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
      to: requestBody.token.email,
      subject: "Car Booking Successfully",
      html: `
      <h3>Hello </h3>
      <p>You are successfully Booked a car. Booking details as per follows: </p>
      <ul>
      <li>email: ${requestBody.token.email}</li>
      <li>Start Date: ${requestBody.startDate}</li>
      <li>End Date: ${requestBody.endDate}</li>
      <li>Total Days: ${requestBody.totalDays}</li>
      <li>Total Rent: $${requestBody.totalRent}</li>
      <li>Payment Id: $${requestBody.paymentId}</li>
      </ul>
      <p>If you have any query please revert back mail to our support center</p>
      `,
    };

    await transpoter.sendMail(mailOption);

    return NextResponse.json({
      message: "Booking Added Successfully",
      isSuccess: true,
    });
  } catch (error) {
    return NextResponse.json({ message: error.message, isSuccess: true });
  }
}
