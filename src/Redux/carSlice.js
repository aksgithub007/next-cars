import { createSlice } from "@reduxjs/toolkit";

const carSlice = createSlice({
  name: "car",
  initialState: {
    cars: null,
  },
  reducers: {
    setAllCar(state, action) {
      state.cars = action.payload;
    },
  },
});

export const { setAllCar } = carSlice.actions;
export const car = carSlice.reducer;
