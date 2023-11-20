"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ImageUploading from "react-images-uploading";
import { MdDeleteOutline } from "react-icons/md";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

function AddCarsForm({ user, show, setShow, rowInfo }) {
  const [images, setImages] = React.useState([]);
  const router = useRouter();
  const handleClose = () => setShow(false);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    setImages(imageList);
  };

  const submitHandler = async (data) => {
    try {
      const finalCar = {
        _id: rowInfo ? rowInfo?._id : null,
        name: data.name,
        model: data.model,
        varient: data.varient,
        average: Number(data.average),
        rent: Number(data.rent),
        image: images ? images[0]?.data_url : rowInfo?.image,
        userId: user?._id,
      };
      // console.log(finalCar);
      const response = rowInfo
        ? await axios.put("http://localhost:3000/api/users/car", finalCar)
        : await axios.post("http://localhost:3000/api/users/car", finalCar);
      const finalInfo = await response.data;
      if (finalInfo.isSuccess) {
        Swal.fire({
          icon: "success",
          text: `${finalInfo.message}`,
        });
        setShow(false);
        reset();
        setImages([]);

        router.push("/cars");
      } else {
        Swal.fire({
          icon: "error",
          text: `${finalInfo.message}`,
        });
        setShow(false);
        reset();
        setImages([]);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: `${error.message}`,
      });
      setShow(false);
      reset();
      setImages([]);
    }
  };

  useEffect(() => {
    console.log(rowInfo, "Edit Part Info");

    if (rowInfo) {
      reset({
        name: rowInfo?.name,
        model: rowInfo?.model,
        varient: rowInfo?.varient,
        average: rowInfo?.average,
        rent: rowInfo?.rent,
      });
    } else {
      reset({
        name: " ",
        model: " ",
        varient: " ",
        average: " ",
        rent: " ",
      });
    }
  }, [reset, rowInfo]);

  return (
    <>
      <div>
        <Modal
          show={show}
          onHide={handleClose}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Body>
            <form onSubmit={handleSubmit(submitHandler)}>
              <div className="form-group mb-3">
                <label className="form-label" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Name Here"
                  id="name"
                  {...register("name", { required: true })}
                />
              </div>
              <div className="form-group mb-3">
                <label className="form-label" htmlFor="model">
                  Model
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Model Here"
                  id="model"
                  {...register("model", { required: true })}
                />
              </div>
              <div className="form-group mb-3">
                <label className="form-label" htmlFor="varient">
                  Select Varient
                </label>
                <select
                  id="varient"
                  className="form-select"
                  aria-label="Select Variant"
                  {...register("varient", { required: true })}
                >
                  <option selected>Select Varient</option>
                  <option value="petrol">Petrol</option>
                  <option value="diesel">Diesel</option>
                  <option value="electric">Electric</option>
                </select>
              </div>
              <div className="form-group mb-3">
                <label className="form-label" htmlFor="average">
                  Average
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Average Here"
                  id="average"
                  {...register("average", { required: true })}
                />
              </div>

              <div className="form-group mb-3">
                <label className="form-label" htmlFor="rent">
                  Rent
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Rent Here"
                  id="rent"
                  {...register("rent", { required: true })}
                />
              </div>
              <div>
                <ImageUploading
                  multiple
                  value={images}
                  onChange={onChange}
                  maxNumber={1}
                  maxFileSize={5000000}
                  dataURLKey="data_url"
                  acceptType={["jpg"]}
                >
                  {({
                    imageList,
                    onImageUpload,
                    onImageRemoveAll,
                    onImageUpdate,
                    onImageRemove,
                    isDragging,
                    dragProps,
                  }) => (
                    // write your building UI
                    <div
                      className="upload__image-wrapper"
                      style={{
                        border: "2px dotted #ddd",
                        padding: "5px",
                      }}
                    >
                      <button
                        className="btn"
                        type="button"
                        style={{
                          border: "1px solid #d3d3d3",
                          color: "#141414",
                        }}
                        onClick={onImageUpload}
                        {...dragProps}
                      >
                        Click or Drop here
                      </button>
                      &nbsp;
                      <div
                        style={{
                          marginTop: "10px",
                          position: "relative",
                          zIndex: "99",
                          display: "flex",
                          justifyContent: "flex-start",
                        }}
                      >
                        {images?.map((image, index) => (
                          <>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "flex-start",
                                position: "relative",
                                zIndex: "99",
                              }}
                            >
                              <img
                                key={index}
                                src={rowInfo ? rowInfo?.image : image?.data_url}
                                style={{ width: "60px", height: "60px" }}
                                //
                                //  onClick={() =>
                                //    handleTechLightbox(
                                //      index,
                                //      image.data_url
                                //    )
                                //  }
                              />
                            </div>
                            <div>
                              <button
                                type="button"
                                onClick={() => onImageRemove(index)}
                              >
                                <MdDeleteOutline />
                              </button>
                            </div>
                            {errors?.maxFileSize &&
                              Swal.fire({
                                icon: "warning",
                                title: "Maximum File Size Limit is 5 MB",
                                showConfirmButton: false,
                                timer: 1000,
                              })}
                          </>
                        ))}
                      </div>
                    </div>
                  )}
                </ImageUploading>
              </div>
              <div className="mt-3 d-flex justify-content-end">
                <Button type="button" variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button className="mx-3" variant="primary" type="submit">
                  Submit
                </Button>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}

export default AddCarsForm;
