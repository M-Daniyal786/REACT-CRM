import React, { useEffect, useState } from "react";
import { Field, Formik } from "formik";
import {
  Button,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@material-ui/core";
import SimpleTextInput from "../customers/SimpleTextInput";
import { createAPIEndPoint, FRONTEND_URL } from "../../api";

const useStyles = makeStyles((theme) => ({
  textGrid: {
    display: "flex",
    justifyContent: "center",
  },
  textGrid1: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
  },
  textGrid2: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

function GeneratePaymentForm(props) {
  const classes = useStyles();
  const [employee, setEmployee] = useState([]);
  const [orderStatus, SetOrderStatus] = useState("");

  const { isLoading, setIsLoading, customerId } = props;

  const [id, setId] = useState("");
  const [loadingLink, setLoadingLink] = useState(false);

  const handleRadioChange = (e) => {
    SetOrderStatus(e.target.value);
  };

  const handleOrderStatusChange = () => {
    createAPIEndPoint("order")
      .update(props.orderId, {
        orderStatus: orderStatus,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        alert("ERROR!");
      });
  };

  useEffect(() => {
    console.log("RE RENDER!");
  }, [orderStatus, id]);

  return (
    <div>
      <Formik
        initialValues={{
          customerId: props.customerId,
          orderId: props.orderId,
          title: "",
          description: "",
          amount: 0,
          currency: "",
        }}
        onSubmit={(data) => {
          setLoadingLink(true);
          createAPIEndPoint("payment")
            .create(data)
            .then((res) => {
              console.log(res);
              alert("Created!")
              setId(res.data.id);
              setLoadingLink(false);
            })
            .catch((err) => {
              console.log("=> ERROR!", err);
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
          <form
            onSubmit={(values) => {
              handleOrderStatusChange();
              handleSubmit(values);
            }}
          >
            <Grid
              container
              spacing={1}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Grid item xs={12} sm={8} className={classes.textGrid}>
                <SimpleTextInput
                  name="title"
                  id="title"
                  label="Title"
                  type="text"
                  value={values.title}
                  onChange={handleChange}
                  component={TextField}
                />
              </Grid>
              <Grid item xs={12} sm={8} className={classes.textGrid}>
                <SimpleTextInput
                  name="description"
                  id="description"
                  label="Description"
                  type="text"
                  multiline={true}
                  value={values.description}
                  onChange={handleChange}
                  component={TextField}
                  rows={4}
                />
              </Grid>
              <Grid item xs={12} sm={8} className={classes.textGrid}>
                <SimpleTextInput
                  name="amount"
                  id="amount"
                  label="Amount"
                  type="number"
                  value={values.amount}
                  onChange={handleChange}
                  component={TextField}
                />
              </Grid>
              <Grid item xs={12} sm={8} className={classes.textGrid}>
                <FormControl
                  style={{ width: "80%", marginTop: "4%" }}
                  variant="outlined"
                  // className={classes.formControl}
                >
                  <InputLabel id="demo-simple-select-outlined-label">
                    Currency
                  </InputLabel>
                  <Field
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    name="currency"
                    label="Currency"
                    value={values.currency}
                    onChange={handleChange}
                    as={Select}
                  >
                    <MenuItem value="USD">USD</MenuItem>
                    <MenuItem value="CAD">CAD</MenuItem>
                    <MenuItem value="GBP">GBP</MenuItem>
                  </Field>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={8} className={classes.textGrid1}>
                <FormControl component="fieldset">
                  <RadioGroup
                    name="orderStatus"
                    value={orderStatus}
                    onChange={handleRadioChange}
                  >
                    <FormControlLabel
                      value="Paid"
                      control={<Radio />}
                      label="Already Paid"
                    />
                    <FormControlLabel
                      value="Unpaid"
                      control={<Radio />}
                      label="Pay with Stripe/Paypal"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              {id && !loadingLink && orderStatus == "Unpaid" ? (
                <Grid container className={classes.textGrid1}>
                  <Grid item xs={12} sm={8} className={classes.textGrid2}>
                    <SimpleTextInput
                      name="Link"
                      label="Stripe Link"
                      type="text"
                      value={`${FRONTEND_URL}checkout/stripe/${id}`}
                      component={TextField}
                    />
                  </Grid>
                  <Grid item xs={12} sm={8} className={classes.textGrid2}>
                    <SimpleTextInput
                      name="Link"
                      label="Paypal Link"
                      type="text"
                      value={`${FRONTEND_URL}checkout/paypal/${id}`}
                      component={TextField}
                    />
                  </Grid>
                </Grid>
              ) : null}
              {!id && loadingLink && orderStatus == "Unpaid" ? (
                <Grid item xs={12} sm={8} className={classes.textGrid1}>
                  <CircularProgress color="secondary" size={20} />
                </Grid>
              ) : null}

              <Grid item xs={12} sm={8} className={classes.button}>
                <Grid item xs={12} sm={12}>
                  {" "}
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    {orderStatus == "Unpaid" ? (
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        style={{ width: "80%", marginTop: "10px" }}
                      >
                        Generate Link
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        style={{ width: "80%", marginTop: "10px" }}
                      >
                        Submit
                      </Button>
                    )}
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
              {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
            </Grid>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default GeneratePaymentForm;
