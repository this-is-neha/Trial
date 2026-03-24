import React, { useState } from "react";
import { Link } from "react-router-dom";

const BMI_CATEGORIES = [
  { label: "Underweight", range: "Below 18.5", color: "blue",   badge: "bg-blue-100 text-blue-700" },
  { label: "Normal",      range: "18.5 – 24.9", color: "green", badge: "bg-green-100 text-green-700" },
  { label: "Overweight",  range: "25.0 – 29.9", color: "yellow",badge: "bg-yellow-100 text-yellow-700" },
  { label: "Obese",       range: "30.0 and above", color: "red", badge: "bg-red-100 text-red-700" },
];

const getCategory = (bmi) => {
  if (bmi < 18.5) return {
    label: "Underweight", advice: "Consider speaking with our doctors about a balanced nutrition plan.",
    style: "bg-blue-50 border-blue-300", scoreColor: "text-blue-700", pct: 12,
  };
  if (bmi < 25) return {
    label: "Normal", advice: "Great work! Maintain your healthy lifestyle with regular exercise and a balanced diet.",
    style: "bg-green-50 border-green-300", scoreColor: "text-green-700", pct: 36,
  };
  if (bmi < 30) return {
    label: "Overweight", advice: "Consider lifestyle adjustments. Our GPs can help with a personalised plan.",
    style: "bg-yellow-50 border-yellow-300", scoreColor: "text-yellow-600", pct: 62,
  };
  return {
    label: "Obese", advice: "We recommend a full health assessment with one of our doctors.",
    style: "bg-red-50 border-red-300", scoreColor: "text-red-600", pct: 85,
  };
};

