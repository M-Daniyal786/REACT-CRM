import React from "react";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import AuthButton from "./AuthButton.comp";
import Copyright from "../footer/Copyright";
import TextInput from "./TextInput.comp";
import { Formik, ErrorMessage } from "formik";
import useStyles from "./styles/authStyles";
import { createAPIEndPoint } from "../../api";

export default function Login() {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography
          component="h1"
          variant="h5"
          className={classes.headingStyle}
        >
          SIGN UP
        </Typography>
        <Formik
          initialValues={{
            username: "",
            email: "",
            password: "",
            confirmpassword: "",
          }}
          onSubmit={(data, { setSubmitting, resetForm }) => {
            let { confirmpassword, ...rest } = data;
            let record = rest;
            setSubmitting(true);
            createAPIEndPoint("user")
              .create(record)
              .then((res) => {
                alert("CREATED!!");
                console.log(res);
              })
              .catch((err) => {
                console.log("ERROR!====>", err.message);
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
          }) => (
            <form className={classes.form} onSubmit={handleSubmit}>
              <TextInput
                name="username"
                id="username"
                label="Username"
                type="username"
                value={values.username}
                onChange={handleChange}
              />
              <TextInput
                name="email"
                id="email"
                label="Email"
                type="email"
                value={values.email}
                onChange={handleChange}
              />
              <TextInput
                name="password"
                id="password"
                label="Password"
                type="password"
                value={values.password}
                onChange={handleChange}
              />
              <TextInput
                name="confirmpassword"
                id="confirmpassword"
                label="Confirm Password"
                type="password"
                value={values.confirmpassword}
                onChange={handleChange}
              />
              <AuthButton buttonText="Sign Up" />

              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    <span className="text-sm text-indigo-500">
                      {" "}
                      Forgot password?{" "}
                    </span>
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/" variant="body2">
                    <span className="text-sm text-indigo-500">
                      {" "}
                      {"Have an account? Sign In"}
                    </span>
                  </Link>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      </div>
      <Box mt={12}>
        <Copyright />
      </Box>
    </Container>
  );
}
