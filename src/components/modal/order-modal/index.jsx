import React, { useState, useEffect } from "react";
import { Box, Typography, Modal, Button, TextField, Select, MenuItem } from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { orderValidationSchema } from "../../../utils/validation";
import order from "../../../service/order";
import service from "../../../service/service";
import Notification from "../../../utils/notification";

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

const OrderModal = ({ open, handleClose, edit, fetchData }) => {
    const [services, setServices] = useState([]);
    const [error, setError] = useState(null); 
    const [params, setParams] = useState({
        limit: 5,
        page: 1
    });

    const initialValues = {
        amount: edit ? edit.amount : 0,
        client_full_name: edit ? edit.client_full_name : "",
        client_phone_number: edit ? edit.client_phone_number : "+998",
        service_id: edit ? edit.service_id : ""
    };

    const fetchInfo = async () => {
        try {
            const response = await service.get(params);
            if (response.status === 200) {
                setServices(response.data.services);
            }
        } catch (error) {
            setError("Error fetching data");
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchInfo();
    }, [params]);

    const handleSubmit = async (values) => {
        try {
            console.log("Submitted values:", values);
            const payload = edit ? { id: edit.id, ...values } : values;

            let response;
            if (edit && edit.id) {
                response = await order.edit(payload);
                Notification({
                    title: "Successfully edited",
                    type: "success",
                });
            } else {
                response = await order.add(payload);
                Notification({
                    title: "Successfully added",
                    type: "success",
                });
            }

            if (response.status === 201) {
                fetchData();
                handleClose();
            } else {
                console.error("Error: ", response.statusText, response.data);
            }
        } catch (err) {
            console.error("Error submitting form: ", err.response ? err.response.data : err);
        }
    };

    useEffect(() => {
        if (edit) {
            console.log("Edit mode enabled", edit);
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
                        {edit ? "Edit Order" : "Add Order"}
                    </Typography>
                    <Formik
                        initialValues={initialValues}
                        onSubmit={handleSubmit}
                        validationSchema={orderValidationSchema}
                        enableReinitialize={true}
                    >
                        {({ isSubmitting }) => (
                            <Form>
                                <Field
                                    name="amount"
                                    type="number"
                                    as={TextField}
                                    label="Amount"
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                    helperText={<ErrorMessage name="amount" component="span" />}
                                />
                                <Field
                                    name="client_full_name"
                                    type="text"
                                    as={TextField}
                                    label="Full name"
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                    helperText={<ErrorMessage name="client_full_name" component="span" />}
                                />
                                <Field
                                    name="client_phone_number"
                                    type="text"
                                    as={TextField}
                                    label="Phone number"
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                    helperText={<ErrorMessage name="client_phone_number" component="span" />}
                                />

                                <Field
                                    name="service_id"
                                    as={Select}
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                    helperText={<ErrorMessage name="service_id" component="span" />}
                                >
                                    {services.map((item, index) => (
                                        <MenuItem key={index} value={item.id}>{item.name}</MenuItem>
                                    ))}
                                </Field>

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

export default OrderModal;
