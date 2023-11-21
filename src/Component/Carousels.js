"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";

import Carousel from "react-bootstrap/Carousel";
function Carousels() {
  const pathName = usePathname();
  return (
    <>
      {pathName === "/" ? (
        <Carousel>
          <Carousel.Item>
            <img src="./d1.jpg" alt="sample Text" />
          </Carousel.Item>
          <Carousel.Item>
            <img src="./d2.jpg" alt="sample Text" />
          </Carousel.Item>
        </Carousel>
      ) : null}
    </>
  );
}

export default Carousels;
