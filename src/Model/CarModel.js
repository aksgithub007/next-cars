import mongoose from "mongoose";

const carSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    model: {
      type: String,
    },
    varient: {
      type: String,
    },
    average: {
      type: Number,
    },
    rent: {
      type: Number,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Cars = mongoose.models.cars || mongoose.model("cars", carSchema);
