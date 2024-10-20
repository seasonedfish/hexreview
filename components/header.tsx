"use client"; // Ensures the component is client-side
import { ChevronDown, Code2, Hexagon, LogOut, Settings, User } from "lucide-react";
import { useState } from "react"; // Only keep necessary imports
import { useRouter } from "next/navigation"; // Ensure useRouter is still imported

export default function Header() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      // Call the backend API to logout
      const response = await fetch('/api/logout', {
        method: 'POST',
      });

      if (response.ok) {
        // Redirect to the login page on successful logout
        router.push('/');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('An error occurred during logout', error);
    }
  };

    return (
        <header className="border-b border-white/[0.05] backdrop-blur-xl bg-gray-900/50">
            <div className="max-w-7xl mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <div className="relative">
                            <Hexagon
                                size={32}
                                className="text-purple-500"
                                fill="rgba(147, 51, 234, 0.1)"
                            />
                            <Code2
                                size={16}
                                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-purple-300"
                            />
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-purple-300 bg-clip-text text-transparent">
                            HexReview
                        </span>
                    </div>

                    {/* Profile Menu */}
                    <div className="relative">
                        <button
                            onClick={() => setIsProfileOpen(!isProfileOpen)}
                            className="flex items-center gap-2 bg-white/[0.05] hover:bg-white/[0.08] px-4 py-2 rounded-xl transition-colors"
                        >
                            <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                                <User size={16} className="text-purple-300" />
                            </div>
                            <ChevronDown size={16} className="text-gray-400" />
                        </button>

                        {/* Dropdown Menu */}
                        {isProfileOpen && (
                            <div className="absolute right-0 mt-2 w-48 backdrop-blur-xl bg-gray-900/95 border border-white/[0.05] rounded-xl shadow-xl z-50">
                                <div className="p-2">
                                    <button className="w-full flex items-center gap-2 px-4 py-2 text-gray-300 hover:bg-white/[0.05] rounded-lg transition-colors">
                                        <Settings size={16} />
                                        Settings
                                    </button>
                                    <button 
                                        onClick = {handleLogout}
                                        className="w-full flex items-center gap-2 px-4 py-2 text-red-400 hover:bg-white/[0.05] rounded-lg transition-colors">
                                        <LogOut size={16} />
                                        Logout
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    )
}