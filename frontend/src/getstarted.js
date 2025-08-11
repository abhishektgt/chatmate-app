// GetStarted.jsx
import React from "react";
import './homepage.css'; // Assuming you have some styles in homepage.css

const GetStarted = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-white text-center">
      <h1 className="text-3xl font-bold text-pink-600 mb-4">
        Let’s Set Up Your Chatmate 🚀
      </h1>
      <p className="text-gray-600 max-w-md mb-8">
        Tell us a bit about yourself and how you’d like your Chatmate to behave. Your preferences help personalize your AI companion.
      </p>
      <form className="space-y-4 w-full max-w-md text-left">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Your Name
          </label>
          <input
            type="text"
            placeholder="e.g. Abhishek"
            className="w-full mt-1 px-4 py-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Chatmate's Personality
          </label>
          <select className="w-full mt-1 px-4 py-2 border rounded-md">
            <option value="friendly">Friendly</option>
            <option value="romantic">Romantic</option>
            <option value="motivational">Motivational Coach</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            What should Chatmate remember about you?
          </label>
          <textarea
            rows="3"
            placeholder="e.g. I love anime, I'm learning React..."
            className="w-full mt-1 px-4 py-2 border rounded-md"
          />
        </div>
        <button
          type="submit"
          className="bg-pink-500 text-white px-6 py-2 rounded-md hover:bg-pink-600"
        >
          Start Chatting 💬
        </button>
      </form>
    </div>
  );
};

export default GetStarted;
