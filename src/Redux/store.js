import { configureStore } from "@reduxjs/toolkit";
import { user } from "./userSlice";
import { car } from "./carSlice";

const store = configureStore({
  reducer: {
    user: user,
    cars: car,
  },
});

export default store;
