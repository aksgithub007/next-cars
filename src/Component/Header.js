"use client";
import { setCurrentUser } from "@/Redux/userSlice";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import classes from "./header.module.css";
import { useRouter, usePathname } from "next/navigation";
import Swal from "sweetalert2";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";

function Header({ children }) {
  const router = useRouter();
  const pathName = usePathname();
  const [user, setUser] = useState();
  const stateInfo = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const getCurrentUser = async () => {
    try {
      const response = await axios.get(
        "https://carrental-delta.vercel.app/api/users/currentUser"
      );
      const finalData = await response.data.data;
      console.log(finalData, "Current User");
      dispatch(setCurrentUser(finalData));
      setUser(finalData);
    } catch (error) {
      console.log(error);
    }
  };

  //Get current User from api set to redux
  useEffect(() => {
    if (pathName !== "/login" || pathName !== "/register") {
      getCurrentUser();
    }
  }, [pathName]);

  //Logout Handle

  const logoutHandler = async () => {
    try {
      const response = await axios.get(
        "https://carrental-delta.vercel.app/api/users/logout"
      );
      const finalData = response.data;
      if (finalData.isLogout) {
        router.push("/login");
        Swal.fire({
          icon: "success",
          text: `${finalData.message}`,
        });
        setUser(null);
        dispatch(setCurrentUser(null));
      }
    } catch (error) {
      Swal.fire({
        icon: "warning",
        text: `${error.message}`,
      });
    }
  };
  console.log(user, "User");
  console.log(stateInfo, "State Info");
  return (
    <>
      <header>
        {pathName !== "/login" && pathName !== "/register" ? (
          <Navbar style={{ background: "#cfe2ff" }}>
            <Container fluid>
              <Navbar.Brand href="/" style={{ color: "#495057" }}>
                Car Rental
              </Navbar.Brand>
              <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-lg`} />
              <Navbar.Offcanvas
                id={`offcanvasNavbar-expand-lg`}
                aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
                placement="end"
              >
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>
                    Car Rental
                  </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <Nav className="justify-content-end flex-grow-1 pe-3">
                    {user?.isAdmin ? (
                      <>
                        <Nav.Link href="/general">General</Nav.Link>
                        <Nav.Link href="/users">Users</Nav.Link>
                        <Nav.Link href="/cars">Cars</Nav.Link>
                        <Nav.Link href="/bookings">Bookings</Nav.Link>
                      </>
                    ) : (
                      <>
                        <Nav.Link href="/general">General</Nav.Link>
                        <Nav.Link href="/cars">Cars</Nav.Link>
                        <Nav.Link href="/bookings">Bookings</Nav.Link>
                      </>
                    )}
                    <Nav.Link href="/">{user?.name}</Nav.Link>
                    <Nav.Link onClick={logoutHandler}>Logout</Nav.Link>
                  </Nav>
                </Offcanvas.Body>
              </Navbar.Offcanvas>
            </Container>
          </Navbar>
        ) : null}
        {children}
      </header>
    </>
  );
}

export default Header;
