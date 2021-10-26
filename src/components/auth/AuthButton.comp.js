import React from "react";
import Button from "@material-ui/core/Button";
import useStyles from './styles/authStyles'


function AuthButton(props) {
  const classes = useStyles();
  return (
    <Button
      type="submit"
      fullWidth
      variant="contained"
      className={classes.submit}
    >
      {props.buttonText}
    </Button>
  );
}

export default AuthButton;
