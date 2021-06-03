import React from "react";
import CheckoutForm from "../../components/checkout/CheckoutStripe.comp";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const promise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

function CheckoutStripe(props) {
 
  const {id} = props.match.params;
  return (
    <div class="flex justify-center bg-indigo-500 h-screen w-full items-center">
      <Elements stripe={promise}>
        <CheckoutForm paymentId={id}/>
      </Elements>
    </div>
  );
}

export default CheckoutStripe;
