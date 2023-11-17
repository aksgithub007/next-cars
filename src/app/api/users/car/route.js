import { dbConnect } from "@/DB/DBConfig";
import { validateToken } from "@/Helper/ValidateToken";
import { Cars } from "@/Model/CarModel";
import { NextResponse } from "next/server";

export async function GET(request) {
  await dbConnect();
  try {
    const userId = validateToken(request);
    const allCars = await Cars.find();
    return NextResponse.json(
      { message: "Car Added Successfully", isSuccess: true, data: allCars },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  // console.log(request, "from car post ");
  try {
    await dbConnect();
    const userId = validateToken(request);
    const requestBody = await request.json();
    console.log(requestBody);

    //Check if car and its model is already present
    const allCars = await Cars.find({
      name: requestBody.name,
      model: requestBody.model,
      varient: requestBody.varient,
    });

    if (allCars.length > 0) {
      throw new Error("Car is allready present in to list");
    }

    const response = await Cars.create(requestBody);

    return NextResponse.json(
      { message: "Car Added Successfully", isSuccess: true, data: response },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}

export async function PUT(request) {
  // console.log(request, "from car post ");
  try {
    await dbConnect();
    const userId = validateToken(request);
    const requestBody = await request.json();
    // console.log(requestBody);
    const response = await Cars.findByIdAndUpdate(
      requestBody?._id,
      requestBody
    );

    return NextResponse.json(
      {
        message: "Car Info Updated Successfully",
        isSuccess: true,
        data: response,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