const Bmi = () => {
  const [unit, setUnit]       = useState("metric"); // 'metric' | 'imperial'
  const [result, setResult]   = useState(null);
  const [errors, setErrors]   = useState({});

  // Metric fields
  const [heightCm, setHeightCm] = useState("");
  const [weightKg, setWeightKg] = useState("");

  // Imperial fields
  const [heightFt, setHeightFt] = useState("");
  const [heightIn, setHeightIn] = useState("");
  const [weightLb, setWeightLb] = useState("");

  const calculate = () => {
    setErrors({});
    setResult(null);
    let heightM, weight;

    if (unit === "metric") {
      const h = parseFloat(heightCm);
      const w = parseFloat(weightKg);
      const e = {};
      if (!h || h < 50 || h > 300) e.heightCm = "Enter a valid height (50 – 300 cm).";
      if (!w || w < 10 || w > 500) e.weightKg = "Enter a valid weight (10 – 500 kg).";
      if (Object.keys(e).length)   { setErrors(e); return; }
      heightM = h / 100;
      weight  = w;
    } else {
      const ft  = parseFloat(heightFt) || 0;
      const ins = parseFloat(heightIn) || 0;
      const lb  = parseFloat(weightLb);
      const e   = {};
      if (ft === 0 && ins === 0)   e.heightFt = "Enter a valid height.";
      if (!lb || lb <= 0)          e.weightLb = "Enter a valid weight.";
      if (Object.keys(e).length)   { setErrors(e); return; }
      heightM = (ft * 12 + ins) * 0.0254;
      weight  = lb * 0.453592;
    }

    const bmi = weight / (heightM * heightM);
    setResult({ bmi: bmi.toFixed(1), ...getCategory(bmi) });
  };

  const reset = () => {
    setResult(null); setErrors({});
    setHeightCm(""); setWeightKg("");
    setHeightFt(""); setHeightIn(""); setWeightLb("");
  };

  const inputCls = (key) =>
    `w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
      errors[key] ? "border-red-400" : "border-gray-200"
    }`;

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── Hero ── */}
      <section className="bg-gradient-to-br from-blue-700 to-teal-600 text-white py-16 text-center px-6">
        <h1 className="text-4xl font-bold mb-3">BMI Calculator</h1>
        <p className="text-blue-100 text-lg">
          Calculate your Body Mass Index and understand what it means for your health
        </p>
      </section>

      <section className="max-w-screen-xl mx-auto px-6 py-14 grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

        {/* ── Calculator Card ── */}
        <div className="bg-white rounded-2xl shadow p-8 border-t-4 border-blue-700">
          <h2 className="text-2xl font-bold text-gray-800 mb-1">Calculate Your BMI</h2>
          <p className="text-gray-400 text-sm mb-6">Enter your height and weight below</p>

          {/* Unit toggle */}
          <div className="flex gap-2 mb-6">
            {["metric", "imperial"].map((u) => (
              <button
                key={u}
                onClick={() => { setUnit(u); reset(); }}
                className={`px-5 py-2 rounded-lg text-sm font-medium border transition-colors duration-200 ${
                  unit === u
                    ? "bg-blue-700 text-white border-blue-700"
                    : "bg-white text-gray-600 border-gray-200 hover:border-blue-400"
                }`}
              >
                {u === "metric" ? "Metric (cm / kg)" : "Imperial (ft / lbs)"}
              </button>
            ))}
          </div>

          {/* Metric inputs */}
          {unit === "metric" && (
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Height (cm)</label>
                <input
                  type="number" value={heightCm} onChange={(e) => setHeightCm(e.target.value)}
                  placeholder="e.g. 170" min="50" max="300"
                  onKeyDown={(e) => e.key === "Enter" && calculate()}
                  className={inputCls("heightCm")}
                />
                {errors.heightCm && <p className="text-red-500 text-xs mt-1">{errors.heightCm}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label>
                <input
                  type="number" value={weightKg} onChange={(e) => setWeightKg(e.target.value)}
                  placeholder="e.g. 70" min="10" max="500"
                  onKeyDown={(e) => e.key === "Enter" && calculate()}
                  className={inputCls("weightKg")}
                />
                {errors.weightKg && <p className="text-red-500 text-xs mt-1">{errors.weightKg}</p>}
              </div>
            </div>
          )}

          {/* Imperial inputs */}
          {unit === "imperial" && (
            <div className="space-y-4 mb-6">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Height (ft)</label>
                  <input
                    type="number" value={heightFt} onChange={(e) => setHeightFt(e.target.value)}
                    placeholder="e.g. 5" min="1" max="9"
                    className={inputCls("heightFt")}
                  />
                  {errors.heightFt && <p className="text-red-500 text-xs mt-1">{errors.heightFt}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Height (in)</label>
                  <input
                    type="number" value={heightIn} onChange={(e) => setHeightIn(e.target.value)}
                    placeholder="e.g. 7" min="0" max="11"
                    className={inputCls("heightIn")}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Weight (lbs)</label>
                <input
                  type="number" value={weightLb} onChange={(e) => setWeightLb(e.target.value)}
                  placeholder="e.g. 154" min="20" max="1000"
                  onKeyDown={(e) => e.key === "Enter" && calculate()}
                  className={inputCls("weightLb")}
                />
                {errors.weightLb && <p className="text-red-500 text-xs mt-1">{errors.weightLb}</p>}
              </div>
            </div>
          )}

          <button
            onClick={calculate}
            className="w-full py-3 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-lg transition-colors duration-200 text-base"
          >
            Calculate BMI
          </button>

          {/* ── Result ── */}
          {result && (
            <div className={`mt-6 rounded-xl border-2 p-6 text-center ${result.style}`}>
              <p className={`text-4xl font-extrabold mb-1 ${result.scoreColor}`}>
                {result.bmi}
              </p>
              <p className={`text-lg font-bold mb-2 ${result.scoreColor}`}>
                {result.label}
              </p>
              <p className="text-gray-500 text-sm mb-5 max-w-xs mx-auto">{result.advice}</p>

              {/* Scale bar */}
              <div className="mb-2 relative">
                <div className="h-3 rounded-full overflow-hidden"
                  style={{ background: "linear-gradient(to right, #93c5fd, #86efac, #fcd34d, #fca5a5)" }}
                />
                {/* Marker */}
                <div
                  className="absolute top-0 text-lg leading-none transition-all duration-500"
                  style={{ left: `calc(${result.pct}% - 8px)`, marginTop: "-2px" }}
                >▼</div>
              </div>
              <div className="flex justify-between text-xs text-gray-400 mb-5">
                <span>Underweight</span><span>Normal</span><span>Overweight</span><span>Obese</span>
              </div>

              <Link
                to="/appointment"
                className="inline-block bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg hover:bg-blue-800 transition text-sm"
              >
                Speak to a Doctor
              </Link>
            </div>
          )}
        </div>

        {/* ── Info Panel ── */}
        <div className="space-y-6">

          {/* Categories table */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-1">BMI Categories</h2>
            <p className="text-gray-400 text-sm mb-4">According to the World Health Organisation</p>
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-blue-50 text-blue-700">
                  <th className="text-left px-4 py-2.5 rounded-tl-lg font-semibold">BMI Range</th>
                  <th className="text-left px-4 py-2.5 rounded-tr-lg font-semibold">Category</th>
                </tr>
              </thead>
              <tbody>
                {BMI_CATEGORIES.map(({ label, range, badge }) => (
                  <tr key={label} className="border-b border-gray-50 last:border-0">
                    <td className="px-4 py-3 text-gray-600">{range}</td>
                    <td className="px-4 py-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${badge}`}>
                        {label}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Important note */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-3">⚠️ Important Note</h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-3">
              BMI is a general screening tool and does <strong>not</strong> account for muscle mass,
              bone density, age, sex, or ethnicity. It should not be used as a sole diagnostic measure.
            </p>
            <p className="text-gray-500 text-sm leading-relaxed mb-4">
              Always consult one of our doctors for a complete health assessment tailored to you.
            </p>
            <Link
              to="/appointment"
              className="inline-block border-2 border-blue-700 text-blue-700 font-semibold px-5 py-2.5 rounded-lg hover:bg-blue-50 transition text-sm"
            >
              Book a Consultation
            </Link>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Bmi;