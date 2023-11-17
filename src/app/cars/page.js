"use client";

import AddCarsForm from "@/Component/Cars/AddCarsForm";
import DisplayCars from "@/Component/Cars/DisplayCars";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";

function Cars({ user, cars }) {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <div className="container">
        <div className="row">
          {user?.isAdmin ? (
            <div className="col-12 d-flex justify-content-end">
              <Button variant="primary" onClick={handleShow}>
                Add Car
              </Button>
              <AddCarsForm user={user} show={show} setShow={setShow} />
            </div>
          ) : null}
        </div>

        <div className="row">
          <DisplayCars cars={cars} user={user} />
        </div>
      </div>
    </>
  );
}

export default Cars;
