import React, { useState } from "react";

const CLIENTID = "client_dezdzfddE23ER23F2";
const CLIENTSECRET = "client_dezdzfddE23ER23F2";
const products = {
  soda: 4,
  pasta: 9,
  tiramisu: 3,
};

const createTransaction = (cart) => {
  fetch("http://api-paiement/transaction", {
    method: "POST",
    headers: {
      Authorization: "Basic " + btoa(`${CLIENTID}:${CLIENTSECRET}`),
    },
    body: JSON.stringify({
      amount: Object.keys(cart).reduce(
        (acc, product) => acc + cart[product] * products[product],
        0
      ),
      currency: "EUR",
      cart: Object.keys(cart).map((product) => ({
        product,
        quantity: cart[product],
        unitPrice: products[product],
      })),
      consumer: {
        shipping_address: {
          fullName: "Riri Fifi",
          addres: "5 rue toto",
          zipcode: "01000",
          country: "FR",
        },
        billing_address: {
          fullName: "Riri Fifi",
          addres: "5 rue toto",
          zipcode: "01000",
          country: "FR",
        },
      },
      metadata: {
        order_id: Date.now(),
        consumer_id: 1,
      },
    }),
  }).then((transaction) => (window.location = transaction.payment_url));
};

const CreateOrder = () => {
  const [cart, setCart] = useState({});

  return (
    <>
      <ul>
        {Object.keys(products).map((product) => (
          <li>
            {product} ({products[product]}€){" "}
            <a
              onClick={() =>
                setCart({
                  ...cart,
                  [product]:
                    cart[product] && cart[product] > 0 ? cart[product] - 1 : 0,
                })
              }
            >
              -
            </a>
            {cart[product] || 0}
            <a
              onClick={() =>
                setCart({
                  ...cart,
                  [product]: (cart[product] || 0) + 1,
                })
              }
            >
              +
            </a>
          </li>
        ))}
      </ul>
      <button onClick={() => createTransaction(cart)}>Payer</button>
    </>
  );
};

export default CreateOrder;
