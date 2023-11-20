"use client";
import DisplayAllCars from "@/Component/Cars/DisplayAllCars";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import classes from "../../Component/Cars/HomeCarSection.module.css";
import { Button } from "react-bootstrap";
import AddCarsForm from "@/Component/Cars/AddCarsForm";

function Cars() {
  const stateInfoUser = useSelector((state) => state.user.currentUser);

  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);

  return (
    <>
      <div className="container">
        <div className="row">
          {stateInfoUser?.isAdmin ? (
            <div className="col-12 d-flex justify-content-end">
              <Button
                className={classes.button}
                variant="primary"
                onClick={handleShow}
                style={{ marginTop: "25px" }}
              >
                Add Car
              </Button>
              <AddCarsForm user={stateInfoUser} show={show} setShow={setShow} />
            </div>
          ) : null}
        </div>

        <div className="row">
          <DisplayAllCars />
        </div>
      </div>
    </>
  );
}

export default Cars;
