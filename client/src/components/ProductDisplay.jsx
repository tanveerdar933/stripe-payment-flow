import React from 'react';
import axios from "../axios";

const ProductDisplay = () => {

  const handleSubscribe = async () => {
    try {
      const response = await axios.post("/subscribe", {
        // lookup_key: "price_1J0JQb2eZvKYlo2CJ9yJy9JN"
        lookup_key: "price_1PW9K92eZvKYlo2CRwvnPM9Q"
      })
      console.log("success==>>>", response.data);
      if (response.data.url) window.location.href = response.data.url;
    }
    catch (error) {
      console.error("error===>", error)
    }
  }

  return (
    <section>
      <div className="product">
        {/* <img
          style={{ width: "100px", height: "100px" }}
          src='https://via.placeholder.com/150'
          alt='product'
        /> */}
        <div className="description">
          <h3>Starter plan</h3>
          <h5>$20.00 / month</h5>
        </div>
      </div>
      <div>
        {/* Add a hidden field with the lookup_key of your Price */}
        <input type="hidden" name="lookup_key" value="{{PRICE_LOOKUP_KEY}}" />
        <button onClick={handleSubscribe}>
          Checkout
        </button>
      </div>
    </section>
  )
}

export default ProductDisplay