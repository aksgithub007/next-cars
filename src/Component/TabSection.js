"use client";
import React, { useEffect, useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setAllCar } from "@/Redux/carSlice";
import Cars from "@/app/cars/page";
import Link from "next/link";
import AllBookings from "./Bookings/AllBookings";

function TabSection() {
  const pathName = usePathname();
  const dispatch = useDispatch();
  const stateInfo = useSelector((state) => state.user);
  const [user, setUser] = useState(null);
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const getAllCars = async () => {
      const response = await axios.get("http://localhost:3000/api/users/car");
      const finalData = await response.data;
      // console.log(finalData, "All Cars");
      dispatch(setAllCar(finalData?.data));
      setCars(finalData?.data);
    };
    getAllCars();
  }, []);

  useEffect(() => {
    if (pathName !== "/login" || pathName !== "register") {
      setUser(stateInfo.currentUser);
    }
  }, [stateInfo]);
  // console.log(user);
  // console.log(cars);
  return (
    <>
      {user?.isAdmin ? (
        <Tabs
          defaultActiveKey="general"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <Tab eventKey="general" title="General">
            Tab content for Home
          </Tab>
          <Tab eventKey="users" title="All Users">
            Tab content for Profile
          </Tab>
          <Tab eventKey="bookings" title="All Bookings">
            <AllBookings />
          </Tab>
          <Tab eventKey="cars" title="Cars">
            <Cars user={user} cars={cars} />
          </Tab>
        </Tabs>
      ) : (
        <Tabs
          defaultActiveKey="general"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <Tab eventKey="general" title="General">
            Tab content for Home
          </Tab>
          <Tab eventKey="booking" title="Booking">
            <AllBookings />
          </Tab>
          <Tab eventKey="cars" title="Cars">
            <Cars user={user} cars={cars} />
          </Tab>
        </Tabs>
      )}
    </>
  );
}

export default TabSection;
