import React, { useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import "./Checkout.css";
import { BASE_URL, createAPIEndPoint } from "../../api/index";
import axios from "axios";
import { Paper } from "@material-ui/core";

export default function CheckoutForm(props) {
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
  // const [name, setName] = useState("")

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
        setCurrency(res.data.currency);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <Paper elevation={3} style={{ width: "40%", height: "70%" }}>
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
        <div class="flex justify-center">
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

        <form id="payment-form" onSubmit={handleSubmit} style={{ padding: 20 }}>
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
