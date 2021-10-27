import React, { useEffect } from "react";
import CheckoutForm from "../../components/checkout/CheckoutStripe.comp";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { createAPIEndPoint } from "../../api";

const promise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

function CheckoutStripe(props) {
  const { id } = props.match.params;

  useEffect(() => {
    createAPIEndPoint("payment")
      .fetchById(id)
      .then((res) => {
        console.log(res);
        // setAmount(res.data.amount);
        // setCurrency(res.data.currency);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div class="flex justify-center bg-indigo-400 h-screen w-full items-center">
      <Elements stripe={promise}>
        <CheckoutForm paymentId={id} />
      </Elements>
    </div>
  );
}

export default CheckoutStripe;

{
  /* <div class="bg-white h-screen pt-5 flex-wrap">
<div class="flex w-full justify-center flex-wrap">
  <div class=" bg-indigo-500 h-14 flex justify-center items-center w-10/12 rounded-lg box-border shadow-lg">
    <span class="text-white text-2xl">RECEIPT</span>
  </div>

  <div class=" bg-indigo-500 h-auto flex w-10/12 rounded-lg box-border justify-between shadow-lg mt-5 pb-3 flex-wrap">
    <div class="w-full flex justify-between">
      <span class="text-white text-lg p-5 ">Order No :</span>
      <span class="text-white text-lg p-5 ">2assd822sdss2a8381</span>
    </div>
    <div class="w-full flex justify-between">
      <span class="text-white text-lg p-5 ">Customer Name :</span>
      <span class="text-white text-lg p-5 ">Bilal Aleem</span>
    </div>
    <div class="w-full flex justify-between">
      <span class="text-white text-lg p-5 ">Customer Name :</span>
      <span class="text-white text-lg p-5 ">Customer Name</span>
    </div>
    <div class="flex justify-center h-1 w-full">
      <div class="w-11/12 bg-white" style={{height:"2px"}}></div>
    </div>
  </div>
</div>
</div> */
}
