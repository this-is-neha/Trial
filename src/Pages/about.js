import React from "react";
import { Link } from "react-router-dom";

const DOCTORS = [
  { emoji: "👩‍⚕️", name: "Dr. Sarah Mitchell", role: "Clinic Director & GP",    bio: "MBBS, FRACGP — 15 years experience in family medicine and women's health.", bg: "from-blue-100 to-blue-50" },
  { emoji: "👨‍⚕️", name: "Dr. James Nguyen",   role: "General Practitioner",    bio: "MBBS, FRACGP — Specialises in chronic disease and men's health.",            bg: "from-teal-100 to-teal-50" },
  { emoji: "👩‍⚕️", name: "Dr. Priya Sharma",   role: "Paediatrician",           bio: "MBBS, FRACP — Expert in child development and paediatric care.",             bg: "from-pink-100 to-pink-50" },
  { emoji: "👨‍⚕️", name: "Dr. Tom Walker",     role: "Mental Health GP",        bio: "MBBS, FRANZCP — Mental health, anxiety, depression, psychology referrals.", bg: "from-amber-100 to-amber-50" },
];

const VALUES = [
  { icon: "❤️", title: "Compassion",  desc: "We treat every patient with empathy and genuine care." },
  { icon: "🔬", title: "Excellence",  desc: "We uphold the highest clinical and professional standards." },
  { icon: "🤝", title: "Integrity",   desc: "We are honest, transparent, and accountable in everything we do." },
  { icon: "🌍", title: "Inclusivity", desc: "We welcome all cultures, backgrounds, and family types." },
];

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-700 to-teal-600 text-white py-16 text-center px-6">
        <h1 className="text-4xl font-bold mb-3">About WellSpring</h1>
        <p className="text-blue-100 text-lg">A community clinic built on trust, care, and expertise</p>
      </section>

      {/* Who we are */}
      <section className="max-w-screen-xl mx-auto px-6 py-14 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-2xl h-72 flex items-center justify-center text-8xl border-2 border-dashed border-blue-200">
          🏥
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Who We Are</h2>
          <p className="text-gray-500 leading-relaxed mb-3">
            WellSpring Family Clinic is a community health centre dedicated to providing high-quality, accessible healthcare to families across Melbourne.
          </p>
          <p className="text-gray-500 leading-relaxed mb-3">
            Founded in 2015 by Dr. Sarah Mitchell, our clinic was built on the belief that every family deserves personalised, compassionate medical care — regardless of background or circumstance.
          </p>
          <p className="text-gray-500 leading-relaxed mb-6">
            Today, we have grown to a team of 8 specialist GPs and nurses, serving over 2,500 patients with a commitment to whole-person health.
          </p>
          <Link to="/appointment" className="bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-800 transition">
            Book an Appointment
          </Link>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-white py-14 px-6">
        <div className="max-w-screen-xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Our Mission & Values</h2>
          <p className="text-center text-gray-500 mb-10">What drives everything we do</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
            {[
              { icon: "🎯", title: "Our Mission", desc: "To deliver accessible, evidence-based healthcare that empowers individuals and families to live healthier, happier lives." },
              { icon: "👁️", title: "Our Vision",  desc: "To be Melbourne's most trusted community health partner — where every patient feels heard, respected, and cared for." },
              { icon: "💙", title: "Our Promise", desc: "We promise to always put patients first — with honesty, compassion, and the highest standard of clinical excellence." },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="text-center p-8 rounded-xl border border-gray-100 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-200">
                <div className="text-5xl mb-4">{icon}</div>
                <h3 className="font-bold text-gray-800 text-lg mb-3">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          {/* Core values */}
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Our Core Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl mx-auto">
            {VALUES.map(({ icon, title, desc }) => (
              <div key={title} className="flex items-start gap-4">
                <div className="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center text-xl flex-shrink-0">{icon}</div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">{title}</h3>
                  <p className="text-gray-500 text-sm">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Doctors */}
      <section className="max-w-screen-xl mx-auto px-6 py-14">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Meet Our Doctors</h2>
        <p className="text-center text-gray-500 mb-10">Experienced, caring, and highly qualified</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {DOCTORS.map(({ emoji, name, role, bio, bg }) => (
            <div key={name} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:-translate-y-1 hover:shadow-md transition-all duration-200 text-center">
              <div className={`h-36 bg-gradient-to-br ${bg} flex items-center justify-center text-6xl`}>{emoji}</div>
              <div className="p-5">
                <h3 className="font-bold text-gray-800 mb-1">{name}</h3>
                <p className="text-blue-700 text-xs font-semibold mb-2 uppercase tracking-wide">{role}</p>
                <p className="text-gray-500 text-sm leading-relaxed">{bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-blue-700 to-teal-600 text-white text-center py-14 px-6">
        <h2 className="text-3xl font-bold mb-3">Ready to Meet Our Team?</h2>
        <p className="text-blue-100 mb-7">Book an appointment today and experience the WellSpring difference.</p>
        <Link to="/appointment" className="bg-white text-blue-700 font-bold px-8 py-3 rounded-lg hover:bg-blue-50 transition">
          Book Appointment
        </Link>
      </section>

    </div>
  );
};

export default About;