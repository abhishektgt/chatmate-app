import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./homepage.css";

const Chat = () => {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hey there! I'm your companion 💕 Ready to chat? ✨" },
  ]);
  const [input, setInput] = useState("");
  const [user, setUser] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("https://chatmate-backend-z54c.onrender.com/api/messages", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        const transformedMessages = res.data.map(msg => ({
          from: msg.sender,
          text: msg.text
        }));
        
        if (transformedMessages.length === 0) {
          setMessages([{ from: "bot", text: "Hey there! I'm your companion 💕 Ready to chat? ✨" }]);
        } else {
          setMessages(transformedMessages);
        }
      } catch (err) {
        console.error("Failed to load messages");
        setMessages([{ from: "bot", text: "Hey there! I'm your companion 🤖" }]);
      }
    };

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      fetchMessages();
    }
  }, []);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { from: "user", text: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    const recentMessages = updatedMessages.slice(-10);
    const contextString = recentMessages
      .map((msg) => `${msg.from === "user" ? "User" : user?.companionName || "Companion"}: ${msg.text}`)
      .join("\n");

    const prompt = `
You are a companion named "${user?.companionName || "Companion"}".

Traits of the User:
- Name: ${user?.name}
- Likes: ${user?.userLikes}
- Dislikes: ${user?.userDislikes}
- Hobbies: ${user?.userHobbies}
- Goals: ${user?.userGoals}

Traits of the Companion:
- Skills: ${user?.companionSkills}
- Likes: ${user?.companionLikes}
- Dislikes: ${user?.companionDislikes}
- Tone: ${user?.companionTone}
- Purpose: ${user?.companionPurpose}

Here is the recent conversation:
${contextString}

Respond to the user's latest message with empathy, and maintain your ${user?.companionTone?.toLowerCase()} tone and make sure your response short and to the point so seems real like a real person.

User: ${input}
Companion:`.trim();

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "https://chatmate-backend-z54c.onrender.com/api/chat",
        { prompt, input },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const botReply = {
        from: "bot",
        text: res.data.reply,
      };
      setMessages((prev) => [...prev, botReply]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text: "Oops! Bot is offline or you're not logged in.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const emojis = [
    "😀", "😃", "😄", "😁", "😅", "😂", "🤣", "😊", "😇", "🙂", "🙃", "😉", "😌", "😍", "🥰", "😘", "😗", "😙", "😚", "😋", "😛", "😝", "😜", "🤪", "🤨", "🧐", "🤓", "😎", "🥸", "🤩", "🥳", "😏", "😒", "😞", "😔", "😟", "😕", "🙁", "☹️", "😣", "😖", "😫", "😩", "🥺", "😢", "😭", "😤", "😠", "😡", "🤬", "🤯", "😳", "🥵", "🥶", "😱", "😨", "😰", "😥", "😓", "🤗", "🤔", "🤭", "🤫", "🤥", "😶", "😐", "😑", "😬", "🙄", "😯", "😦", "😧", "😮", "😲", "🥱", "😴", "🤤", "😪", "😵", "🤐", "🥴", "🤢", "🤮", "🤧", "😷", "🤒", "🤕", "🤑", "🤠", "👍", "👎", "👌", "🤏", "✌️", "🤞", "🤟", "🤘", "🤙", "👈", "👉", "👆", "🖕", "👇", "☝️", "👋", "🤚", "🖐️", "✋", "🖖", "👏", "🙌", "🤲", "🤝", "🙏", "✍️", "💅", "🤳", "💪", "❤️", "🧡", "💛", "💚", "💙", "💜", "🖤", "🤍", "🤎", "💔", "❣️", "💕", "💞", "💓", "💗", "💖", "💘", "💝", "💟", "💌", "💢", "💥", "💤", "💦", "💨", "💫", "💬", "🗨️", "🗯️", "💭", "🔥", "⭐", "🌟", "✨", "💎", "🎉", "🎊", "🎁", "🎈", "🎀", "🎂", "🍰", "🧁", "🍭", "🍬", "🍫", "🍿", "🍩", "🍪", "☕", "🍺", "🍻", "🥂", "🍷", "🍾", "🍸", "🍹", "🍨", "🍧", "🧊"
  ];

  const handleEmojiClick = (emoji) => {
    setInput(prev => prev + emoji);
    setShowEmojiPicker(false);
  };
  const handleClearHistory = async () => {
    if (window.confirm("Are you sure you want to clear all chat history? This action cannot be undone.")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete("https://chatmate-backend-z54c.onrender.com/api/messages", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMessages([{ from: "bot", text: "Hey there! I'm your companion 🤖" }]);
      } catch (err) {
        alert("Failed to clear chat history. Please try again.");
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const handleUserChange = (field, value) => {
    setUser((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put("https://chatmate-backend-z54c.onrender.com/api/user", user, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
      alert("Profile updated successfully!");
      setShowSettings(false);
    } catch (err) {
      alert("Failed to update user preferences.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col relative">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 shadow-lg">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              🤖
            </div>
            <h1 className="text-xl font-bold">{user?.companionName || "Companion Chat"}</h1>
          </div>
          <div className="flex items-center gap-3 text-sm">
            {user && (
              <div className="bg-white/10 px-3 py-1 rounded-full flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                <span>{user.name || user.email}</span>
              </div>
            )}
            <button
              onClick={handleClearHistory}
              className="bg-red-500/20 hover:bg-red-500/30 px-3 py-1 rounded-lg transition-colors duration-200 flex items-center gap-1"
              title="Clear Chat History"
            >
              🗑️ Clear
            </button>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="bg-white/10 hover:bg-white/20 px-3 py-1 rounded-lg transition-colors duration-200"
            >
              ⚙️ Settings
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-500/20 hover:bg-red-500/30 px-3 py-1 rounded-lg transition-colors duration-200"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 max-w-4xl mx-auto w-full">
        <div className="space-y-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-sm lg:max-w-md px-4 py-3 rounded-2xl shadow-sm ${
                  msg.from === "user"
                    ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-br-md"
                    : "bg-white text-gray-800 rounded-bl-md border border-gray-100"
                }`}
              >
                <p className="text-sm leading-relaxed">{msg.text}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white text-gray-800 rounded-2xl rounded-bl-md border border-gray-100 px-4 py-3 shadow-sm">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                  <span className="text-xs text-gray-500">Typing...</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Chat Input */}
      <div className="border-t bg-white/70 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto p-4">
          {/* Emoji Picker */}
          {showEmojiPicker && (
            <div className="mb-4 bg-white rounded-2xl shadow-lg border border-gray-200 p-4 max-h-48 overflow-y-auto">
              <div className="flex flex-wrap gap-2">
                {emojis.map((emoji, index) => (
                  <button
                    key={index}
                    onClick={() => handleEmojiClick(emoji)}
                    className="text-xl hover:bg-gray-100 rounded-lg p-2 transition-colors duration-150"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          <form onSubmit={handleSend} className="flex gap-3 items-end">
            <div className="flex-1 relative">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                disabled={isLoading}
                className="w-full px-4 py-3 pr-20 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none bg-white shadow-sm disabled:opacity-50"
              />
              <button
                type="button"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className="absolute right-12 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xl transition-colors"
              >
                😊
              </button>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                💬
              </div>
            </div>
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 disabled:from-gray-400 disabled:to-gray-400 text-white px-6 py-3 rounded-2xl transition-all duration-200 shadow-sm disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isLoading ? "..." : "Send"}
              {!isLoading && <span>🚀</span>}
            </button>
          </form>
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && user && (
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm z-50 flex justify-end">
          <div className="w-full sm:w-96 h-full bg-white shadow-2xl overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 shadow-sm">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold">Edit Profile</h2>
                <button
                  onClick={() => setShowSettings(false)}
                  className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* User Section */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide border-b pb-2">Your Profile</h3>
                {["name", "userLikes", "userDislikes", "userHobbies", "userGoals"].map((field) => (
                  <div key={field}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {field.replace(/([A-Z])/g, " $1").replace("user", "").trim()}
                    </label>
                    <input
                      type="text"
                      value={user[field] || ""}
                      onChange={(e) => handleUserChange(field, e.target.value)}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder={`Enter your ${field.replace(/([A-Z])/g, " $1").replace("user", "").trim().toLowerCase()}...`}
                    />
                  </div>
                ))}
              </div>

              {/* Companion Section */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide border-b pb-2">Companion Settings</h3>
                {["companionName", "companionSkills", "companionLikes", "companionDislikes", "companionTone", "companionPurpose"].map((field) => (
                  <div key={field}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {field.replace(/([A-Z])/g, " $1").replace("companion", "").trim()}
                    </label>
                    <input
                      type="text"
                      value={user[field] || ""}
                      onChange={(e) => handleUserChange(field, e.target.value)}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder={field === "companionTone" ? "e.g., friendly, playful, caring..." : `Enter ${field.replace(/([A-Z])/g, " $1").replace("companion", "").trim().toLowerCase()}...`}
                    />
                  </div>
                ))}
              </div>

              <button
                onClick={handleSaveChanges}
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-4 py-3 rounded-lg transition-all duration-200 font-medium shadow-sm"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;