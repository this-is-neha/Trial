import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";

const EMAILJS_PUBLIC_KEY  = "YOUR_PUBLIC_KEY";       // ← paste here
const EMAILJS_SERVICE_ID  = "YOUR_SERVICE_ID";       // ← paste here
const EMAILJS_TEMPLATE_ID = "template_appointment";  // ← paste here

const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const isValidPhone = (v) => /^\+?[\d\s\-()\\.]{7,15}$/.test(v);
const isPastDate   = (d) => new Date(d) < new Date(new Date().toDateString());
const todayStr     = ()  => new Date().toISOString().split("T")[0];

const Appointment = () => {
  const formRef = useRef();

  const [fields, setFields] = useState({
    name: "", email: "", phone: "", date: "",
    doctor: "", service: "", message: "",
  });
  const [errors,  setErrors]  = useState({});
  const [status,  setStatus]  = useState(null); // 'success' | 'error'
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!fields.name.trim())               e.name  = "Full name is required.";
    if (!isValidEmail(fields.email))       e.email = "Please enter a valid email address.";
    if (!isValidPhone(fields.phone))       e.phone = "Please enter a valid phone number.";
    if (!fields.date || isPastDate(fields.date)) e.date = "Please choose a future date.";
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
        setFields({ name: "", email: "", phone: "", date: "", doctor: "", service: "", message: "" });
      })
      .catch((err) => {
        console.error("EmailJS error:", err);
        setStatus("error");
      })
      .finally(() => setLoading(false));
  };

  // ── Reusable input wrapper ──
  const Field = ({ label, error, children, required }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );

  const inputCls = (name) =>
    `w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
      errors[name] ? "border-red-400" : "border-gray-200"
    }`;

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-700 to-teal-600 text-white py-16 text-center px-6">
        <h1 className="text-4xl font-bold mb-3">Book an Appointment</h1>
        <p className="text-blue-100 text-lg">Fill in the form and we'll confirm your booking within 24 hours</p>
      </section>

      <section className="max-w-screen-xl mx-auto px-6 py-14 grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">

        {/* ── Form ── */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow p-8 border-t-4 border-blue-700">
          <h2 className="text-2xl font-bold text-gray-800 mb-1">Appointment Request</h2>
          <p className="text-gray-400 text-sm mb-6">Fields marked * are required</p>

          {status === "success" && (
            <div className="mb-5 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm">
              ✅ Your appointment request has been sent! We'll contact you within 24 hours to confirm.
            </div>
          )}
          {status === "error" && (
            <div className="mb-5 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
              ❌ Something went wrong. Please call us on (03) 9000 1234.
            </div>
          )}

          <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-5">

            {/* Row 1: Name + Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Full Name" error={errors.name} required>
                <input
                  type="text" name="name" value={fields.name} onChange={handleChange}
                  placeholder="Jane Smith" className={inputCls("name")}
                />
              </Field>
              <Field label="Email Address" error={errors.email} required>
                <input
                  type="email" name="email" value={fields.email} onChange={handleChange}
                  placeholder="jane@email.com" className={inputCls("email")}
                />
              </Field>
            </div>

            {/* Row 2: Phone + Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Phone Number" error={errors.phone} required>
                <input
                  type="tel" name="phone" value={fields.phone} onChange={handleChange}
                  placeholder="04XX XXX XXX" className={inputCls("phone")}
                />
              </Field>
              <Field label="Preferred Date" error={errors.date} required>
                <input
                  type="date" name="date" value={fields.date} onChange={handleChange}
                  min={todayStr()} className={inputCls("date")}
                />
              </Field>
            </div>

            {/* Preferred Doctor */}
            <Field label="Preferred Doctor">
              <select name="doctor" value={fields.doctor} onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                <option value="">No preference</option>
                <option>Dr. Sarah Mitchell – GP & Clinic Director</option>
                <option>Dr. James Nguyen – Chronic Disease</option>
                <option>Dr. Priya Sharma – Paediatrician</option>
                <option>Dr. Tom Walker – Mental Health</option>
              </select>
            </Field>

            {/* Reason for visit */}
            <Field label="Reason for Visit">
              <select name="service" value={fields.service} onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                <option value="">Select a service</option>
                <option>General Consultation</option>
                <option>Immunisation</option>
                <option>Chronic Disease Management</option>
                <option>Mental Health</option>
                <option>Child Health Check</option>
                <option>Pathology / Blood Test</option>
                <option>Other</option>
              </select>
            </Field>

            {/* Message */}
            <Field label="Additional Message">
              <textarea
                name="message" value={fields.message} onChange={handleChange}
                rows={4} placeholder="Any special requirements or additional information..."
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </Field>

            <button
              type="submit" disabled={loading}
              className="w-full py-3 bg-blue-700 hover:bg-blue-800 disabled:bg-blue-300 text-white font-semibold rounded-lg transition-colors duration-200 text-base"
            >
              {loading ? "Sending…" : "Submit Appointment Request"}
            </button>

          </form>
        </div>

        {/* ── Sidebar ── */}
        <div className="space-y-4">

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <h3 className="font-bold text-gray-800 mb-3">📍 Clinic Location</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              WellSpring Family Clinic<br/>
              123 Health Street<br/>
              Melbourne VIC 3000
            </p>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <h3 className="font-bold text-gray-800 mb-3">🕐 Opening Hours</h3>
            <table className="w-full text-sm text-gray-500">
              <tbody>
                <tr className="border-b border-gray-50"><td className="py-1.5">Mon – Fri</td><td className="text-right font-medium text-gray-700">8:00am – 6:00pm</td></tr>
                <tr className="border-b border-gray-50"><td className="py-1.5">Saturday</td><td className="text-right font-medium text-gray-700">9:00am – 1:00pm</td></tr>
                <tr><td className="py-1.5">Sunday</td><td className="text-right font-medium text-red-500">Closed</td></tr>
              </tbody>
            </table>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <h3 className="font-bold text-gray-800 mb-3">📞 Contact</h3>
            <p className="text-sm text-gray-500 mb-1">📞 (03) 9000 1234</p>
            <p className="text-sm text-gray-500">✉️ info@wellspringclinic.com.au</p>
          </div>

          <div className="bg-blue-50 rounded-xl border border-blue-200 p-5">
            <h3 className="font-bold text-blue-700 mb-2">💳 Bulk Billing</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Bulk billing available for eligible Medicare card holders. Please bring your Medicare card to your appointment.
            </p>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Appointment;