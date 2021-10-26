import React, { useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import "./Checkout.css";
import { BASE_URL, createAPIEndPoint } from "../../api/index";
import axios from "axios";
import { makeStyles, Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paperStyles: {
    width: "40%",
    height: "80%",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      height: "100%",
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      height: "100%",
    },
    [theme.breakpoints.only("lg")]: {
      width: "40%",
      height: "90%",
    },
    [theme.breakpoints.only("md")]: {
      width: "60%",
      height: "70%",
    },
  },
  formStyles: {
    padding: 20,
    [theme.breakpoints.down("xs")]: {
      display: "flex",
      flexWrap: "wrap",
      marginLeft: 15,
      justifyContent: "center",
      width: "100%",
    },
  },
}));

export default function CheckoutForm(props) {
  const classes = useStyles();

  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");

  const stripe = useStripe();
  const elements = useElements();
  // const [data,setData] = useState([])

  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState(0);
  const [currency, setCurrency] = useState("");
  const [orderId,setOrderId] = useState("");
  const [customerId,setCustomerId] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  
  const { paymentId } = props;

  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };
  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };
  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setProcessing(true);

    const { data: clientSecret } = await axios.post(
      `${BASE_URL}payment/stripe`,
      {
        quantity: 1,
        email: email,
        // name: name,
        currency: currency,
        amount: amount,
        paymentMode: "pm_card_visa",
      }
    );
    setClientSecret(clientSecret);
    const payload = await stripe.confirmCardPayment(clientSecret, {
      receipt_email: email,
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });
    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      console.log("SUCCESS!!");
      setError(null);
      setProcessing(false);
      setSucceeded(true);
      // confirmedPurchase();
    }
  };

  useEffect(() => {
    createAPIEndPoint("payment")
      .fetchById(paymentId)
      .then((res) => {
        console.log(res);
        setAmount(res.data.amount);
        setOrderId(res.data.orderId);
        setCurrency(res.data.currency);
        setCustomerId(res.data.customerId.id);
        setCustomerName(res.data.customerId.customerName);
        setCustomerAddress(res.data.customerId.customerAddress);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <Paper elevation={3} className={classes.paperStyles}>
      <div class="flex flex-col h-full justify-evenly ">
        {/* <div className="h-16 w-full flex items-center text-indigo-500 font-semibold font-montserrat justify-center text-2xl ">
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
        <div class="flex justify-center">
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
        </div> */}
        <div class="bg-white h-screen pt-5 flex-wrap">
          <div class="flex w-full justify-center flex-wrap">
            <div class=" bg-indigo-400 h-14 flex justify-center items-center w-10/12 rounded-lg box-border shadow-lg">
              <span class="text-white text-2xl">RECEIPT</span>
            </div>

            <div class=" bg-indigo-400 h-auto flex w-10/12 rounded-lg box-border justify-between shadow-lg mt-5 pb-3 flex-wrap">
              <div class="w-full flex justify-between">
                <span class="text-white text-lg p-5 ">Order ID :</span>
                <span class="text-white text-lg p-5 ">{orderId}</span>
              </div>
              <div class="w-full flex justify-between">
                <span class="text-white text-lg p-5 ">Customer Name :</span>
                <span class="text-white text-lg p-5 ">{customerName}</span>
              </div>
              <div class="w-full flex justify-between">
                <span class="text-white text-lg p-5 ">Customer Address :</span>
                <span class="text-white text-lg p-5 ">{customerAddress}</span>
              </div>
              <div class="flex justify-center h-1 w-full">
                <div class="w-full bg-white" style={{ height: "2px" }}></div>
              </div>
              <div class="w-full flex justify-between">
                <span class="text-white text-lg p-5 ">Amount :</span>
                <span class="text-white text-lg p-5 ">{amount}</span>
              </div>
              <div class="w-full flex justify-between">
                <span class="text-white text-lg p-5 ">Currency :</span>
                <span class="text-white text-lg p-5 ">{currency}</span>
              </div>
            </div>
          </div>
        </div>

        <form
          id="payment-form"
          onSubmit={handleSubmit}
          className={classes.formStyles}
        >
          <input
            id="input"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email address"
          />
          <CardElement
            id="card-element"
            options={cardStyle}
            onChange={handleChange}
          />
          <button
            disabled={processing || disabled || succeeded}
            id="btn"
            style={{ marginTop: "10px", width: "100%", padding: "12px 16px" }}
          >
            <span id="button-text">
              {processing ? (
                <div className="spinner" id="spinner"></div>
              ) : (
                "Pay now"
              )}
            </span>
          </button>
          {/* Show any error that happens when processing the payment */}
          {error && (
            <div className="card-error" role="alert">
              {error}
            </div>
          )}
          {/* Show a success message upon completion */}
          <p className={succeeded ? "result-message" : "result-message hidden"}>
            <span style={{ color: "green" }}>Payment succeeded</span>,{" "}
            {/* <a
          href={`https://dashboard.stripe.com/test/payments`}
        >
          {" "}
          Stripe dashboard.
        </a>  */}
            You can close this page.
          </p>
        </form>
      </div>
    </Paper>
  );
}
