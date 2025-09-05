import React, { useState } from "react";

const prompts = [
  "THIS IS LINE 1",
  "SAMPLE LINE 2 : GROUNDWATER LEVEL FOR JAIPUR",
  "SAMPLE LINE 3",
  "Summarize key points",
];

const Chatbot = () => {
  const [theme, setTheme] = useState("light");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Toggle theme
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  // Send message handler
  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch(
        "https://6fbef31ac0b4.ngrok-free.app/api/ask",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question: userMessage.text }),
        }
      );

      if (!response.ok) {
        throw new Error("Backend not responding or request failed");
      }

      const data = await response.json();
      setMessages((prev) => [...prev, { sender: "bot", text: data.answer }]);
    } catch (error) {
      console.error("Error talking to backend:", error);
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "⚠️ Error: Could not connect to the chatbot. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const bgClass =
    theme === "light"
      ? "bg-gradient-to-br from-[#f8fafc] via-[#e0f2fe] to-[#f1f5f9] text-gray-900"
      : "bg-gradient-to-br from-[#18181b] via-[#23235b] to-[#23235b] text-white";

  return (
    <main
      className={`w-screen min-h-screen ${bgClass} transition-colors duration-500 relative flex flex-col items-center`}
    >
      {/* Header Section */}
      <div className="w-full flex justify-between items-center p-6">
        <div className="flex items-center gap-2">
          <span className="font-bold text-3xl">WATERBOY</span>
        </div>
        <button
          className={`rounded-full px-4 py-2 shadow text-sm font-semibold transition
            ${
              theme === "light"
                ? "bg-gray-200 text-gray-900 hover:bg-gray-300"
                : "bg-gray-800 text-white hover:bg-gray-700"
            }
          `}
          onClick={toggleTheme}
        >
          {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
        </button>
      </div>

      {/* Main Content Section */}
      <div className="w-full flex flex-col items-center px-4 pb-24">
        {/* Avatar, Greeting, and Prompts */}
        <div className="pt-8 text-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-green-600 shadow-lg flex items-center justify-center mx-auto mb-3">
            <span className="text-white text-4xl font-bold">🟢</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-semibold mb-1">
            Good evening, USER
          </h2>
          <h3 className="text-xl md:text-2xl font-bold text-center mb-2">
            Can I help you with anything?
          </h3>
          <p className="text-center text-gray-500 mb-6 max-w-lg mx-auto">
            Choose a prompt below or write your own to start chatting with WATERBOY
          </p>

          {/* Prompt Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {prompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => setInput(prompt)}
                className={`rounded-lg px-4 py-2 shadow text-sm font-medium transition
                  ${
                    theme === "light"
                      ? "bg-white border border-gray-200 text-gray-900 hover:bg-gray-100"
                      : "bg-gray-900 border border-gray-700 text-white hover:bg-gray-800"
                  }
                `}
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Messages */}
        <div className="w-full max-w-2xl px-2 space-y-3">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`px-3 py-2 rounded-lg max-w-[75%] ${
                msg.sender === "user"
                  ? "bg-green-600 text-white ml-auto"
                  : theme === "light"
                  ? "bg-gray-200 text-gray-800"
                  : "bg-[#232a36] text-white"
              }`}
            >
              {msg.text}
            </div>
          ))}
          {isLoading && (
            <div
              className={`px-3 py-2 rounded-lg max-w-[75%] animate-pulse ${
                theme === "light"
                  ? "bg-gray-200 text-gray-800"
                  : "bg-[#232a36] text-white"
              }`}
            >
              ...
            </div>
          )}
        </div>
      </div>

      {/* Input Row */}
      <div className="fixed bottom-0 left-0 w-full flex justify-center px-4 pb-4 bg-transparent backdrop-blur-sm">
        <div
          className={`flex items-center gap-2 rounded-full px-4 py-2 shadow border transition w-full max-w-2xl
            ${
              theme === "light"
                ? "bg-white border-gray-300"
                : "bg-[#232a36] border border-gray-700"
            }
          `}
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && !e.shiftKey && handleSend()
            }
            className={`flex-1 bg-transparent outline-none text-base py-2
              ${
                theme === "light"
                  ? "text-gray-900 placeholder-gray-400"
                  : "text-white placeholder-gray-400"
              }
            `}
            placeholder="Type your message..."
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            className={`rounded-full p-2 transition
              ${
                theme === "light"
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-green-500 text-white hover:bg-green-600"
              }
            `}
            disabled={isLoading}
          >
            ➤
          </button>
        </div>
      </div>
    </main>
  );
};

export default Chatbot;
