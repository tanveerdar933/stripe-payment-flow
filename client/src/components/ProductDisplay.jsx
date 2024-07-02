import React, { useEffect, useState } from 'react';
import { COURSE_COVER } from "../assets";
import { TailSpin } from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom';
import axios from "../axios";

const ProductDisplay = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [pricePerSeat, setPricePerSeat] = useState(12);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [showError, setShowError] = useState(false);
  const [sessionId, setSessionId] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');

  //billing portal states

  const [portalID, setPortalID] = useState('');
  const [portalURL, setPortalURL] = useState('');


  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const check_if_success = query.get('success');
    const check_if_canceled = query.get('canceled');
    const session_id = query.get('session_id');
    const email = query.get('email');
    if (check_if_success) {
      setIsSuccess(true);
    }
    if (check_if_canceled) {
      setIsError(true);
    }
    if (session_id) {
      setSessionId(session_id);
    }
    if (email) {
      setCustomerEmail(email)
    }
    if (check_if_success || check_if_canceled || session_id || email) {
      window.history.replaceState(null, null, window.location.pathname);
    }
  }, [])

  useEffect(() => {
    if (isSuccess) {
      //show success message for 5 seconds
      setShowSuccess(true);
      const timeout = setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [isSuccess])

  useEffect(() => {
    if (isError) {
      //show error message for 5 seconds
      setShowError(true);
      const timeout = setTimeout(() => {
        setShowError(false);
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [isError])

  const handleSubscribe = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post("/subscribe", {
        lookup_key: "react_mastery_price",
        quantity: quantity
      })
      if (response.data.url) {
        window.location.href = response.data.url;
      }
      setIsLoading(false);
    }
    catch (error) {
      console.error("error===>", error)
      setIsLoading(false);
    }
  }

  const manageSubscribe = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post("/portal", {
        user_email: customerEmail,
      })
      if (response.data.url) {
        window.location.href = response.data.url;
      }
      setIsLoading(false);
    }
    catch (error) {
      console.error("error===>", error)
      setIsLoading(false);
    }
  }

  const handleConfigure = async () => {
    try {
      const response = await axios.post("/configure", {
        portal_id: portalID,
      })
      if (response.data.url) {
        setPortalURL(response.data.url);
      }
    }
    catch (error) {
      console.error("error===>", error)
    }
  }

  return (
    <section>
      <div className="product-card">
        <img
          style={{ width: "300px", height: "auto", borderRadius: "5px" }}
          src={COURSE_COVER}
          alt='product cover'
        />
        <div>
          <div className="product-desc">
            <h2>React Mastery class</h2>
            <p>${pricePerSeat * quantity}.00 / month</p>
            <div className='seats-input'>
              <label htmlFor="s_input">Seats:</label>
              <input id='s_input' type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} min={1} max={100} />
            </div>
          </div>
          {(!isSuccess && !isError) &&
            <button onClick={handleSubscribe} className='success-btn' disabled={isLoading}>
              {
                isLoading ?
                  <TailSpin color="#fff" height={20} width={20} /> :
                  "Subscribe Now"
              }
            </button>
          }
          {(isSuccess && !isError) &&
            <button onClick={manageSubscribe} className='success-btn' disabled={isLoading}>
              {
                isLoading ?
                  <TailSpin color="#fff" height={20} width={20} /> :
                  "Manage Subscription"
              }
            </button>
          }
        </div>
      </div>
      {(isSuccess && showSuccess) &&
        <div className='success-notice'>
          Subscription to starter plan successful!
        </div>
      }
      {(isError && showError) &&
        <div className='error-notice'>
          Subscription could not be completed!
        </div>
      }
      <div>
        <h2>Billing Portal configration</h2>
        <input type="text" value={portalID} onChange={(e) => setPortalID(e.target.value)} />
        <button onClick={handleConfigure}>Configure</button>
      </div>
      <div>
        <h2>Billing Portal URL</h2>
        <p>url: {portalURL}</p>
        <button onClick={() => window.open(portalURL, "_blank")}>Open Portal</button>
      </div>
    </section>
  )
}

export default ProductDisplay