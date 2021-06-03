import React, { useEffect, useState } from "react";
import { Field, Formik } from "formik";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
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

  const { isLoading, setIsLoading } = props;

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
          customerName: "",
          email: "",
          password: "",
          customerCountry: "",
          customerAddress: "",
          contactNumber: "",
          brand: "",
          ipAddress: "",
          referredEmployeeId: "",
        }}
        onSubmit={(data) => {
          createAPIEndPoint("customer")
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
              <Grid item xs={12} sm={6} className={classes.textGrid}>
                <SimpleTextInput
                  name="customerName"
                  id="customerName"
                  label="Customer Name"
                  type="text"
                  value={values.customerName}
                  onChange={handleChange}
                  component={TextField}
                />
              </Grid>
              <Grid item xs={12} sm={6} className={classes.textGrid}>
                <SimpleTextInput
                  name="email"
                  id="email"
                  label="Email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  component={TextField}
                />
              </Grid>
              <Grid item xs={12} sm={6} className={classes.textGrid}>
                <SimpleTextInput
                  name="password"
                  id="password"
                  label="Password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  component={TextField}
                />
              </Grid>
              <Grid item xs={12} sm={6} className={classes.textGrid}>
                <SimpleTextInput
                  name="customerCountry"
                  id="customerCountry"
                  label="Customer Country"
                  type="text"
                  value={values.customerCountry}
                  onChange={handleChange}
                  component={TextField}
                />
              </Grid>
              <Grid item xs={12} sm={6} className={classes.textGrid}>
                <SimpleTextInput
                  name="customerAddress"
                  id="customerAddress"
                  label="Customer Address"
                  type="text"
                  value={values.customerAddress}
                  onChange={handleChange}
                  component={TextField}
                />
              </Grid>
              <Grid item xs={12} sm={6} className={classes.textGrid}>
                <SimpleTextInput
                  name="contactNumber"
                  id="contactNumber"
                  label="Contact Number"
                  type="text"
                  value={values.contactNumber}
                  onChange={handleChange}
                  component={TextField}
                />
              </Grid>
              <Grid item xs={12} sm={6} className={classes.textGrid}>
                <SimpleTextInput
                  name="brand"
                  id="brand"
                  label="Brand"
                  type="text"
                  value={values.brand}
                  onChange={handleChange}
                  component={TextField}
                />
              </Grid>
              <Grid item xs={12} sm={6} className={classes.textGrid}>
                <SimpleTextInput
                  name="ipAddress"
                  id="ipAddress"
                  label="Ip Address"
                  type="text"
                  value={values.ipAddress}
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
                    Employee
                  </InputLabel>
                  <Field
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    name="referredEmployeeId"
                    label="Employee"
                    value={values.referredEmployeeId}
                    onChange={handleChange}
                    as={Select}
                  >
                    {employee.map((item, index) => {
                      return (
                        <MenuItem key={index} value={item.id}>
                          {item.firstName}
                        </MenuItem>
                      );
                    })}
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
