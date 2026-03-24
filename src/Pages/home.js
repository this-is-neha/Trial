import React from "react";
import { Link } from "react-router-dom";
import Bmi from "./bhi"
const SERVICES = [
  { icon: "🩺", title: "General Practice",     desc: "Routine check-ups, illness diagnosis, prescriptions and referrals." },
  { icon: "💉", title: "Immunisations",         desc: "Vaccinations for all ages following the National Immunisation Schedule." },
  { icon: "👨‍👩‍👧", title: "Family Health",       desc: "Antenatal care, child health checks, aged care assessments." },
  { icon: "❤️", title: "Chronic Disease",       desc: "Structured care plans for diabetes, hypertension, asthma and more." },
  { icon: "🧠", title: "Mental Health",         desc: "Care plans, psychology referrals, anxiety & depression support." },
  { icon: "🔬", title: "Pathology",             desc: "Blood tests, ECG, skin checks and imaging referrals." },
];

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">

<Bmi/>
      {/* ── Hero ── */}
      <section className="bg-gradient-to-br mt-10 from-blue-700 to-teal-600 text-white py-24 px-6 text-center">
        <h1 className="text-5xl font-extrabold mb-4 leading-tight">
          Your Family's Health,<br/>Our Priority
        </h1>
        <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto">
          WellSpring Family Clinic provides compassionate, high-quality healthcare for every member of your family.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link to="/appointment" className="bg-white text-blue-700 font-bold px-7 py-3 rounded-lg hover:bg-blue-50 transition">
            Book Appointment
          </Link>
          <Link to="/services" className="border border-white text-white font-semibold px-7 py-3 rounded-lg hover:bg-white/10 transition">
            Our Services
          </Link>
        </div>

        {/* Clinic hours banner */}
        <div className="mt-12 inline-flex flex-wrap gap-6 bg-white/10 backdrop-blur rounded-2xl px-8 py-4 text-sm text-blue-50 justify-center">
          <span>🕐 Mon–Fri: 8:00am – 6:00pm</span>
          <span>📅 Saturday: 9:00am – 1:00pm</span>
          <span>🚫 Sunday: Closed</span>
        </div>
      </section>

      {/* ── Featured Services ── */}
      <section className="max-w-screen-xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Our Services</h2>
        <p className="text-center text-gray-500 mb-10">Comprehensive care for every stage of life</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map(({ icon, title, desc }) => (
            <div key={title} className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 hover:-translate-y-1 hover:shadow-md transition-all duration-200 border-t-4 border-t-blue-700">
              <div className="text-4xl mb-4">{icon}</div>
              <h3 className="font-bold text-gray-800 text-lg mb-2">{title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link to="/services" className="bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-800 transition">
            View All Services
          </Link>
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-screen-xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-10">Why Choose WellSpring?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { icon: "🏆", title: "Experienced Doctors",  desc: "Our GPs have 10+ years of experience in family medicine." },
              { icon: "💳", title: "Bulk Billing",         desc: "Bulk billing available for eligible Medicare card holders." },
              { icon: "📍", title: "Convenient Location",  desc: "Located in central Melbourne, easy to access by public transport." },
            ].map(({ icon, title, desc }) => (
              <div key={title}>
                <div className="text-5xl mb-4">{icon}</div>
                <h3 className="font-bold text-gray-800 text-lg mb-2">{title}</h3>
                <p className="text-gray-500 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-gradient-to-br from-blue-700 to-teal-600 text-white text-center py-16 px-6">
        <h2 className="text-3xl font-bold mb-3">Ready to Book an Appointment?</h2>
        <p className="text-blue-100 mb-7">Bulk billing available · Same-week appointments · Family-friendly</p>
        <Link to="/appointment" className="bg-white text-blue-700 font-bold px-8 py-3 rounded-lg hover:bg-blue-50 transition">
          Book Now
        </Link>
      </section>

    </div>
  );
};

export default Home;