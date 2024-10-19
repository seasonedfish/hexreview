"use client";
import React, { useState, useEffect } from "react";
import {
  Code2,
  MessageSquare,
  GitBranch,
  Hexagon,
  LogIn,
  UserPlus,
} from "lucide-react";
import Link from "next/link";

export default function SplashScreen() {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Only animate content in, don't auto-dismiss
    setTimeout(() => setShowContent(true), 500);
  }, []);

  const handleLogin = () => {
    // Handle login navigation/modal
    console.log("Login clicked");
  };

  const handleSignup = () => {
    // Handle signup navigation/modal
    console.log("Signup clicked");
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
      <div
        className={`transition-all duration-1000 ${
          showContent
            ? "opacity-100 transform translate-y-0"
            : "opacity-0 transform translate-y-8"
        }`}
      >
        {/* Main Content Container */}
        <div className="relative">
          {/* Floating Hexagons Background */}
          <div className="absolute inset-0 -z-10">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-float"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${i * 0.2}s`,
                  opacity: 0.1,
                }}
              >
                <Hexagon
                  size={40 + Math.random() * 40}
                  className="text-purple-500"
                />
              </div>
            ))}
          </div>

          {/* Logo and Title */}
          <div className="text-center mb-8">
            <div className="relative inline-block">
              <div className="relative z-10 transform-gpu animate-pulse-slow">
                <Hexagon
                  size={80}
                  className="text-purple-500"
                  fill="rgba(147, 51, 234, 0.1)"
                />
              </div>
              <Code2
                size={40}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-purple-300"
              />
            </div>
            <h1 className="mt-6 text-4xl font-bold bg-gradient-to-r from-purple-400 via-purple-300 to-purple-400 bg-clip-text text-transparent">
              HexReview
            </h1>
            <p className="mt-3 text-gray-400 text-lg">
              Code Annotation Reimagined
            </p>
          </div>

          {/* Auth Buttons */}
          <div className="flex justify-center gap-4 mb-8">
            <Link href="/login">
              <button
                onClick={handleLogin}
                className="group relative px-6 py-2 rounded-lg bg-purple-600 text-white font-medium transition-all hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                <span className="flex items-center gap-2">
                  <LogIn
                    size={18}
                    className="transform transition-transform group-hover:-translate-x-0.5"
                  />
                  Log In
                </span>
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-400 to-purple-600 opacity-0 group-hover:opacity-20 transition-opacity" />
              </button>
            </Link>
            <Link href="/register">
              <button
                onClick={handleSignup}
                className="group relative px-6 py-2 rounded-lg bg-transparent text-purple-400 font-medium border border-purple-500/30 transition-all hover:bg-purple-500/10 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                <span className="flex items-center gap-2">
                  <UserPlus
                    size={18}
                    className="transform transition-transform group-hover:scale-110"
                  />
                  Sign Up
                </span>
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-400 to-purple-600 opacity-0 group-hover:opacity-10 transition-opacity" />
              </button>
            </Link>
          </div>

          {/* Feature Hexagons */}
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col items-center space-y-2 group">
              <div className="p-3 bg-purple-500/10 rounded-xl transform transition-transform group-hover:scale-110">
                <Code2 className="text-purple-400" size={24} />
              </div>
              <span className="text-sm text-gray-400">Smart Parsing</span>
            </div>
            <div className="flex flex-col items-center space-y-2 group">
              <div className="p-3 bg-purple-500/10 rounded-xl transform transition-transform group-hover:scale-110">
                <MessageSquare className="text-purple-400" size={24} />
              </div>
              <span className="text-sm text-gray-400">Rich Comments</span>
            </div>
            <div className="flex flex-col items-center space-y-2 group">
              <div className="p-3 bg-purple-500/10 rounded-xl transform transition-transform group-hover:scale-110">
                <GitBranch className="text-purple-400" size={24} />
              </div>
              <span className="text-sm text-gray-400">Version Control</span>
            </div>
          </div>
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
            transform: translateY(-20px) rotate(10deg);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-pulse-slow {
          animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
}
