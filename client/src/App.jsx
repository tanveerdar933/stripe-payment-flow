import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import CheckOut from "./CheckOut";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CheckOut />} />
        <Route path="/success" element={<h1>Success</h1>} />
        <Route path="/cancel" element={<h1>Cancel</h1>} />
        {/* <Route path="*" element={<Navigate to="/success" />} /> */}
      </Routes>
    </BrowserRouter>

  )
}

export default App
