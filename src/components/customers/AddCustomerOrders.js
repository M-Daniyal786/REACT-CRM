import React, { useEffect, useState } from "react";
import { Field, Formik } from "formik";
import { Button, FormControl, Grid, InputLabel, makeStyles, MenuItem, Select, TextField } from "@material-ui/core";
import SimpleTextInput from "./SimpleTextInput";
import { createAPIEndPoint } from "../../api";

const useStyles = makeStyles((theme) => ({
  textGrid: {
    display: "flex",
    justifyContent: "center",
  },
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

function AddCustomerForm(props) {
  const classes = useStyles();
  const [employee, setEmployee] = useState([]);

  const { isLoading, setIsLoading, customerId } = props;

  useEffect(() => {
    createAPIEndPoint("employee")
      .fetchAll()
      .then((res) => {
        setEmployee(res.data.results);
        console.log(res);
      });
  }, []);

  return (
    <div>
      <Formik
        initialValues={{
          customerId: props.id,
          totalPayment: 0,
          credit: 0,
          balance: 0,
          orderName: "",
          orderType:"",
        }}
        onSubmit={(data) => {
          createAPIEndPoint("order")
            .create(data)
            .then((res) => {
              alert("created!");
              setIsLoading(true);
            })
            .catch((err) => {
              alert("error!");
            });
        }}
      >
        {({
          values,
          handleSubmit,
          isSubmitting,
          handleChange,
          errors,
          touched,
          resetForm,
        }) => (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={1}>
              {/* <Grid item xs={12} sm={6} className={classes.textGrid}>
                <SimpleTextInput
                  name="customerId"
                  id="customerId"
                  label="Customer ID"
                  type="text"
                  disabled={true}
                  value={values.customerId}
                  onChange={handleChange}
                  component={TextField}
                />
              </Grid> */}
              <Grid item xs={12} sm={6} className={classes.textGrid}>
                <SimpleTextInput
                  name="orderName"
                  id="orderName"
                  label="Order Name"
                  type="orderName"
                  value={values.orderName}
                  onChange={handleChange}
                  component={TextField}
                />
              </Grid>
              <Grid item xs={12} sm={6} className={classes.textGrid}>
                <SimpleTextInput
                  name="totalPayment"
                  id="totalPayment"
                  label="Total Payment"
                  type="number"
                  value={values.totalPayment}
                  onChange={handleChange}
                  component={TextField}
                />
              </Grid>
              <Grid item xs={12} sm={6} className={classes.textGrid}>
                <SimpleTextInput
                  name="credit"
                  id="credit"
                  label="Credit"
                  type="number"
                  value={values.credit}
                  onChange={handleChange}
                  component={TextField}
                />
              </Grid>
              <Grid item xs={12} sm={6} className={classes.textGrid}>
                <SimpleTextInput
                  name="balance"
                  id="balance"
                  label="Balance"
                  type="number"
                  value={values.balance}
                  onChange={handleChange}
                  component={TextField}
                />
              </Grid>
              <Grid item xs={12} sm={6} className={classes.textGrid}>
                <FormControl
                  style={{ width: "80%", marginTop: "4%" }}
                  variant="outlined"
                  // className={classes.formControl}
                >
                  <InputLabel id="demo-simple-select-outlined-label">
                    Order Type
                  </InputLabel>
                  <Field
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    name="orderType"
                    label="Order Type"
                    value={values.orderType}
                    onChange={handleChange}
                    as={Select}
                  >
                    <MenuItem value="Banner">Banner</MenuItem>
                    <MenuItem value="Logo">Logo</MenuItem>
                    <MenuItem value="WordPress">WordPress</MenuItem>
                    <MenuItem value="WordPress">WordPress</MenuItem>
                    <MenuItem value="Web-App">Web App</MenuItem>
                    <MenuItem value="Mobile-App">Mobile App</MenuItem>

                  </Field>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} className={classes.button}>
                <Grid item xs={12} sm={12}>
                  {" "}
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      style={{ width: "80%", marginTop: "10px" }}
                    >
                      Submit
                    </Button>
                  </div>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <Button
                      variant="contained"
                      color="default"
                      style={{ width: "80%", marginTop: "10px" }}
                      type="reset"
                      onClick={resetForm}
                    >
                      Reset
                    </Button>
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default AddCustomerForm;
