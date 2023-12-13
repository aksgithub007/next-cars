"use client";

import AddCarsForm from "@/Component/Cars/AddCarsForm";
import { carsThunk } from "@/Redux/carSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Container, Row } from "react-bootstrap";
import { BsFuelPump } from "react-icons/bs";
import { BsSpeedometer2 } from "react-icons/bs";
import { PiSteeringWheelBold } from "react-icons/pi";
import classes from "../../Component/Cars/HomeCarSection.module.css";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import Swal from "sweetalert2";

function DisplayAllCars() {
  const router = useRouter();
  const pathName = usePathname();
  const stateInfo = useSelector((state) => state.cars.cars);
  const stateInfoUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [rowInfo, setRowInfo] = useState(null);

  const handleDetails = (id) => {
    router.push(`/cars/${id}`);
  };

  useEffect(() => {
    dispatch(carsThunk());
  }, [dispatch]);

  const handlEdit = (e, id) => {
    setShow(true);
    const editInfo = stateInfo?.data?.find((item) => item._id === id);
    console.log(editInfo);
    setRowInfo(editInfo);
  };
  const handlDelete = async (e, id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/users/car/${id}`
      );
      const finalInfo = await response.data;
      if (finalInfo?.isSuccess) {
        Swal.fire({
          icon: "success",
          text: `${finalInfo.message}`,
        });
        router.push("/cars");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="container">
        <div className="row">
          {/* <DisplayCars cars={cars} user={user} /> */}
          {stateInfo?.data?.map((item) => (
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
                  <div className={classes.footerButton}>
                    <Button
                      variant="primary"
                      onClick={() => handleDetails(item._id)}
                      className={classes.button}
                    >
                      View Details
                    </Button>
                    {stateInfoUser?.isAdmin ? (
                      <>
                        <Button
                          variant="primary"
                          className={classes.button}
                          onClick={(e) => handlEdit(e, item._id)}
                        >
                          Edit Details
                        </Button>
                        <Button
                          variant="primary"
                          className={classes.button}
                          onClick={(e) => handlDelete(e, item._id)}
                        >
                          Delete
                        </Button>
                      </>
                    ) : null}
                  </div>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>

      <AddCarsForm
        user={stateInfoUser}
        show={rowInfo ? show : null}
        setShow={setShow}
        rowInfo={rowInfo ? rowInfo : null}
      />
    </>
  );
}

export default DisplayAllCars;
