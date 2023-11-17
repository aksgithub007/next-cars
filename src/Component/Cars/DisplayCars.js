"use client";
import Link from "next/link";
import React, { useState } from "react";
import { CardFooter } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useSelector } from "react-redux";
import AddCarsForm from "./AddCarsForm";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

function DisplayCars({ cars, user }) {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [rowInfo, setRowInfo] = useState(null);
  const stateInfo = useSelector((state) => state.cars.cars);
  console.log(stateInfo, "satte");
  const handlEdit = (e, id) => {
    setShow(true);
    const editInfo = cars?.find((item) => item._id === id);
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
        router.push("/");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      {cars?.map((item) => (
        <div className="col-12 col-sm-12 col-md-6 col-xl-4 col-xxl-4 my-3">
          <Card style={{ width: "auto" }}>
            <Card.Img variant="top" src={item.image} />
            <Card.Body>
              <Card.Title>{item.name}</Card.Title>
              <Card.Subtitle>{item.model}</Card.Subtitle>
            </Card.Body>
            <CardFooter
              style={{
                backgroundColor: "#fff",
                padding: "10px",
                borderTop: "0px",
              }}
            >
              <Link href={`/cars/${item._id}`} className="btn btn-primary">
                View Details
              </Link>
              {user?.isAdmin ? (
                <>
                  <Button
                    variant="primary"
                    className="mx-3"
                    onClick={(e) => handlEdit(e, item._id)}
                  >
                    Edit Details
                  </Button>
                  <Button
                    variant="primary"
                    className="mx-3"
                    onClick={(e) => handlDelete(e, item._id)}
                  >
                    Delete
                  </Button>
                </>
              ) : null}
            </CardFooter>
          </Card>
        </div>
      ))}
      <AddCarsForm
        user={user}
        show={show}
        setShow={setShow}
        rowInfo={rowInfo}
      />
    </>
  );
}

export default DisplayCars;
