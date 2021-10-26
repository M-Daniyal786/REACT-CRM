import React from "react";
import ReactDOM from "react-dom";
import { PayPalButton } from "react-paypal-button-v2";
// const PayPalButton = paypal.Buttons.driver("react", { React, ReactDOM });

function CheckoutPaypal(props) {
  const { amount, currency } = props;
  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            currency_code: `${currency}`,
            value: `${amount}`,
          },
        },
      ],
    });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture();
  };

  return (
    <PayPalButton
      createOrder={(data, actions) => createOrder(data, actions)}
      onApprove={(data, actions) => onApprove(data, actions)}
      
      options={{
        clientId:
          "AaDwezr-WsskQPIIZ8l1laF2D_md6WJ0NA9r07g5OlqiBpY1YY28HsWskDa1fwI8My3c-GhvEG-1PvqS",
      }}
    />
  );
}

export default CheckoutPaypal;
