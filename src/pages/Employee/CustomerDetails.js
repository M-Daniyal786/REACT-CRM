import { Button, Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import AddCustomerOrders from "../../components/customers/AddCustomerOrders";
import CustomerOrderList from "../../components/customers/CustomerOrderList";
import Popup from "../../components/Popup";
import AddIcon from "@material-ui/icons/Add";
import { createAPIEndPoint } from "../../api";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(1),
    padding: theme.spacing(2),
  },
}));

function CustomerDetails(props) {
  const classes = useStyles();
  const [openPopup, setOpenPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const { id } = props.match.params;

  useEffect(() => {
    createAPIEndPoint("customer")
      .fetchById(id)
      .then((res) => {
        delete res.data["referredEmployeeId"];
        setData(res.data);
        // console.log(res.data)
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <div>
      <Paper className={classes.pageContent}>
        {/* {Object.keys(data).map((key, index) => {
          const myItem = data[key].toString();

          return ( */}

        <Grid container>
          <Grid item sm={12} md={6} style={{ marginTop: 10 }}>
            <p class="bg-indigo-400 p-2.5 w-full text-white rounded-tl rounded-bl">
              Brand
            </p>
          </Grid>
          <Grid item sm={12} md={6} style={{ marginTop: 10 }}>
            <p class="bg-indigo-300 p-2.5 w-full text-white rounded-tr rounded-br">{data.brand}</p>
          </Grid>
          <Grid item sm={12} md={6} style={{ marginTop: 10 }}>
            <p class="bg-indigo-400 p-2.5 w-full text-white rounded-tl rounded-bl">
              Customer Name
            </p>
          </Grid>
          <Grid item sm={12} md={6} style={{ marginTop: 10 }}>
            <p class="bg-indigo-300 p-2.5 w-full text-white rounded-tr rounded-br">
              {data.customerName}
            </p>
          </Grid>
          <Grid item sm={12} md={6} style={{ marginTop: 10 }}>
            <p class="bg-indigo-400 p-2.5 w-full text-white rounded-tl rounded-bl">
              Customer Country
            </p>
          </Grid>
          <Grid item sm={12} md={6} style={{ marginTop: 10 }}>
            <p class="bg-indigo-300 p-2.5 w-full text-white rounded-tr rounded-br">
              {data.customerCountry}
            </p>
          </Grid>
          <Grid item sm={12} md={6} style={{ marginTop: 10 }}>
            <p class="bg-indigo-400 p-2.5 w-full text-white rounded-tl rounded-bl">
              Email
            </p>
          </Grid>
          <Grid item sm={12} md={6} style={{ marginTop: 10 }}>
            <p class="bg-indigo-300 p-2.5 w-full text-white rounded-tr rounded-br">{data.email}</p>
          </Grid>
        </Grid>

        {/* );
        })} */}
      </Paper>
      </div>
      <div class="mt-5">
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
            Add Order
          </Button>
        </div>
        <Popup
          title={"Add Order For Customer"}
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
        >
          <AddCustomerOrders isLoading={isLoading} setIsLoading={setIsLoading} id={id}/>
        </Popup>

        <CustomerOrderList
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          id={id}
        />
      </Paper>
      </div>
    </div>
  );
}

export default CustomerDetails;
