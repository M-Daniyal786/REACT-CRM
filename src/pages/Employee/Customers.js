import { Button, makeStyles, Paper } from "@material-ui/core";
import React, { useState } from "react";
import AddCustomerForm from "../../components/customers/AddCustomerForm";
import AddIcon from "@material-ui/icons/Add";
import Popup from "../../components/Popup";
import CustomerList from "../../components/customers/CustomerList";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(1),
    padding: theme.spacing(2),
  },
}));

function Customers() {
  const classes = useStyles();
  const [openPopup, setOpenPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div>
      <Paper className={classes.pageContent}>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            width: "100%",
            marginBottom: "20px",
          }}
        >
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              setOpenPopup(true);
            }}
            startIcon={<AddIcon />}
          >
            Add New
          </Button>
        </div>
        <Popup title={"Add New Customer"} openPopup={openPopup} setOpenPopup={setOpenPopup}>
          <AddCustomerForm isLoading={isLoading} setIsLoading={setIsLoading} />
        </Popup>

        <CustomerList isLoading={isLoading} setIsLoading={setIsLoading} />
      </Paper>
    </div>
  );
}

export default Customers;
