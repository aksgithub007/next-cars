import { dbConnect } from "@/DB/DBConfig";
import { validateToken } from "@/Helper/ValidateToken";
import { Booking } from "@/Model/BookingModel";
import { NextResponse } from "next/server";
const stripe = require("stripe")(
  "sk_test_51ODNAXSHryygRBaf9yvQIia25TWzTfKKyxdwAqQzvh9t8UVnzNTNxKzUDymhDYa0D5yOIU4TphByY0uvzbtnc0Im00G81gNY5w"
);

export async function GET(request) {
  await dbConnect();

  try {
    const userId = await validateToken(request);
    const { searchParams } = new URL(request.url);
    console.log(searchParams);
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

    console.log(customer, "customer");

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

    console.log(paymentIntent, "Payment");
    //Add Payment in request body
    requestBody.paymentId = paymentIntent.id;

    await Booking.create(requestBody);

    return NextResponse.json({
      message: "Booking Added Successfully",
      isSuccess: true,
    });
  } catch (error) {
    return NextResponse.json({ message: error.message, isSuccess: true });
  }
}
