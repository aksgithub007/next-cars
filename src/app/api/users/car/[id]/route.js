import { dbConnect } from "@/DB/DBConfig";
import { Cars } from "@/Model/CarModel";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  await dbConnect();
  const carId = params?.id;
  try {
    const carInfo = await Cars.findById(carId);
    return NextResponse.json({
      message: "Getting Car Info",
      isSuccess: true,
      data: carInfo,
    });
  } catch (error) {
    return NextResponse.json({ message: error.message, isSuccess: false });
  }
}

export async function DELETE(request, { params }) {
  await dbConnect();
  const carId = params?.id;
  console.log(carId);
  try {
    const carInfo = await Cars.findByIdAndDelete(carId);
    return NextResponse.json({
      message: "Cars Info Deleted",
      isSuccess: true,
    });
  } catch (error) {
    return NextResponse.json({ message: error.message, isSuccess: false });
  }
}
