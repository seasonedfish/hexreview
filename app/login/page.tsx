"use client";
import React, { FormEvent, ChangeEvent, useState } from "react";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  Github,
  Hexagon,
  Code2,
} from "lucide-react";
import Link from "next/link";
export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleGithubLogin = () => {
    // Redirect to the backend authentication route
    window.location.href = "/api/backend/github"; // Update this path to your backend endpoint
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      {/* Floating Background Hexagons */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
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
              </div>
              <Code2
                size={30}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-purple-300"
              />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-purple-300 to-purple-400 bg-clip-text text-transparent">
              Welcome Back
            </h1>
            <p className="text-gray-400 mt-2">
              Sign in to continue to HexReview
            </p>
          </div>

          {/* GitHub Sign In */}
          <button 
            onClick={handleGithubLogin} // Add the onClick handler
            className="w-full bg-white/[0.05] hover:bg-white/[0.08] border border-white/[0.05] text-white rounded-xl p-3 flex items-center justify-center gap-2 mb-6 transition-colors">
            <Github size={20} />
            <span>Continue with GitHub</span>
          </button>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/[0.05]"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-900 text-gray-400">
                Or continue with email
              </span>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-white/[0.05] border border-white/[0.05] text-white rounded-xl px-4 py-3 pl-10 focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-500"
                  placeholder="john@example.com"
                  required
                />
                <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-500" />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-sm font-medium text-gray-300">
                  Password
                </label>
                <a
                  href="#"
                  className="text-sm text-purple-400 hover:text-purple-300"
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full bg-white/[0.05] border border-white/[0.05] text-white rounded-xl px-4 py-3 pl-10 focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-500"
                  placeholder="••••••••"
                  required
                />
                <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-500" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-gray-500 hover:text-gray-300"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="rounded border-white/[0.05] bg-white/[0.05] text-purple-500 focus:ring-purple-500 focus:ring-offset-0"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-gray-400">
                Remember me
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-xl p-3 font-medium hover:from-purple-700 hover:to-purple-600 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 transition-all"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                </div>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Sign Up Link */}
          <p className="mt-6 text-center text-gray-400">
            Don&apos;t have an account?{" "}
            <a
              href="/register"
              className="text-purple-400 hover:text-purple-300"
            >
              Sign up
            </a>
          </p>
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
