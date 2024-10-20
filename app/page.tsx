"use client";
import React, { useState, useEffect, ReactNode } from "react";
import { Code2, MessageSquare, GitBranch, Hexagon, Github } from "lucide-react";

interface CodeSnippetProps {
  children: ReactNode;
  delay?: number;
  position: { x: number; y: number };
  isLoaded: boolean;
}

const CodeSnippet: React.FC<CodeSnippetProps> = ({
  children,
  delay = 0,
  position,
  isLoaded,
}) => (
  <div
    className={`absolute text-gray-600 font-mono text-[200px] font-black whitespace-nowrap transition-all duration-1000`}
    style={{
      top: `${position.y}%`,
      left: `${position.x}%`,
      transform: isLoaded ? "translateY(0)" : "translateY(20px)",
      opacity: isLoaded ? 0.15 : 0,
      transitionDelay: `${delay}s`,
      animation: isLoaded
        ? `float-code 10s ease-in-out infinite ${delay}s`
        : "none",
    }}
  >
    {children}
  </div>
);

const calculatePositions = (count: number) => {
  const positions = [];
  const sections = 6;

  for (let i = 0; i < count; i++) {
    const x =
      Math.floor(i / sections) * (100 / sections) +
      Math.random() * (80 / sections);
    const y =
      (i % sections) * (100 / sections) + Math.random() * (80 / sections);
    positions.push({ x, y });
  }
  return positions.sort(() => Math.random() - 0.5);
};

const codeSnippets = [
  "const review = await...",
  "git commit -m 'Update'",
  "npm install hexreview",
  "import { useState }",
  "export default function",
  "def function",
  "npm run",
  "npm start",
];

export default function SplashScreen() {
  const [isLoaded, setIsLoaded] = useState(false);
  const positions = calculatePositions(codeSnippets.length);
  const handleGithubLogin = () => {
    window.location.href = "/api/backend/github";
  };
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center overflow-hidden">
      {/* Animated Background Grid */}
      <div
        className={`absolute inset-0 bg-grid transition-opacity duration-1000 ${
          isLoaded ? "opacity-10" : "opacity-0"
        }`}
      ></div>

      {/* Floating Code Snippets */}
      {codeSnippets.map((snippet, i) => (
        <CodeSnippet
          key={i}
          delay={i * 0.2}
          position={positions[i]}
          isLoaded={isLoaded}
        >
          {snippet}
        </CodeSnippet>
      ))}

      {/* Glowing Orbs */}
      <div
        className={`absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl transition-all duration-1000 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      ></div>
      <div
        className={`absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl transition-all duration-1000 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      ></div>

      {/* Main Content Container */}
      <div
        className={`relative z-10 transition-all duration-1000 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="relative backdrop-blur-sm bg-gray-900/50 p-12 rounded-2xl border border-purple-500/20 shadow-2xl">
          {/* Floating Hexagons Background */}
          <div className="absolute inset-0 -z-10">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className={`absolute animate-float transition-opacity duration-1000`}
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${i * 0.2}s`,
                  opacity: isLoaded ? 0.1 : 0,
                  transitionDelay: `${i * 0.1}s`,
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
            <div
              className={`relative inline-block transition-all duration-1000 ${
                isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
            >
              <div className="relative z-10 transform-gpu animate-pulse-slow">
                <div className="relative">
                  <Hexagon
                    size={80}
                    className="text-purple-500"
                    fill="rgba(147, 51, 234, 0.1)"
                  />
                  <div className="absolute inset-0 animate-spin-slow">
                    <Hexagon
                      size={80}
                      className="text-purple-400/30"
                      fill="transparent"
                    />
                  </div>
                </div>
              </div>
              <Code2
                size={40}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-purple-300"
              />
            </div>
            <h1
              className={`mt-6 text-4xl font-bold bg-gradient-to-r from-purple-400 via-purple-300 to-purple-400 bg-clip-text text-transparent animate-gradient transition-all duration-1000 ${
                isLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              HexReview
            </h1>
            <p
              className={`mt-3 text-gray-400 text-lg transition-all duration-1000 delay-100 ${
                isLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              Code Annotation Reimagined
            </p>
          </div>

          {/* Auth Buttons */}
          <div
            className={`flex justify-center gap-4 mb-8 transition-all duration-1000 delay-200 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {/* GitHub Sign In */}
            <button
              onClick={handleGithubLogin}
              className="w-full bg-white/[0.05] hover:bg-white/[0.08] border border-white/[0.05] text-white rounded-xl p-4 flex items-center justify-center gap-3 transition-colors"
            >
              <Github size={24} />
              <span className="text-lg">Continue with GitHub</span>
            </button>
          </div>

          {/* Feature Hexagons */}
          <div
            className={`grid grid-cols-3 gap-4 transition-all duration-1000 delay-300 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {[
              { icon: Code2, label: "Smart Parsing" },
              { icon: MessageSquare, label: "Rich Comments" },
              { icon: GitBranch, label: "Version Control" },
            ].map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-center space-y-2 group"
              >
                <div className="p-3 bg-purple-500/10 rounded-xl transform transition-transform group-hover:scale-110 shadow-md hover:shadow-lg relative overflow-hidden">
                  <feature.icon
                    className="text-purple-400 relative z-10"
                    size={24}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/20 to-purple-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                </div>
                <span className="text-sm text-gray-400">{feature.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 0.2;
          }
        }

        @keyframes float-code {
          0%,
          100% {
            transform: translateY(0px) translateX(0px);
          }
          50% {
            transform: translateY(-30px) translateX(20px);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(10deg);
          }
        }

        .animate-float-code {
          animation: float-code 10s ease-in-out infinite;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .animate-spin-slow {
          animation: spin 10s linear infinite;
        }

        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 4s linear infinite;
        }

        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .bg-grid {
          background-size: 50px 50px;
          background-image: linear-gradient(
              to right,
              rgba(147, 51, 234, 0.1) 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              rgba(147, 51, 234, 0.1) 1px,
              transparent 1px
            );
        }
      `}</style>
    </div>
  );
}
