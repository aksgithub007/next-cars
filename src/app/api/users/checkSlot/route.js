import { dbConnect } from "@/DB/DBConfig";
import { validateToken } from "@/Helper/ValidateToken";
import { Booking } from "@/Model/BookingModel";
import { NextResponse } from "next/server";

export async function POST(request) {
  await dbConnect();
  try {
    const userId = await validateToken(request);
    const { car, startDate, endDate } = await request.json();
    let slotAvailable = true;
    const allBookings = await Booking.find({
      car,
      $or: [
        { startDate: { $gte: startDate, $lte: endDate } },
        { endDate: { $lte: endDate, $gte: startDate } },
      ],
    });

    //Check where end date and start date is not simmilar
    if (allBookings.length > 0) {
      slotAvailable = false;
    }
    return NextResponse.json({
      message: slotAvailable ? "Slot is available" : "Slot is not available",
      data: slotAvailable,
    });
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }
}
