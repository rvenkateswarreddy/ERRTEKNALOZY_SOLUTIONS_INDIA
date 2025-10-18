'use client';
import { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../FirebaseConfig';

// You can customize or expand these types later!
const TYPE_OPTIONS = [
  {
    value: 'website',
    label: 'Website',
    desc: 'Professional, scalable web platforms for any purpose.',
  },
  {
    value: 'app',
    label: 'App',
    desc: 'Mobile apps for iOS, Android, or both — native or cross-platform.',
  },
  {
    value: 'automation',
    label: 'Automation Tool',
    desc: 'Automate workflows, business logic, or repetitive tasks.',
  },
  {
    value: 'ai',
    label: 'AI/ML Solution',
    desc: 'Custom AI models, chatbots, analytics & intelligent systems.',
  },
  {
    value: 'product',
    label: 'Digital Product',
    desc: 'SaaS, e-commerce, dashboards, portals and more.',
  },
  { value: 'other', label: 'Other', desc: 'Tell us your unique vision!' },
];

export default function CreationRequestForm() {
  const [type, setType] = useState(TYPE_OPTIONS[0].value);
  const [form, setForm] = useState({
    name: '',
    purpose: '',
    platform: '',
    features: '',
    targetAudience: '',
    phone: '',
    details: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  // Handle form input changes
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle type change
  const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setType(e.target.value);
    setForm({
      name: '',
      purpose: '',
      platform: '',
      features: '',
      targetAudience: '',
      phone: '',
      details: '',
    });
    setSubmitted(false);
    setError('');
  };

  // Handle form submit - store in Firestore
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      // Prepare record for Firestore
      const dataToSave = {
        requestType: type,
        projectName: form.name,
        purpose: form.purpose,
        platform: ['app', 'automation'].includes(type) ? form.platform : '',
        features: form.features,
        targetAudience: form.targetAudience,
        phoneNumber: form.phone,
        details: form.details,
        createdAt: serverTimestamp(),
      };
      await addDoc(collection(db, 'creationRequests'), dataToSave);
      setSubmitted(true);
      setForm({
        name: '',
        purpose: '',
        platform: '',
        features: '',
        targetAudience: '',
        phone: '',
        details: '',
      });
    } catch (err) {
      setError('Something went wrong. Please try again.');
      setSubmitted(false);
    }
  };

  return (
    <section
      className="py-16 px-4 min-h-screen flex items-center justify-center bg-gradient-to-br from-[#d1e7f9] via-[#dbe3f0] to-[#bbc3df]
 text-white"
    >
      <div
        className="w-full max-w-4xl mx-auto bg-[#C4E0E8]/95
 rounded-2xl p-10 sm:p-14 shadow-2xl border border-[#A0F0F9]"
      >
        <h2 className="text-3xl font-bold mb-2 text-[#007D9C] text-center">
          Request Your Digital Solution
        </h2>
        <p className="text-gray-800 mb-8 text-center text-base">
          Looking for a website, app, or something custom? Tell us your vision —
          our expert team will guide you from idea to launch!
        </p>
        {/* Type Selection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:grid-cols-3 mb-8">
          {TYPE_OPTIONS.map((opt) => (
            <label
              key={opt.value}
              className={`flex flex-col items-center px-2 py-2 rounded-lg border transition cursor-pointer select-none group
                ${
                  type === opt.value
                    ? 'bg-[#007D9C] border-[#A0F0F9] ring-2 ring-[#A0F0F9] text-white shadow-lg'
                    : 'bg-[#172C3A] border-[#22B8CF] text-[#A2F0FA]'
                }`}
            >
              <input
                type="radio"
                name="type"
                value={opt.value}
                checked={type === opt.value}
                onChange={handleTypeChange}
                className="sr-only"
              />
              <span className="font-bold text-base">{opt.label}</span>
            </label>
          ))}
        </div>
        {/* Form */}
        {submitted ? (
          <div className="p-6 bg-green-800 bg-opacity-80 rounded-xl text-center text-lg font-semibold text-white">
            Thanks for submitting! Our team will contact you soon.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-black/80 mb-1 font-medium">
                {type === 'website'
                  ? 'Website Name'
                  : type === 'app'
                  ? 'App Name'
                  : type === 'automation'
                  ? 'Automation Tool Name'
                  : type === 'ai'
                  ? 'AI/ML Solution Name'
                  : type === 'product'
                  ? 'Product Name'
                  : 'Project Name'}
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Project Name"
                className="w-full px-4 py-3 rounded-lg bg-[#172C3A] border border-cyan-700 text-white/80 text-lg"
              />
            </div>
            <div>
              <label className="block text-black/80 mb-1 font-medium">
                Purpose
              </label>
              <input
                name="purpose"
                value={form.purpose}
                onChange={handleChange}
                required
                placeholder="e.g. Sell products, automate tasks, launch SaaS"
                className="w-full px-4 py-3 rounded-lg bg-[#172C3A] border border-cyan-700 text-white/80 md:text-lg"
              />
            </div>
            {(type === 'app' || type === 'automation') && (
              <div>
                <label className="block text-black/80 mb-1 font-medium">
                  Platform
                </label>
                <select
                  name="platform"
                  value={form.platform}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-[#172C3A] border border-cyan-700 text-white/80 text-lg"
                >
                  <option value="">Select platform</option>
                  <option value="iOS">iOS</option>
                  <option value="Android">Android</option>
                  <option value="Desktop">Desktop</option>

                  <option value="Other">Other</option>
                </select>
              </div>
            )}
            <div>
              <label className="block text-black/80 mb-1 font-medium">
                Key Features / Requirements
              </label>
              <input
                name="features"
                value={form.features}
                onChange={handleChange}
                required
                placeholder="e.g. Payments, AI, chat, admin panel"
                className="w-full px-4 py-3 rounded-lg bg-[#172C3A] border border-cyan-700 text-white/80 text-lg"
              />
            </div>
            <div>
              <label className="block text-black/80 mb-1 font-medium">
                Target Audience
              </label>
              <input
                name="targetAudience"
                value={form.targetAudience}
                onChange={handleChange}
                required
                placeholder="e.g. Students, enterprises, public"
                className="w-full px-4 py-3 rounded-lg bg-[#172C3A] border border-cyan-700 text-white/80 text-lg"
              />
            </div>
            <div>
              <label className="block text-black/80 mb-1 font-medium">
                Phone Number
              </label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
                type="tel"
                pattern="[0-9]{10,15}"
                placeholder="Enter your phone number"
                className="w-full px-4 py-3 rounded-lg bg-[#172C3A] border border-cyan-700 text-white/80 text-lg"
              />
            </div>
            <div>
              <label className="block text-black/80 mb-1 font-medium">
                More Details (optional)
              </label>
              <textarea
                name="details"
                value={form.details}
                onChange={handleChange}
                rows={3}
                placeholder="Describe your requirements, timelines, inspirations, or questions…"
                className="w-full px-4 py-3 rounded-lg bg-[#172C3A] border border-cyan-700 text-white/80 text-base resize-none"
              />
            </div>
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <button
              type="submit"
              className="w-full py-3 mt-3 bg-[#007D9C] cursor-pointer border-[#A0F0F9] ring-2 ring-[#A0F0F9] text-white shadow-lg font-bold rounded-lg text-lg transition"
            >
              Request{' '}
              {TYPE_OPTIONS.find((opt) => opt.value === type)?.label ||
                'Project'}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

// "use client";
// import { useState } from "react";
// import Link from "next/link";
// import { collection, addDoc, serverTimestamp } from "firebase/firestore";
// import { db } from "../../FirebaseConfig";

// export default function OurRecentCreation() {
//   const [type, setType] = useState("website");
//   const [form, setForm] = useState({
//     name: "",
//     purpose: "",
//     platform: "",
//     features: "",
//     targetAudience: "",
//     phone: "",
//   });
//   const [submitted, setSubmitted] = useState(false);
//   const [error, setError] = useState("");

//   // Example project info
//   const project = {
//     name: "BrightMind Learning Platform",
//     description:
//       "BrightMind is an innovative online learning platform designed to empower students and educators with interactive courses, real-time progress tracking, and engaging multimedia lessons. Accessible from any device, BrightMind helps users achieve their learning goals with a seamless, modern user experience.",
//     images: [
//       "https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=700&q=80",
//       "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=700&q=80",
//       "https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=700&q=80",
//       "https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=700&q=80",
//     ],
//     websiteUrl: "/brightmind",
//   };

//   // Tooltip state
//   const [hovered, setHovered] = useState(false);

//   // Handle form input changes
//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   // Handle type change
//   const handleTypeChange = (e) => {
//     setType(e.target.value);
//     setForm({
//       name: "",
//       purpose: "",
//       platform: "",
//       features: "",
//       targetAudience: "",
//       phone: "",
//     });
//     setSubmitted(false);
//     setError("");
//   };

//   // Handle form submit - store in Firestore
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     try {

//       // Create meaningful key-value pairs for Firestore
//       const dataToSave = {
//         requestType: type, // "website" or "app"
//         projectName: form.name,
//         purpose: form.purpose,
//         platform: type === "app" ? form.platform : "",
//         features: form.features,
//         targetAudience: form.targetAudience,
//         phoneNumber: form.phone,
//         createdAt: serverTimestamp(),
//       };
//       await addDoc(collection(db, "creationRequests"), dataToSave);
//       setSubmitted(true);
//       setForm({
//         name: "",
//         purpose: "",
//         platform: "",
//         features: "",
//         targetAudience: "",
//         phone: "",
//       });
//     } catch (err) {
//       setError("Something went wrong. Please try again.");
//       setSubmitted(false);
//     }
//   };

//   return (
//     <section className="py-10 px-4 bg-gradient-to-br from-[#061a2e] via-[#0f1624] to-[#202a44] text-white" id="recent-creation">
//       <h2 className="text-4xl font-extrabold mb-4 text-cyan-400 text-center">
//         Our Recent Creation
//       </h2>
//       <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 items-start">
//         {/* Left: Project Showcase */}
//         <div className="lg:w-3/5 w-full">
//           <div className="bg-[#16213a] rounded-xl shadow-lg border border-cyan-800 p-7 mb-8 flex flex-col items-center">
//             <div className="w-full flex flex-col items-center">
//               <Link
//                 href={project.websiteUrl}
//                 className="font-bold text-2xl text-cyan-300 mb-2 text-center relative group transition"
//                 onMouseEnter={() => setHovered(true)}
//                 onMouseLeave={() => setHovered(false)}
//                 prefetch={true}
//                 style={{ display: "inline-block" }}
//               >
//                 {project.name}
//                 {/* Tooltip */}
//                 <span
//                   className={`absolute left-1/2 -translate-x-1/2 mt-2 px-3 py-1 bg-black bg-opacity-80 text-xs text-white rounded shadow transition-opacity pointer-events-none z-10
//                   ${hovered ? "opacity-100" : "opacity-0"}`}
//                 >
//                   Click here to see the full website
//                 </span>
//               </Link>
//             </div>
//             <p className="text-gray-200 mb-6 text-center">{project.description}</p>
//             {/* Responsive Image Gallery */}
//             <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
//               {project.images.map((img, idx) => (
//                 <div
//                   key={idx}
//                   className="rounded-xl overflow-hidden shadow-md border border-cyan-900 h-56 flex items-center justify-center bg-[#101828]"
//                 >
//                   <img
//                     src={img}
//                     alt={`${project.name} screenshot ${idx + 1}`}
//                     className="w-full h-full object-cover object-center"
//                     style={{ aspectRatio: "16/9" }}
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//         {/* Right: Request Form */}
//         <div className="lg:w-2/5 w-full bg-[#17213b] rounded-2xl p-8 shadow-2xl border border-cyan-800 sticky top-28">
//           <h3 className="text-2xl font-bold mb-6 text-cyan-300">Request Your {type === "website" ? "Website" : "App"} Creation</h3>
//           <div className="flex gap-4 mb-6">
//             <button
//               className={`px-4 py-2 rounded-full font-semibold transition-colors ${
//                 type === "website"
//                   ? "bg-cyan-600 text-white"
//                   : "bg-gray-800 text-cyan-300 hover:bg-cyan-700"
//               }`}
//               value="website"
//               onClick={handleTypeChange}
//             >
//               Website
//             </button>
//             <button
//               className={`px-4 py-2 rounded-full font-semibold transition-colors ${
//                 type === "app"
//                   ? "bg-cyan-600 text-white"
//                   : "bg-gray-800 text-cyan-300 hover:bg-cyan-700"
//               }`}
//               value="app"
//               onClick={handleTypeChange}
//             >
//               App
//             </button>
//           </div>
//           {submitted ? (
//             <div className="p-6 bg-green-800 bg-opacity-80 rounded-xl text-center text-lg font-semibold text-white">
//               Thanks for submitting! Our team will contact you soon.
//             </div>
//           ) : (
//             <form onSubmit={handleSubmit} className="space-y-5">
//               <div>
//                 <label className="block mb-1 font-medium">
//                   {type === "website" ? "Website Name" : "App Name"}
//                 </label>
//                 <input
//                   name="name"
//                   value={form.name}
//                   onChange={handleChange}
//                   required
//                   placeholder={type === "website" ? "My Business Website" : "My Mobile App"}
//                   className="w-full px-4 py-2 rounded-lg bg-[#101828] border border-cyan-700 text-white"
//                 />
//               </div>
//               <div>
//                 <label className="block mb-1 font-medium">Purpose</label>
//                 <input
//                   name="purpose"
//                   value={form.purpose}
//                   onChange={handleChange}
//                   required
//                   placeholder="e.g. Sell products online, track workouts"
//                   className="w-full px-4 py-2 rounded-lg bg-[#101828] border border-cyan-700 text-white"
//                 />
//               </div>
//               {type === "app" && (
//                 <div>
//                   <label className="block mb-1 font-medium">Platform</label>
//                   <select
//                     name="platform"
//                     value={form.platform}
//                     onChange={handleChange}
//                     required
//                     className="w-full px-4 py-2 rounded-lg bg-[#101828] border border-cyan-700 text-white"
//                   >
//                     <option value="">Select platform</option>
//                     <option value="iOS">iOS</option>
//                     <option value="Android">Android</option>
//                     <option value="Both">Both</option>
//                   </select>
//                 </div>
//               )}
//               <div>
//                 <label className="block mb-1 font-medium">
//                   Key Features / Requirements
//                 </label>
//                 <input
//                   name="features"
//                   value={form.features}
//                   onChange={handleChange}
//                   required
//                   placeholder="e.g. Chat, payments, admin panel"
//                   className="w-full px-4 py-2 rounded-lg bg-[#101828] border border-cyan-700 text-white"
//                 />
//               </div>
//               <div>
//                 <label className="block mb-1 font-medium">
//                   Target Audience
//                 </label>
//                 <input
//                   name="targetAudience"
//                   value={form.targetAudience}
//                   onChange={handleChange}
//                   required
//                   placeholder="e.g. Students, businesses, general public"
//                   className="w-full px-4 py-2 rounded-lg bg-[#101828] border border-cyan-700 text-white"
//                 />
//               </div>
//               <div>
//                 <label className="block mb-1 font-medium">Phone Number</label>
//                 <input
//                   name="phone"
//                   value={form.phone}
//                   onChange={handleChange}
//                   required
//                   type="tel"
//                   pattern="[0-9]{10,15}"
//                   placeholder="Enter your phone number"
//                   className="w-full px-4 py-2 rounded-lg bg-[#101828] border border-cyan-700 text-white"
//                 />
//               </div>
//               {error && (
//                 <div className="text-red-500 text-sm">{error}</div>
//               )}
//               <button
//                 type="submit"
//                 className="w-full py-3 mt-3 bg-cyan-600 hover:bg-cyan-700 text-white font-bold rounded-lg transition"
//               >
//                 Request {type === "website" ? "Website" : "App"}
//               </button>
//             </form>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// }
