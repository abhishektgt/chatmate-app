import { useState } from "react";
import axios from "axios";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    userLikes: "",
    userDislikes: "",
    userHobbies: "",
    userGoals: "",
    companionName: "",
    companionSkills: "",
    companionLikes: "",
    companionDislikes: "",
    companionTone: "",
    companionPurpose: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await axios.post("https://chatmate-backend-z54c.onrender.com/api/auth/signup", form);
      setMessage("✅ User signed up successfully!");
      setForm({
        name: "",
        email: "",
        password: "",
        userLikes: "",
        userDislikes: "",
        userHobbies: "",
        userGoals: "",
        companionName: "",
        companionSkills: "",
        companionLikes: "",
        companionDislikes: "",
        companionTone: "",
        companionPurpose: "",
      });
    } catch (err) {
      setMessage(err.response?.data?.message || "❌ Signup failed");
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full overflow-y-auto max-h-[90vh]">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Create an Account</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Basic Info */}
            <div className="grid grid-cols-2 gap-4">
              <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required className="border p-2 rounded-md" />
              <input name="email" placeholder="Email" value={form.email} onChange={handleChange} type="email" required className="border p-2 rounded-md" />
            </div>
            <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required className="w-full border p-2 rounded-md" />

            {/* User Preferences */}
            <hr className="my-2" />
            <h3 className="font-semibold text-gray-700">Your Preferences</h3>
            <div className="grid grid-cols-2 gap-4">
              <input name="userLikes" placeholder="Your Likes" value={form.userLikes} onChange={handleChange} className="border p-2 rounded-md" />
              <input name="userDislikes" placeholder="Your Dislikes" value={form.userDislikes} onChange={handleChange} className="border p-2 rounded-md" />
              <input name="userHobbies" placeholder="Your Hobbies" value={form.userHobbies} onChange={handleChange} className="border p-2 rounded-md" />
              <input name="userGoals" placeholder="Your Goals" value={form.userGoals} onChange={handleChange} className="border p-2 rounded-md" />
            </div>

            {/* Companion Settings */}
            <hr className="my-2" />
            <h3 className="font-semibold text-gray-700">Your Companion Setup</h3>
            <div className="grid grid-cols-2 gap-4">
              <input name="companionName" placeholder="Companion Name" value={form.companionName} onChange={handleChange} className="border p-2 rounded-md" />
              <input name="companionSkills" placeholder="Companion Skills (comma separated)" value={form.companionSkills} onChange={handleChange} className="border p-2 rounded-md" />
              <input name="companionLikes" placeholder="Companion Likes" value={form.companionLikes} onChange={handleChange} className="border p-2 rounded-md" />
              <input name="companionDislikes" placeholder="Companion Dislikes" value={form.companionDislikes} onChange={handleChange} className="border p-2 rounded-md" />
              <input name="companionTone" placeholder="Companion Tone (e.g. Friendly, Sarcastic)" value={form.companionTone} onChange={handleChange} className="border p-2 rounded-md" />
              <input name="companionPurpose" placeholder="Purpose (e.g. Motivational bot, Study partner)" value={form.companionPurpose} onChange={handleChange} className="border p-2 rounded-md" />
            </div>

            {/* Submit */}
            <button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-md transition duration-200">
              Sign Up
            </button>
          </form>
        {message && <p className="mt-4 text-center text-sm text-gray-700">{message}</p>}
        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account? <a href="/login" className="text-green-600 hover:underline">Login</a>
        </p>
      </div>
    </div>
  );
}
