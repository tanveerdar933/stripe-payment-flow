import React from 'react';
import axios from "./axios";

const CheckOut = () => {
  // const handleCheckout = async (item_id, item_quantity) => {
  //   try {
  //     const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/checkout`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({ id: item_id, quantity: item_quantity })
  //     })
  //     const data = await response.json()
  //     console.log("success==>>>", data)
  //   }
  //   catch (error) {
  //     console.error("error===>", error)
  //   }
  // }

  const handleCheckout = async (item_id, item_quantity) => {
    try {
      const response = await axios.post("/checkout", { id: item_id, quantity: item_quantity })
      console.log("success==>>>", response.data);
      if (response.data.url) window.location.href = response.data.url;
    }
    catch (error) {
      console.error("error===>", error)
    }
  }

  return (
    <div style={{ display: "flex", flexFlow: "column", gap: "1rem" }}>
      <div style={{ display: "flex", gap: "1rem" }}>
        <p>Item 1</p>
        <button onClick={() => handleCheckout(1, 2)}>Checkout</button>
      </div>
      <div style={{ display: "flex", gap: "1rem" }}>
        <p>Item 2</p>
        <button onClick={() => handleCheckout(2, 5)}>Checkout</button>
      </div>
    </div>
  )
}

export default CheckOut