import React, { useState, useEffect } from "react";
import { Box, Typography, Modal, Button, TextField } from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { ServiceValidationSchema } from "../../../utils/validation";
import service from "../../../service/service";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  borderRadius: 1.3,
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #fff",
  boxShadow: 24,
  p: 3,
  outline: "none",
};

const ServiceModal = ({ open, handleClose, edit }) => {
  const initialValues = {
    name: edit ? edit.name : "",
    price: edit ? edit.price : 0,
  };

  const handleSubmit = async (values) => {
    try {
      let response;
      if (edit) {
        response = await service.edit(values)
      } else {
        response = await service.add(values);
      }

      if (response.status === 200) {
        handleClose();
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (edit) {
      console.log("Nimadir")
    }
  }, [edit]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {edit ? "Edit Service" : "Add Service"}
          </Typography>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={ServiceValidationSchema}
            enableReinitialize={true}
          >
            {({ isSubmitting }) => (
              <Form>
                <Field
                  name="name"
                  type="text"
                  as={TextField}
                  label="Service Name"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  helperText={<ErrorMessage name="name" component="span" />}
                />
                <Field
                  name="price"
                  type="number"
                  as={TextField}
                  label="Service Price"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  helperText={<ErrorMessage name="price" component="span" />}
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "end",
                    gap: "12px",
                    marginTop: "5px",
                  }}
                >
                  <Button
                    onClick={handleClose}
                    type="button"
                    variant="contained"
                    color="warning"
                  >
                    Close
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    color="success"
                    disabled={isSubmitting}
                  >
                    {edit ? "Update" : "Add"}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </Box>
    </Modal>
  );
};

export default ServiceModal;
