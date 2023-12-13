import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const carsThunk = createAsyncThunk("car/rent", async () => {
  const response = await axios.get("http://localhost:3000/api/users/car");
  const finalData = await response.data;
  return finalData;
});

const carSlice = createSlice({
  name: "car",
  initialState: {
    isLoading: false,
    cars: [],
  },
  extraReducers: (builder) => {
    builder.addCase(carsThunk.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(carsThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.cars = action.payload;
    });
    builder.addCase(carsThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.cars = [];
    });
  },
});

export const car = carSlice.reducer;
