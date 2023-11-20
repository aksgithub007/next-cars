import { dbConnect } from "@/DB/DBConfig";
import { validateToken } from "@/Helper/ValidateToken";
import { Booking } from "@/Model/BookingModel";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  await dbConnect();

  try {
    const userId = await validateToken(request);
    const requestBody = await request.json();
    console.log(requestBody, "request Body");
    const bookingId = params.id;
    const response = await Booking.findByIdAndUpdate(bookingId, requestBody);
    return NextResponse.json({
      message: "Booking Updated Successfully",
      isSuccess: true,
      data: response,
    });
  } catch (error) {
    return NextResponse.json({ message: error.message, isSuccess: true });
  }
}

export async function DELETE(request, { params }) {
  await dbConnect();

  try {
    const userId = await validateToken(request);
    const bookingId = params.id;
    const response = await Booking.findByIdAndDelete(bookingId);
    return NextResponse.json({
      message: "Booking Records is Deleted",
      isSuccess: true,
    });
  } catch (error) {
    return NextResponse.json({ message: error.message, isSuccess: true });
  }
}
