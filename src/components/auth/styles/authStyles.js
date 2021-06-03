import { indigo } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    // color: "white",
  },
  paper: {
    marginTop: theme.spacing(20),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "white",
    width: "100%",
    padding: 50,
    borderRadius: 10,
    boxShadow: "0 3px 5px 2px rgba(100, 105, 135, .3)",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: indigo[400]
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  headingStyle: {
    color: "black",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    padding: "10px 0px 10px 0px",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    borderRadius: "5px",
    backgroundColor: indigo[400],
    color:"white",
    transition: "transform .5s",
    "&:hover": {
      color: "#fff",
      backgroundColor: indigo[500],
      transform: "scale(1.03)",
      
    },
  },
}));

export default useStyles;
