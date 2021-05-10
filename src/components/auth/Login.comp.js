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
import { Formik,ErrorMessage } from "formik";
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
          SIGN IN
        </Typography>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={(data, { setSubmitting, resetForm }) => {
            setSubmitting(true);
            createAPIEndPoint("login")
              .create(data)
              .then((res) => {
                alert("SUCCESS!!")
                console.log(res)
              })
              .catch(err => {
                alert("ERROR!")
                console.log("ERROR!====>",err.message)
              })
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

              <AuthButton buttonText="Sign In" />

              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
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
