import React from "react";
import { Field } from "formik";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme =>({
  textField:{
    width:"80%"
  }
}))

function SimpleTextInput(props) {
  const classes = useStyles();
  return (
    
        <Field
          className={classes.textField}
          variant="outlined"
          margin="normal"
          required
          disabled={props.disabled}
          id={props.id}
          label={props.label}
          type={props.type}
          name={props.name}
          value={props.value}
          onChange={props.onChange}
          autoFocus
          component={props.component}
          multiline={props.multiline}
          rows={props.rows}
        />
     
  );
}

export default SimpleTextInput;
