"use client";
import Image from "next/image";
import React from "react";

import Carousel from "react-bootstrap/Carousel";
function Carousels() {
  return (
    <>
      <Carousel>
        <Carousel.Item>
          <img src="./d1.jpg" />
        </Carousel.Item>
        <Carousel.Item>
          <img src="./d2.jpg" />
        </Carousel.Item>
      </Carousel>
    </>
  );
}

export default Carousels;
