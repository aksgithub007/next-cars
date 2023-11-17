"use client";

import axios from "axios";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

function AllBookings() {
  const stateInfo = useSelector((state) => state.user.currentUser);
  const userId = stateInfo?._id;

  useEffect(() => {
    const getAllBookings = async () => {
      const response = await axios.get(
        `http://localhost:3000/api/users/booking?user=${userId}`
      );
      console.log(response);
    };
    getAllBookings();
  }, []);

  return <div>AllBookings</div>;
}

export default AllBookings;
