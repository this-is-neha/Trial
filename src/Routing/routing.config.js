import React from "react";
import { Routes, Route } from "react-router-dom";
import Home        from "../Pages/home";
import Contact     from "../Pages/contact";
import Appointment from "../Pages/appointment";
import Bmi         from "../Pages/bhi";
import Services    from "../Pages/services";
import About       from "../Pages/about";

const RouterConfig = () => {
  return (
    <Routes>
      <Route path="/"            element={<Home />} />
      <Route path="/services"    element={<Services />} />
      <Route path="/bmi"         element={<Bmi />} />
      <Route path="/about"       element={<About />} />
      <Route path="/contact"     element={<Contact />} />
      <Route path="/appointment" element={<Appointment />} />
    </Routes>
  );
};

export default RouterConfig;