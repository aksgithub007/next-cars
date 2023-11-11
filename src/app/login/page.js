"use client";
import React from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import classes from "../register/register.module.css";
import Link from "next/link";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

function Login() {
  const router = useRouter();
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const submitHandler = async (data) => {
    try {
      const finalInfo = {
        email: data.email,
        password: data.password,
      };
      const response = await axios.post(
        "http://localhost:3000/api/users/login",
        finalInfo
      );
      const finalData = await response.data;
      if (finalData.isSuccess) {
        Swal.fire({
          icon: "success",
          text: `${finalData.message}`,
        });
        router.push("/");
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
                <h3>Login</h3>
              </div>
              <form
                className={classes.form}
                onSubmit={handleSubmit(submitHandler)}
              >
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

                <div className={classes.submitButton}>
                  <button type="submit" className="btn btn-primary">
                    Login
                  </button>
                  <span>
                    <Link href="/register" className={classes.link}>
                      Create new user
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

export default Login;
