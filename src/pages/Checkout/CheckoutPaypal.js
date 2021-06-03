
import { makeStyles, Paper } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { createAPIEndPoint } from "../../api";
import CheckoutPaypal from "../../components/checkout/CheckoutPaypal.comp";

const useStyles = makeStyles({
  mainPaper: {
    minWidth: "40%",
    height: "70%",
    paddingTop: 50,
    paddingBottom: 50,
  },
});

function CheckoutPaypalPage(props) {
  const classes = useStyles();
  const { id } = props.match.params;

  const [amount, setAmount] = useState(0);
  const [currency, setCurrency] = useState("");

  useEffect(() => {
    createAPIEndPoint("payment")
      .fetchById(id)
      .then((res) => {
        console.log(res);
        setAmount(res.data.amount);
        setCurrency(res.data.currency);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div class="flex h-auto min-h-screen w-full bg-indigo-500 justify-center items-center">
      <Paper elevation={3} className={classes.mainPaper}>
        <div class="flex flex-col h-full justify-evenly">
          <div className="h-16 w-full flex items-center text-indigo-500 font-semibold font-montserrat justify-center text-2xl ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-14 w-14"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
              />
            </svg>
            <span class="mr-3 ml-1 text-5xl">Di Pixel</span>
          </div>
          <div class="flex justify-center pt-5">
            {/* <span class="text-indigo-500 font-semibold text-2xl font-montserrat">Amount: </span> */}
            {currency == "USD" ? (
              <span class="font-semibold text-2xl font-montserrat text-gray-600">
                $
              </span>
            ) : currency == "CAD" ? (
              <span class="font-semibold text-2xl font-montserrat text-gray-600">
                $
              </span>
            ) : currency == "GBP" ? (
              <span class="font-semibold text-2xl font-montserrat text-gray-600">
                £
              </span>
            ) : null}{" "}
            <span class="font-semibold text-4xl font-montserrat text-gray-600">
              {amount}
            </span>
          </div>

          <div class="pt-10 p-5" >
            <CheckoutPaypal amount={amount} currency={currency} />
          </div>
        </div>
      </Paper>
    </div>
  );
}

export default CheckoutPaypalPage;
