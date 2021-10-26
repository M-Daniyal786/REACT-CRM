import React from "react";
import { Field } from "formik";
import useStyles from "./styles/authStyles";
import styledTextField from "./styles/styledTextField";

function TextInput(props) {
  const classes = useStyles();
  return (
    
        <Field
          className={classes.textField}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id={props.id}
          label={props.label}
          type={props.type}
          name={props.name}
          value={props.value}
          onChange={props.onChange}
          InputProps={{
            classes: {
              root: classes.root,
            },
          }}
          autoFocus
          component={styledTextField}
        />
     
  );
}

export default TextInput;
