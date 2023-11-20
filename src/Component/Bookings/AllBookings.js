"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import DataTable from "react-data-table-component";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

function AllBookings() {
  const [allBookings, setAllBookings] = useState([]);
  const stateInfo = useSelector((state) => state.user.currentUser);
  const router = useRouter();
  const userId = stateInfo?._id;

  const getAllBookings = async () => {
    const response = await axios.get(
      `http://localhost:3000/api/users/booking?user=${userId}`
    );
    const finalData = await response.data.data;
    setAllBookings(finalData);
  };

  const handleButtonClick = async (e, row) => {
    console.log(e);
    console.log(row);
    row.status = "cancelled";
    const response = await axios.put(
      `http://localhost:3000/api/users/booking/${row._id}`,
      row
    );

    console.log(response);
    const finalData = await response.data;
    if (finalData.isSuccess) {
      Swal.fire({
        icon: "success",
        text: `${finalData?.message}`,
      });
      getAllBookings();
      router.push("/bookings");
    }
  };
  const handleDeleteBooking = async (e, row) => {
    const response = await axios.delete(
      `http://localhost:3000/api/users/booking/${row._id}`,
      row.status
    );
    console.log(response);
    const finalData = await response.data;
    if (finalData.isSuccess) {
      Swal.fire({
        icon: "success",
        text: `${finalData?.message}`,
      });
      getAllBookings();
      router.push("/bookings");
    }
  };

  useEffect(() => {
    getAllBookings();
  }, [stateInfo]);

  const columns = [
    {
      name: "Image",
      selector: (row) => (
        <img src={row.car.image} style={{ width: "80px", height: "80px" }} />
      ),
    },
    {
      name: "Name",
      selector: (row) => row.car.name,
    },
    {
      name: "Model",
      selector: (row) => row.car.model,
    },
    {
      name: "Start Date",
      selector: (row) => moment(row.startDate).format("YYYY-MM-DD"),
    },
    {
      name: "End Date",
      selector: (row) => moment(row.endDate).format("YYYY-MM-DD"),
    },
    {
      name: "status",
      selector: (row) => row.status,
    },
    {
      name: "Actions",
      button: true,
      cell: (row) => (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <button
              className="btn btn-primary my-2"
              onClick={(e) => handleButtonClick(e, row)}
              disabled={row.status === "cancelled" ? true : false}
            >
              Cancel
            </button>
            <button
              className="btn btn-primary"
              onClick={(e) => handleDeleteBooking(e, row)}
              disabled={row.status === "approved" ? true : false}
            >
              Delete
            </button>
          </div>
        </>
      ),
    },
  ];

  const data = allBookings;
  console.log(allBookings);

  return (
    <>
      <DataTable columns={columns} data={data} />
    </>
  );
}

export default AllBookings;
