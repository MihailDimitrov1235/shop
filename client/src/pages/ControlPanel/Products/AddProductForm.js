import React from "react";
import { Formik, Form, Field } from "formik";
import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  field: {
    "& label": {
      fontWeight: "bold",
      marginBottom: "8px",
    },
    "& input": {
      width: "300px",
      height: "32px",
      padding: "8px",
      borderRadius: "4px",
      border: "1px solid #ccc",
      resize: "none",
      "&:focus": {
        outline: "none",
        borderColor: "#666",
      },
    },
    "& textarea": {
      width: "300px",
      height: "80px",
      padding: "8px",
      borderRadius: "4px",
      border: "1px solid #ccc",
      resize: "none",
      "&:focus": {
        outline: "none",
        borderColor: "#666",
      },
    },
  },
  button: {
    width: "100px",
    height: "32px",
    marginTop: "16px",
    backgroundColor: "#3f51b5",
    color: "white",
    border: "none",
    borderRadius: "4px",
    "&:hover": {
      cursor: "pointer",
    },
    "&:focus": {
      outline: "none",
    },
  },
});

const AddProductForm = () => {
  const classes = useStyles();
  const initialValues = {
    productName: "",
    authorName: "",
    shortDescription: "",
    description: "",
  };

  const onSubmit = (values) => {
    // handle form submission here
  };
  return (
    <Box
      width="400px"
      height="500px"
      display="flex"
      justifyContent="center"
      alignItems="center"
      style={{ margin: "0 auto" }}
    >
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ isSubmitting }) => (
          <Form className={classes.form}>
            <Field name="productName" className={classes.field}>
              {({ field, form }) => (
                <Box>
                  <label>Product Name:</label>
                  <input type="text" {...field} />
                  {form.errors.productName && form.touched.productName && (
                    <div>{form.errors.productName}</div>
                  )}
                </Box>
              )}
            </Field>
            <Field name="authorName" className={classes.field}>
              {({ field, form }) => (
                <Box>
                  <label>Author Name:</label>
                  <input type="text" {...field} />
                  {form.errors.authorName && form.touched.authorName && (
                    <div>{form.errors.authorName}</div>
                  )}
                </Box>
              )}
            </Field>
            <Field name="shortDescription" className={classes.field}>
              {({ field, form }) => (
                <Box>
                  <label>Short Description:</label>
                  <textarea {...field} maxLength={50} />
                  {form.errors.shortDescription &&
                    form.touched.shortDescription && (
                      <div>{form.errors.shortDescription}</div>
                    )}
                </Box>
              )}
            </Field>
            <Field name="description" className={classes.field}>
              {({ field, form }) => (
                <Box>
                  <label>Description:</label>
                  <textarea {...field} />
                  {form.errors.description && form.touched.description && (
                    <div>{form.errors.description}</div>
                  )}
                </Box>
              )}
            </Field>
            <button
              type="submit"
              disabled={isSubmitting}
              className={classes.button}
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default AddProductForm;
