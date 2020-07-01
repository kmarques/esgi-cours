import React, { useState } from "react";

const CLIENTID = "FZFEZFEZF3EFZFE";
const CLIENTSECRET = "FZFEZFEZF3EFZFE";

const products = {
  soda: 3,
  pasta: 9,
  tiramisu: 4,
};

const createTransaction = (cart, setMessage) => {
  setMessage(JSON.stringify(cart));
  fetch("http://api-paiment/transaction", {
    method: "POST",
    headers: {
      Authorization: "Basic " + btoa(`${CLIENTID}:${CLIENTSECRET}`),
    },
    body: JSON.stringify({
      currency: "EUR",
      amount: Object.keys(cart).reduce(
        (acc, product) => acc + cart[product] * products[product],
        0
      ),
      cart: Object.keys(cart).map((product) => ({
        product,
        quantity: cart[product],
        unit_price: products[product],
      })),
      consumer: {
        billing_address: {
          full_name: "Riri Fifi",
          address: "5 rue Toto",
          zipcode: "Z2E23D2",
          country: "France",
        },
        shipping_address: {
          full_name: "Riri Fifi",
          address: "5 rue Toto",
          zipcode: "Z2E23D2",
          country: "France",
        },
      },
      metadata: {
        consumer_id: 1,
        order_id: Date.now(),
      },
    }),
  })
    .then((res) => res.json())
    .then((transaction) => {
      window.location = transaction.payment_url;
    });
};

const CreateOrder = () => {
  const [cart, setCart] = useState({});
  const [message, setMessage] = useState("");
  return (
    <>
      <ul>
        {Object.keys(products).map((product) => {
          return (
            <li>
              {product} ({products[product]}€){" "}
              <a
                onClick={() => {
                  setCart({
                    ...cart,
                    [product]:
                      cart[product] && cart[product] > 0
                        ? cart[product] - 1
                        : 0,
                  });
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
          );
        })}
      </ul>
      <button onClick={() => createTransaction(cart, setMessage)}>Payer</button>
      {message}
    </>
  );
};

export default CreateOrder;
