"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { FaDollarSign } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment/moment";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { Col, Container, Row } from "react-bootstrap";
import Image from "next/image";
import classes from "./CarDetailsInfo.module.css";

function CarDetailsInfo() {
  const KEY =
    "pk_test_51ODNAXSHryygRBafK3FNfOBUorh5wPCEKLlEGxh4gj6hC0O1mYXkcoheUrt959EKzIDIWYImDoXpuP2ObubZP1n200IFOHCLWX";
  const params = useParams();
  const router = useRouter();
  const stateInfo = useSelector((state) => state.user.currentUser);
  const [car, setCar] = useState();
  const [totalRent, setTotalRent] = useState();
  const [slotAbl, setSlotAbl] = useState(false);
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const carId = params?.id;

  let totalDays;
  console.log(KEY);

  useEffect(() => {
    const gettingCarDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/users/car/${carId}`
        );
        const finalData = await response.data.data;
        setCar(finalData);
      } catch (error) {
        console.log(error);
      }
    };
    gettingCarDetails();
  }, [carId]);

  useEffect(() => {
    setSlotAbl(false);
  }, [startDate, endDate]);

  useEffect(() => {
    setTotalRent(0);
    const finalStartDate = moment(startDate).format("YYYY MM DD");
    const finalEndDate = moment(endDate).format("YYYY MM DD");
    totalDays = Number(
      moment(finalEndDate).diff(moment(finalStartDate), "days")
    );
    setTotalRent(Number(car?.rent * totalDays));
  }, [dateRange]);

  const bookHandler = async (token) => {
    console.log(token);
    const carBookInfo = {
      car: car._id,
      user: stateInfo?._id,
      startDate: moment(startDate).format("YYYY MM DD"),
      endDate: moment(endDate).format("YYYY MM DD"),
      totalDays: Number(moment(endDate).diff(moment(startDate), "days")),
      totalRent: Number(totalRent),
      token: token,
    };
    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/booking",
        carBookInfo
      );
      const finalInfo = await response.data;
      if (finalInfo.isSuccess) {
        Swal.fire({
          icon: "success",
          text: `${finalInfo.message}`,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "warning",
        text: `${error.message}`,
      });
    }
  };

  const handleCheckSlot = async () => {
    const slotInfo = {
      car: car?._id,
      startDate,
      endDate,
    };
    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/checkSlot",
        slotInfo
      );
      const finalInfo = await response.data;
      console.log(finalInfo);
      if (finalInfo.data) {
        Swal.fire({
          icon: "success",
          text: `${finalInfo.message}`,
        });
        setSlotAbl(finalInfo.data);
      } else {
        Swal.fire({
          icon: "warning",
          text: `${finalInfo.message}`,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "warning",
        text: `${error.message}`,
      });
    }
  };

  return (
    <>
      {/* <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-sm-12 col-md-8 col-lg-8 col-xl-8 col-xxl-8 ">
            <div className="imageContainer">
              <img src={car?.image} />
            </div>
            <div className="infoContainer">
              <div className="heading">
                <h2>
                  <strong>Name:</strong> {car?.name}
                </h2>
              </div>
              <div className="subheading">
                <h6>
                  <strong>Model Number:</strong> {car?.model}
                </h6>
              </div>
              <div className="info">
                <p>
                  <strong>Varient:</strong> {car?.varient}
                </p>
                <p>
                  <strong>Average:</strong> {car?.average}
                </p>
                <p>
                  <strong>Rent/Day:</strong> <FaDollarSign />
                  {car?.rent}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-sm-12 col-md-12">
            <div className="Heading">
              <h5>Booking Slot</h5>
            </div>
            <DatePicker
              selectsRange={true}
              startDate={startDate}
              endDate={endDate}
              onChange={(update) => {
                setDateRange(update);
              }}
              minDate={moment().toDate()}
              withPortal
            />
          </div>
          <div className="col-12 col-sm-12 col-md-12">
            <div className="Heading">
              <h5>
                {" "}
                Total Rent:
                <FaDollarSign /> {totalRent ? totalRent : 0}{" "}
              </h5>
            </div>
            <button
              disabled={startDate || endDate ? false : true}
              className="btn btn-primary"
              onClick={handleCheckSlot}
            >
              Check Availability
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <button
              className="btn btn-outline-primary"
              onClick={() => router.back()}
            >
              Back
            </button>
            <StripeCheckout
              token={(token) => bookHandler(token)}
              stripeKey={KEY}
              currency="USD"
              amount={totalRent * 100}
              shippingAddress
              key={KEY}
            >
              <button
                className="btn btn-primary mx-3"
                disabled={(startDate || endDate) && slotAbl ? false : true}
              >
                Book Now
              </button>
            </StripeCheckout>
          </div>
        </div>
      </div> */}

      <div className={classes.carDetailMainWrapper}>
        <Container>
          <Row>
            <Col xs={12} md={6} lg={6} xl={6} xxl={6}>
              <div className={classes.headingSection}>
                <h3>{car?.name}</h3>
                <h6>{car?.model}</h6>
              </div>

              <div className={classes.contentInfo}>
                <p style={{ marginBottom: "15px" }}>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <p>
                  <strong>Varient:</strong> {car?.varient}
                </p>
                <p>
                  <strong>Average:</strong> {car?.average} / 1 Liter
                </p>
                <p>
                  <strong>Capacity:</strong> 04 Person
                </p>
                <p>
                  <strong>Doors: </strong> 04
                </p>
                <p>
                  <strong>Air Condition:</strong> Dual Zone
                </p>
                <p>
                  <strong>Transmission:</strong> Automatic
                </p>
              </div>
              <div className={classes.bookSection}>
                <h5>Select Booking Slot : </h5>
                <DatePicker
                  selectsRange={true}
                  startDate={startDate}
                  endDate={endDate}
                  onChange={(update) => {
                    setDateRange(update);
                  }}
                  minDate={moment().toDate()}
                  withPortal
                  className={classes.datePicker}
                />
                <button
                  disabled={startDate || endDate ? false : true}
                  className={classes.button}
                  onClick={handleCheckSlot}
                >
                  Check Availability
                </button>
              </div>
              <div className={classes.checkRentSection}>
                <h5>
                  {" "}
                  Total Rent:
                  <FaDollarSign className={classes.rentIcon} />{" "}
                  {totalRent ? totalRent : 0}{" "}
                </h5>
              </div>
              <div className={classes.finalBookingSection}>
                <button
                  className={classes.button}
                  onClick={() => router.back()}
                >
                  Back
                </button>
                <StripeCheckout
                  token={(token) => bookHandler(token)}
                  stripeKey={KEY}
                  currency="USD"
                  amount={totalRent * 100}
                  shippingAddress
                  key={KEY}
                >
                  <button
                    className={classes.button}
                    disabled={(startDate || endDate) && slotAbl ? false : true}
                  >
                    Book Now
                  </button>
                </StripeCheckout>
              </div>
            </Col>
            <Col xs={12} md={6} lg={6} xl={6} xxl={6}>
              <div className={classes.images}>
                <Image src={car?.image} width={600} height={400} />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default CarDetailsInfo;
