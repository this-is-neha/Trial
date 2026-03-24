import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  useEffect(() => {
    console.log("Footer component mounted");
    return () => {
      console.log("Footer component unmounted");
    };
  }, []);

  return (
    <footer className="bg-gradient-to-r from-indigo-100 via-blue-100 to-teal-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 mt-12 shadow-inner">
      <div className="max-w-screen-xl mx-auto px-4 py-8">

        {/* ── Logo + Tagline ── */}
        <div className="flex flex-col items-center mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center text-white font-bold text-lg">
              W
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-blue-700 font-bold text-base">WellSpring</span>
              <span className="text-gray-500 text-xs uppercase tracking-wide">Family Clinic</span>
            </div>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Caring for your family's health, every step of the way.
          </p>
        </div>

        {/* ── Nav Links ── */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-y-6">
          <ul className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-base font-medium text-gray-600 dark:text-gray-300">
            <li>
              <NavLink to="/" className="text-base hover:text-blue-700 transition" end>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/services" className="text-base hover:text-blue-700 transition">
                Services
              </NavLink>
            </li>
            <li>
              <NavLink to="/bmi" className="text-base hover:text-blue-700 transition">
                BMI Calculator
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className="text-base hover:text-blue-700 transition">
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className="text-base hover:text-blue-700 transition">
                Contact
              </NavLink>
            </li>
            <li>
              <NavLink to="/appointment" className="text-base hover:text-blue-700 transition">
                Book Appointment
              </NavLink>
            </li>
          </ul>

          {/* ── Contact Info ── */}
          <div className="text-sm text-gray-500 dark:text-gray-400 text-center md:text-right space-y-1">
            <p>📞 (03) 9000 1234</p>
            <p>📍 123 Health Street, Melbourne VIC 3000</p>
            <p>🕐 Mon–Fri: 8am – 6pm &nbsp;|&nbsp; Sat: 9am – 1pm</p>
          </div>
        </div>

        <hr className="my-6 border-gray-300 dark:border-gray-700" />

        <p className="text-center text-xs sm:text-sm text-gray-500 dark:text-gray-400">
          © 2025{" "}
          <a
            href="mailto:info@wellspringclinic.com.au"
            className="hover:underline text-blue-600"
          >
            info@wellspringclinic.com.au
          </a>{" "}
          — All rights reserved.
        </p>

      </div>
    </footer>
  );
};

export default Footer;