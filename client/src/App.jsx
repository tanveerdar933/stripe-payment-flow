import React, { useState, useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
//components
import ProductDisplay from "./components/ProductDisplay";
import CheckOut from "./components/CheckOut";

function App() {
  let [message, setMessage] = useState('');
  let [success, setSuccess] = useState(false);
  let [sessionId, setSessionId] = useState('');

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get('success')) {
      setSuccess(true);
      setSessionId(query.get('session_id'));
    }

    if (query.get('canceled')) {
      setSuccess(false);
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, [sessionId]);

  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<CheckOut />} /> */}
        <Route path="/" element={<ProductDisplay />} />
        <Route path="/success" element={<h1>Success</h1>} />
        <Route path="/cancel" element={<h1>Cancel</h1>} />
        {/* <Route path="*" element={<Navigate to="/success" />} /> */}
      </Routes>
    </BrowserRouter>

  )
}

export default App
