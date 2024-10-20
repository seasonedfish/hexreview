"use client";
import React from "react";
import { ArrowLeft, Github, Hexagon, Code2 } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const handleGithubLogin = () => {
    window.location.href = "/api/backend/github";
  };

  // Create an array of predetermined positions for better distribution
  const hexagonPositions = [
    { top: "5%", left: "10%" },
    { top: "15%", left: "85%" },
    { top: "25%", left: "30%" },
    { top: "35%", left: "70%" },
    { top: "45%", left: "15%" },
    { top: "55%", left: "90%" },
    { top: "65%", left: "40%" },
    { top: "75%", left: "60%" },
    { top: "85%", left: "25%" },
    { top: "95%", left: "75%" },
    { top: "10%", left: "50%" },
    { top: "50%", left: "5%" },
    { top: "70%", left: "95%" },
    { top: "30%", left: "45%" },
    { top: "90%", left: "35%" },
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      {/* Floating Background Hexagons - Evenly distributed */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {hexagonPositions.map((position, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              top: position.top,
              left: position.left,
              animationDelay: `${i * 0.4}s`,
              opacity: 0.1,
            }}
          >
            <Hexagon
              size={100 + Math.random() * 300} // Size range from 100 to 200
              className="text-purple-500"
              style={{
                transform: `rotate(${Math.random() * 360}deg)`, // Random rotation
              }}
            />
            <div className="absolute inset-0 animate-spin-slow">
              <Hexagon
                size={80}
                className="text-purple-400/30"
                fill="transparent"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="w-full max-w-md relative">
        {/* Back Button */}
        <Link href="/">
          <button className="absolute left-0 -top-16 text-gray-400 hover:text-white flex items-center gap-2 transition-colors">
            <ArrowLeft size={20} />
            Return
          </button>
        </Link>

        {/* Main Card */}
        <div className="backdrop-blur-xl bg-white/[0.05] border border-white/[0.05] rounded-2xl p-8 shadow-xl relative z-10">
          {/* Logo and Header */}
          <div className="text-center mb-8">
            <div className="relative inline-block mb-4">
              <div className="relative z-10 transform-gpu animate-pulse-slow">
                <Hexagon
                  size={60}
                  className="text-purple-500"
                  fill="rgba(147, 51, 234, 0.1)"
                />
                <div className="absolute inset-0 animate-spin-slow">
                  <Hexagon
                    size={60}
                    className="text-purple-400/30"
                    fill="transparent"
                  />
                </div>
              </div>
              <Code2
                size={30}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-purple-300"
              />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-purple-300 to-purple-400 bg-clip-text text-transparent">
              Welcome to HexReview
            </h1>
            <p className="text-gray-400 mt-2">
              Sign in with your GitHub account
            </p>
          </div>

          {/* GitHub Sign In */}
          <button
            onClick={handleGithubLogin}
            className="w-full bg-white/[0.05] hover:bg-white/[0.08] border border-white/[0.05] text-white rounded-xl p-4 flex items-center justify-center gap-3 transition-colors"
          >
            <Github size={24} />
            <span className="text-lg">Continue with GitHub</span>
          </button>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx global>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-40px) rotate(10deg);
          }
        }
        .animate-float {
          animation: float 10s ease-in-out infinite;
        }
        .animate-pulse-slow {
          animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .animate-spin-slow {
          animation: spin 10s linear infinite;
        }
      `}</style>
    </div>
  );
}
