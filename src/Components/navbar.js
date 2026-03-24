import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        console.log("Navbar component mounted");
        return () => {
            console.log("Navbar component unmounted");
        };
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-8 py-4">

                {/* ── Logo ── */}
                <NavLink to="/" className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        W
                    </div>
                    <div className="flex flex-col leading-tight">
                        <span className="text-blue-700 font-bold text-base">WellSpring</span>
                        <span className="text-gray-500 text-xs uppercase tracking-wide">Family Clinic</span>
                    </div>
                </NavLink>

                {/* ── Hamburger ── */}
                <button
                    type="button"
                    className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                    aria-controls="navbar-menu"
                    aria-expanded={isMenuOpen ? "true" : "false"}
                    onClick={toggleMenu}
                >
                    <span className="sr-only">Open main menu</span>
                    <svg
                        className="w-5 h-5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 17 14"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M1 1h15M1 7h15M1 13h15"
                        />
                    </svg>
                </button>

              
                <div
                    className={`${isMenuOpen ? "block" : "hidden"} w-full md:block md:w-auto`}
                    id="navbar-menu"
                >
                    <ul className="flex flex-col md:flex-row md:space-x-2 rtl:space-x-reverse font-medium mt-4 md:mt-0 border border-gray-200 md:border-0 rounded-lg bg-gray-50 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 mx-4 p-4 md:mx-0 md:p-0">

                        <li>
                            <NavLink
                                to="/"
                                className={({ isActive }) =>
                                    `block py-2 px-4 rounded text-base font-medium transition-colors duration-200 ${
                                        isActive
                                            ? "text-white bg-blue-700 md:bg-transparent md:text-blue-700"
                                            : "text-gray-700 hover:bg-blue-50 hover:text-blue-700 md:hover:bg-transparent"
                                    }`
                                }
                                end
                            >
                                Home
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to="/services"
                                className={({ isActive }) =>
                                    `block py-2 px-4 rounded text-base font-medium transition-colors duration-200 ${
                                        isActive
                                            ? "text-white bg-blue-700 md:bg-transparent md:text-blue-700"
                                            : "text-gray-700 hover:bg-blue-50 hover:text-blue-700 md:hover:bg-transparent"
                                    }`
                                }
                            >
                                Services
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to="/bmi"
                                className={({ isActive }) =>
                                    `block py-2 px-4 rounded text-base font-medium transition-colors duration-200 ${
                                        isActive
                                            ? "text-white bg-blue-700 md:bg-transparent md:text-blue-700"
                                            : "text-gray-700 hover:bg-blue-50 hover:text-blue-700 md:hover:bg-transparent"
                                    }`
                                }
                            >
                                BMI Calculator
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to="/about"
                                className={({ isActive }) =>
                                    `block py-2 px-4 rounded text-base font-medium transition-colors duration-200 ${
                                        isActive
                                            ? "text-white bg-blue-700 md:bg-transparent md:text-blue-700"
                                            : "text-gray-700 hover:bg-blue-50 hover:text-blue-700 md:hover:bg-transparent"
                                    }`
                                }
                            >
                                About Us
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to="/contact"
                                className={({ isActive }) =>
                                    `block py-2 px-4 rounded text-base font-medium transition-colors duration-200 ${
                                        isActive
                                            ? "text-white bg-blue-700 md:bg-transparent md:text-blue-700"
                                            : "text-gray-700 hover:bg-blue-50 hover:text-blue-700 md:hover:bg-transparent"
                                    }`
                                }
                            >
                                Contact
                            </NavLink>
                        </li>

                      
                        <li>
                            <NavLink
                                to="/appointment"
                                className="block py-2 px-4 bg-blue-700 text-white rounded-md text-base font-semibold hover:bg-blue-800 transition-colors duration-200 md:ml-2 text-center"
                            >
                                Book Appointment
                            </NavLink>
                        </li>

                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;