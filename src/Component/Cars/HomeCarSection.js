"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Container, Row } from "react-bootstrap";
import { BsFuelPump } from "react-icons/bs";
import { BsSpeedometer2 } from "react-icons/bs";
import { PiSteeringWheelBold } from "react-icons/pi";
import classes from "./HomeCarSection.module.css";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { carsThunk } from "@/Redux/carSlice";

function HomeCarSection() {
  const stateInfo = useSelector((state) => state.cars.cars);
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    dispatch(carsThunk());
  }, []);

  const handleDetails = (id) => {
    router.push(`/cars/${id}`);
  };

  return (
    <>
      <div className={classes.main_wrapper}>
        <Container>
          <Row>
            <div className="col-12">
              <div className={classes.Heading}>
                <h4>Choose your Desired Car Model</h4>
                <p>Who are in extremely love with eco friendly system.</p>
              </div>
            </div>
            {stateInfo?.data?.slice(0, 3).map((item) => (
              <div className="col-4" key={item.name}>
                <Card className={classes.card}>
                  <Card.Img
                    variant="top"
                    src={item?.image}
                    className={classes.cardImage}
                  />
                  <Card.Body>
                    <div className={classes.titleSection}>
                      <div className={classes.title}>
                        <h5>{item?.name}</h5>
                      </div>
                      <div className={classes.model}>{item?.model}</div>
                    </div>
                    <hr />
                    <div className={classes.featureSection}>
                      <div className={classes.subSection}>
                        <p>
                          <span>
                            <BsFuelPump className={classes.icon} />
                          </span>{" "}
                          {item?.varient}
                        </p>
                      </div>
                      <div className={classes.subSection}>
                        <p>
                          <span>
                            <BsSpeedometer2 className={classes.icon} />
                          </span>{" "}
                          {item?.average} km / 1 Liter
                        </p>
                      </div>
                      <div className={classes.subSection}>
                        <p>
                          <span>
                            <PiSteeringWheelBold className={classes.icon} />
                          </span>{" "}
                          Automatic
                        </p>
                      </div>
                    </div>
                    <hr />
                    <Button
                      variant="primary"
                      onClick={() => handleDetails(item._id)}
                      className={classes.button}
                    >
                      View Details
                    </Button>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </Row>
          <Row>
            <div className="col-12">
              <div className={classes.exploreWrapper}>
                <Link href="/cars" className={classes.LinkButton}>
                  Explore All
                </Link>
              </div>
            </div>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default HomeCarSection;
