"use client";
import React from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import classes from "./register.module.css";
import Link from "next/link";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

function Register() {
  const router = useRouter();
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const submit = async (data) => {
    try {
      const finalInfo = {
        name: data.name,
        email: data.email,
        password: data.password,
      };
      const response = await axios.post(
        "https://carrental-delta.vercel.app/api/users/register",
        finalInfo
      );
      const finalData = await response.data;
      console.log(response, "Response coming from page");
      if (finalData.isSuccess) {
        Swal.fire({
          icon: "success",
          text: `${finalData.message}`,
        });
        router.push("/login");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: `${
          error.response.data ? error.response.data.message : error.message
        }`,
      });
    }
  };
  return (
    <>
      <div>
        <Container className={classes.centerAlign}>
          <Col className="col-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
            <div className={classes.formOuter_wrap}>
              <div className={classes.form_heading}>
                <h3>Register</h3>
              </div>
              <form className={classes.form} onSubmit={handleSubmit(submit)}>
                <div className="form-group">
                  <label className="form-label" htmlFor="name">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="form-control"
                    {...register("name", { required: true })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="email">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="form-control"
                    {...register("email", { required: true })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="password">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="form-control"
                    {...register("password", { required: true })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="cnfpassword">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="cnfpassword"
                    className="form-control"
                    {...register("cnfpassword", { required: true })}
                  />
                </div>
                <div className={classes.submitButton}>
                  <button type="submit" className="btn btn-primary">
                    Register
                  </button>
                  <span>
                    <Link href="/login" className={classes.link}>
                      Log In
                    </Link>
                  </span>
                </div>
              </form>
            </div>
          </Col>
        </Container>
      </div>
    </>
  );
}

export default Register;
