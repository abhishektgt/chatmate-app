// HowItWorks.jsx
import React from "react";
import './homepage.css';

const steps = [
  {
    step: "1. Create Your Profile",
    desc: "Tell us who you are and what you’re looking for.",
  },
  {
    step: "2. Customize Your Chatmate",
    desc: "Choose your chatmate’s tone and memory preferences.",
  },
  {
    step: "3. Start Chatting",
    desc: "Talk in real time — your chatmate listens and remembers.",
  },
  {
    step: "4. Build a Bond",
    desc: "Your AI grows with every message you send.",
  },
];

const HowItWorks = () => {
  return (
    <div className="min-h-screen flex flex-col items-center p-6 bg-gradient-to-b from-pink-50 to-white">
      <h1 className="text-3xl font-bold text-pink-600 mb-4">How Chatmate Works ⚙️</h1>
      <p className="text-gray-600 max-w-xl text-center mb-10">
        Chatmate combines short-term and long-term memory to hold truly personalized conversations. Here’s how you get started:
      </p>
      <div className="grid sm:grid-cols-2 gap-6 max-w-3xl w-full">
        {steps.map((s, i) => (
          <div
            key={i}
            className="bg-white border p-5 rounded-xl shadow-sm text-left"
          >
            <h3 className="text-pink-600 font-semibold mb-1">{s.step}</h3>
            <p className="text-gray-700 text-sm">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
