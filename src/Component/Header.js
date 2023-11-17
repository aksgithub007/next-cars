"use client";
import { setCurrentUser } from "@/Redux/userSlice";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import classes from "./header.module.css";
import { useRouter, usePathname } from "next/navigation";
import Swal from "sweetalert2";

function Header() {
  const router = useRouter();
  const pathName = usePathname();
  const [user, setUser] = useState();
  const stateInfo = useSelector((state) => state.user);
  const dispatch = useDispatch();

  //Get current User from api set to redux
  useEffect(() => {
    if (pathName !== "/login" && pathName !== "/register") {
      const getCurrentUser = async () => {
        const response = await axios.get(
          "http://localhost:3000/api/users/currentUser"
        );
        const finalData = await response.data.data;
        dispatch(setCurrentUser(finalData));
        setUser(finalData);
      };
      getCurrentUser();
    }
  }, [pathName]);

  //Logout Handle

  const logoutHandler = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/users/logout"
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
  console.log(user);
  console.log(stateInfo);
  return (
    <>
      {pathName !== "/login" && pathName !== "/register" ? (
        <div className={classes.topbar}>
          <div className={classes.brand}>
            <h2>
              <Link href="/" style={{ textDecoration: "none", color: "#fff" }}>
                ASD
              </Link>
            </h2>
          </div>
          <div className={classes.logoutSection}>
            <ul className={classes.list}>
              <li>{user?.name}</li>
              <li onClick={logoutHandler}>Logout</li>
            </ul>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default Header;
