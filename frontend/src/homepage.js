// HomePage.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./homepage.css"; 

const features = [
  {
    title: "🧠 Remembers You",
    desc: "Your chatmate learns and remembers your interests and goals.",
  },
  {
    title: "🗣️ Personalized Personality",
    desc: "Choose how your chatmate talks — chill, flirty, or motivational.",
  },
  {
    title: "🧾 Shared History",
    desc: "Continue conversations right where you left off.",
  },
  {
    title: "🔒 Private by Design",
    desc: "You control what is remembered or forgotten.",
  },
];

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white flex flex-col items-center p-6 text-center">
      <div className="max-w-2xl mt-16">
        <h1 className="text-4xl font-bold text-pink-600 mb-4">
          Meet Your AI Chatmate 💬
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          A personalized AI that remembers you, talks your way, and grows with you.
        </p>
        <div className="flex justify-center gap-4">
          
          <Link
            to="/howitworks"
            className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-md text-lg"
          >
            See How It Works 
          </Link>
          <Link to="signup" className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-md text-lg"> Signup
          </Link>

          <Link to="login" className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-md text-lg"> Login
          </Link>
        </div>

      </div>

      <section className="mt-20 w-full max-w-3xl">
        <h2 className="text-2xl font-semibold mb-6 text-pink-700">Why Chatmate?</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {features.map((f, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border bg-white shadow-sm text-left"
            >
              <h3 className="font-semibold text-lg text-gray-800 mb-1">{f.title}</h3>
              <p className="text-gray-600 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="mt-24 text-gray-500 text-sm">
        © 2025 Chatmate. Built with ❤️
      </footer>
    </div>
  );
};

export default HomePage;
