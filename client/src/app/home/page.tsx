"use client";
import { Code, Play, Video, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function Page() {
  const router = useRouter();
  const [meetCode, setMeetCode] = useState("");

  const handleJoinMeet = () => {
    if (!meetCode.trim()) return;
    router.push(`/room/${meetCode}`);
  };

  const handleCreateMeet = () => {
    const newCode = crypto.randomUUID().slice(4, 8); // Simple random ID (adjust as needed)
    router.push(`/room/${newCode}`);
  };

  return (
    <div className="min-h-screen">
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-lg border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-to-r from-gray-700 to-gray-600 rounded-lg">
                <Code className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">CodeMeet</span>
            </div>

            <div className="flex space-x-4">
              <button
                className="px-6 py-2 bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 rounded-lg font-medium transition-all transform hover:scale-105"
                onClick={() => router.push("/home")}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            Enter Code or <br />
            <span className="bg-gradient-to-r from-gray-400 to-gray-600 bg-clip-text text-transparent">
              Start a new Meet
            </span>
          </h1>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <input
              type="text"
              placeholder="Enter meeting code"
              value={meetCode}
              onChange={(e) => setMeetCode(e.target.value)}
              className="w-full sm:w-80 px-4 py-3 rounded-lg border border-gray-600 bg-black/20 backdrop-blur placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
            />
            <button
              onClick={handleJoinMeet}
              className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg flex items-center gap-2 transition-all"
            >
              <Video className="h-5 w-5" />
              Join Meet
            </button>
          </div>

          <button
            onClick={handleCreateMeet}
            className="px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-all flex items-center gap-2 mx-auto"
          >
            <Plus className="h-5 w-5" />
            Create New Meet
          </button>
        </div>
      </section>
    </div>
  );
}
