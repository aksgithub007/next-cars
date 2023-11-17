"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Container, Row } from "react-bootstrap";
import classes from "./HomeCarSection.module.css";

function HomeCarSection() {
  const [cars, setCars] = useState([]);
  useEffect(() => {
    const getAllCars = async () => {
      const response = await axios.get("http://localhost:3000/api/users/car");
      const finalData = await response.data;
      setCars(finalData?.data);
    };
    getAllCars();
  }, []);

  return (
    <>
      <Container>
        <Row>
          <div className="col-12">
            <div className="Heading">
              <h4>Choose your Desired Car Model</h4>
              <p>Who are in extremely love with eco friendly system.</p>
            </div>
          </div>
          {cars.slice(0, 3).map((item) => (
            <div className="col-4">
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
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
            </div>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default HomeCarSection;
