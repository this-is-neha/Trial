import React from "react";
import { Link } from "react-router-dom";

const SERVICES = [
  {
    icon: "🩺", title: "General Practice",
    desc: "Your first point of contact for all health concerns. Our GPs provide thorough consultations and personalised care plans.",
    items: ["Routine health checks", "Illness diagnosis & treatment", "Prescriptions & referrals", "Pre-employment medicals"],
  },
  {
    icon: "💉", title: "Immunisations",
    desc: "Stay protected with our comprehensive vaccination programs for all ages, following the National Immunisation Schedule.",
    items: ["Childhood vaccinations", "Annual flu shots", "Travel vaccinations", "COVID-19 boosters"],
  },
  {
    icon: "👨‍👩‍👧", title: "Family Health",
    desc: "Dedicated care for every stage of family life — from pregnancy to childhood development to senior wellness.",
    items: ["Antenatal & postnatal care", "Child health checks", "Aged care assessments", "Family planning"],
  },
  {
    icon: "❤️", title: "Chronic Disease Management",
    desc: "Structured care plans to help you manage ongoing conditions and improve quality of life.",
    items: ["Diabetes management", "Hypertension monitoring", "Asthma action plans", "Heart disease care"],
  },
  {
    icon: "🧠", title: "Mental Health",
    desc: "Compassionate mental health support in a safe, non-judgmental environment.",
    items: ["Mental health care plans", "Anxiety & depression support", "Psychology referrals", "Stress management"],
  },
  {
    icon: "🔬", title: "Pathology & Diagnostics",
    desc: "On-site testing and referrals to ensure accurate, timely diagnoses.",
    items: ["Blood & urine tests", "ECG & spirometry", "Skin checks", "Imaging referrals"],
  },
];

const STEPS = [
  { num: 1, title: "Book Online",       desc: "Choose a date and time using our online booking form." },
  { num: 2, title: "See Your Doctor",   desc: "Arrive and consult with one of our experienced GPs." },
  { num: 3, title: "Get Your Plan",     desc: "Receive a personalised treatment or management plan." },
  { num: 4, title: "Follow Up",         desc: "We check in and track your progress at follow-up visits." },
];

const Services = () => {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-700 to-teal-600 text-white py-16 text-center px-6">
        <h1 className="text-4xl font-bold mb-3">Our Healthcare Services</h1>
        <p className="text-blue-100 text-lg">Comprehensive, compassionate care for every member of your family</p>
      </section>

      {/* Services grid */}
      <section className="max-w-screen-xl mx-auto px-6 py-14">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">What We Offer</h2>
        <p className="text-center text-gray-500 mb-10">From routine check-ups to specialist referrals — we're here for you</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map(({ icon, title, desc, items }) => (
            <div key={title} className="bg-white rounded-xl border-t-4 border-blue-700 border border-gray-100 shadow-sm p-6 hover:-translate-y-1 hover:shadow-md transition-all duration-200">
              <div className="text-4xl mb-4">{icon}</div>
              <h3 className="font-bold text-gray-800 text-lg mb-2">{title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">{desc}</p>
              <ul className="space-y-1">
                {items.map(item => (
                  <li key={item} className="text-sm text-gray-500 flex items-center gap-2">
                    <span className="text-blue-600">•</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white py-14 px-6">
        <div className="max-w-screen-xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">How It Works</h2>
          <p className="text-center text-gray-500 mb-10">Getting care at WellSpring is simple</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {STEPS.map(({ num, title, desc }) => (
              <div key={num}>
                <div className="w-12 h-12 bg-blue-700 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">{num}</div>
                <h3 className="font-bold text-gray-800 mb-2">{title}</h3>
                <p className="text-gray-500 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-blue-700 to-teal-600 text-white text-center py-14 px-6">
        <h2 className="text-3xl font-bold mb-3">Need to See a Doctor?</h2>
        <p className="text-blue-100 mb-7">Bulk billing available for eligible patients.</p>
        <Link to="/appointment" className="bg-white text-blue-700 font-bold px-8 py-3 rounded-lg hover:bg-blue-50 transition">
          Book Appointment
        </Link>
      </section>

    </div>
  );
};

export default Services;