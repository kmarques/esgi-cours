import React, { useState } from "react";
const CLIENTID = "ezafe23RAEZFCze";
const CLIENTSECRET = "ezafe23RAEZFCze";

// item => price
const products = {
  soda: 3,
  pasta: 9,
  tiramisu: 4,
};

const getTransaction = (order_id) => {
  fetch("http://api-paiement/transaction?metadata.order_id="+order_id, );
};

const createRefund = (transasction, amount) => {
    fetch("http://api-paiement/operation", {
        method: "POST",
        headers: {...},
        body: JSON.stringify({
            transasctionId: transasction.id,
            type: 'REFUND',
            amount: amount,
            currency: 'EUR'
        })
    });
  };

const OrderPage = ({order_id}) => {
  const [cart, setCart] = useState({});
  return (
    <>
      {Object.keys(products).map((product) => (
        <li>
          {product} ({products[product]}€){" "}
          <a
            onClick={() => {
              if (cart[product]) {
                setCart({
                  ...cart,
                  [product]: cart[product] - 1,
                });
              }
            }}
          >
            -
          </a>
          {cart[product] || 0}
          <a
            onClick={() => {
              setCart({
                ...cart,
                [product]: (cart[product] || 0) + 1,
              });
            }}
          >
            +
          </a>
        </li>
      ))}
      <a onClick={() => createTransaction(cart)}>Create Transaction</a>
    </>
  );
};
