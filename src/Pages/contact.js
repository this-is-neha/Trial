import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";

const EMAILJS_PUBLIC_KEY  = "YOUR_PUBLIC_KEY";   // ← paste here
const EMAILJS_SERVICE_ID  = "YOUR_SERVICE_ID";   // ← paste here
const EMAILJS_TEMPLATE_ID = "template_contact";  // ← paste here

const Contact = () => {
  const formRef = useRef();

  const [fields, setFields] = useState({
    name: "", email: "", subject: "", message: "",
  });
  const [errors,  setErrors]  = useState({});
  const [status,  setStatus]  = useState(null); // 'success' | 'error'
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!fields.name.trim())                              e.name    = "Your name is required.";
    if (!fields.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))
                                                          e.email   = "Please enter a valid email address.";
    if (!fields.subject)                                  e.subject = "Please select a subject.";
    if (!fields.message.trim() || fields.message.length < 10)
                                                          e.message = "Message must be at least 10 characters.";
    return e;
  };

  const handleChange = (e) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus(null);
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formRef.current, EMAILJS_PUBLIC_KEY)
      .then(() => {
        setStatus("success");
        setFields({ name: "", email: "", subject: "", message: "" });
      })
      .catch((err) => {
        console.error("EmailJS error:", err);
        setStatus("error");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-700 to-teal-600 text-white py-16 text-center">
        <h1 className="text-4xl font-bold mb-3">Contact Us</h1>
        <p className="text-blue-100 text-lg">We'd love to hear from you — get in touch with our team</p>
      </section>

      <section className="max-w-screen-xl mx-auto px-6 py-14 grid grid-cols-1 lg:grid-cols-2 gap-10">

        {/* ── Contact Info ── */}
        <div className="bg-white rounded-2xl shadow p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Get In Touch</h2>

          {[
            { icon: "📍", label: "Address",  value: "123 Health Street, Melbourne VIC 3000" },
            { icon: "📞", label: "Phone",    value: "(03) 9000 1234" },
            { icon: "✉️", label: "Email",    value: "info@wellspringclinic.com.au" },
          ].map(({ icon, label, value }) => (
            <div key={label} className="flex items-start gap-4 mb-5">
              <div className="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center text-xl flex-shrink-0">
                {icon}
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-0.5">{label}</p>
                <p className="text-gray-700 font-medium">{value}</p>
              </div>
            </div>
          ))}

          {/* Opening hours */}
          <div className="flex items-start gap-4 mt-6">
            <div className="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center text-xl flex-shrink-0">🕐</div>
            <div className="w-full">
              <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-2">Opening Hours</p>
              <table className="w-full text-sm text-gray-600">
                <tbody>
                  <tr className="border-b border-gray-100"><td className="py-1.5">Monday – Friday</td><td className="text-right font-medium text-gray-800">8:00am – 6:00pm</td></tr>
                  <tr className="border-b border-gray-100"><td className="py-1.5">Saturday</td><td className="text-right font-medium text-gray-800">9:00am – 1:00pm</td></tr>
                  <tr><td className="py-1.5">Sunday</td><td className="text-right font-medium text-red-500">Closed</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Map placeholder */}
          <div className="mt-6 h-44 bg-gradient-to-br from-blue-50 to-teal-50 border-2 border-dashed border-blue-200 rounded-xl flex flex-col items-center justify-center text-gray-400 text-sm gap-2">
            <span className="text-3xl">🗺️</span>
            <span>123 Health Street, Melbourne VIC 3000</span>
          </div>
        </div>

        {/* ── Contact Form ── */}
        <div className="bg-white rounded-2xl shadow p-8 border-t-4 border-blue-700">
          <h2 className="text-2xl font-bold text-gray-800 mb-1">Send Us a Message</h2>
          <p className="text-gray-400 text-sm mb-6">We'll get back to you within 1 business day</p>

          {/* Success / error banners */}
          {status === "success" && (
            <div className="mb-5 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm">
              ✅ Thank you! Your message has been sent. We'll reply within 1 business day.
            </div>
          )}
          {status === "error" && (
            <div className="mb-5 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
              ❌ Something went wrong. Please email us at info@wellspringclinic.com.au
            </div>
          )}

          <form ref={formRef} onSubmit={handleSubmit} noValidate>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                <input
                  type="text" name="name" value={fields.name} onChange={handleChange}
                  placeholder="Jane Smith"
                  className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.name ? "border-red-400" : "border-gray-200"}`}
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                <input
                  type="email" name="email" value={fields.email} onChange={handleChange}
                  placeholder="jane@email.com"
                  className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.email ? "border-red-400" : "border-gray-200"}`}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
            </div>

            {/* Subject */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Subject *</label>
              <select
                name="subject" value={fields.subject} onChange={handleChange}
                className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white ${errors.subject ? "border-red-400" : "border-gray-200"}`}
              >
                <option value="">Select a subject</option>
                <option>General Enquiry</option>
                <option>Appointment Question</option>
                <option>Billing / Medicare</option>
                <option>Test Results</option>
                <option>Feedback</option>
                <option>Other</option>
              </select>
              {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
            </div>

            {/* Message */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
              <textarea
                name="message" value={fields.message} onChange={handleChange}
                rows={5} placeholder="How can we help you?"
                className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${errors.message ? "border-red-400" : "border-gray-200"}`}
              />
              {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
            </div>

            <button
              type="submit" disabled={loading}
              className="w-full py-3 bg-blue-700 hover:bg-blue-800 disabled:bg-blue-300 text-white font-semibold rounded-lg transition-colors duration-200 text-base"
            >
              {loading ? "Sending…" : "Send Message"}
            </button>

          </form>
        </div>
      </section>
    </div>
  );
};

export default Contact;