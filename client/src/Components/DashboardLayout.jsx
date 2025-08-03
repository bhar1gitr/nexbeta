"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import {
  LayoutDashboard,
  Package,
  Settings,
  LogOut,
  Loader2,
  Globe,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Facebook,
  Youtube,
} from "lucide-react"
import Dashboard from "./Dashboard"
import Products from "./Products"
import SettingsComponent from "./Settings"
import { useTheme } from "./ThemeContext"
import themes from "./themeStyles"
import Cookies from "js-cookie"
import { jwtDecode } from 'jwt-decode';

const getSocialIcon = (url) => {

  if (!url) return Globe

  const domain = url.toLowerCase()

  if (domain.includes("github.com")) return Github
  if (domain.includes("linkedin.com")) return Linkedin
  if (domain.includes("twitter.com") || domain.includes("x.com")) return Twitter
  if (domain.includes("instagram.com")) return Instagram
  if (domain.includes("facebook.com")) return Facebook
  if (domain.includes("youtube.com")) return Youtube

  return Globe
}

const getSocialPlatformName = (url) => {
  if (!url) return "Website"

  const domain = url.toLowerCase()

  if (domain.includes("github.com")) return "GitHub"
  if (domain.includes("linkedin.com")) return "LinkedIn"
  if (domain.includes("twitter.com") || domain.includes("x.com")) return "Twitter/X"
  if (domain.includes("instagram.com")) return "Instagram"
  if (domain.includes("facebook.com")) return "Facebook"
  if (domain.includes("youtube.com")) return "YouTube"

  return "Website"
}

export default function DashboardLayout() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [user, setUser] = useState(null)
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [userId, setUserId] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { theme } = useTheme()
  const currentTheme = themes[theme]

  // fetching user from cookies
  const getUserFromToken = () => {
    const token = Cookies.get('token');
    if (!token) return null;

    try {
      const decoded = jwtDecode(token);
      return decoded;
    } catch (err) {
      console.error('Invalid token:', err);
      return null;
    }
  };

  // Get userId from JWT token in cookies
  useEffect(() => {
    const data = getUserFromToken();
    if (data?.id) {
      setUserId(data.id);
    } else {
      console.error('No valid user found in token');
    }
  }, []);

  // Fetch user only when userId is available
  useEffect(() => {
    if (userId) {
      fetchUser();
    }
  }, [userId]);


  const logout = async () => {
    Cookies.remove('token');
    window.location.href = '/login';
  }

  const fetchUser = async () => {
    setIsLoading(true)
    try {
      const res = await axios.post(`http://localhost:4000/api/v1/fetchUser`, { userId })
      setUser(res.data.user)
      setProducts(res.data.user.products || [])
    } catch (error) {
      console.error("Error fetching user:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className={`flex items-center justify-center min-h-screen ${currentTheme.bg}`}>
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <p className={currentTheme.text}>Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`flex min-h-screen ${currentTheme.bg}`}>
      {/* {userId} */}
      {/* Sidebar */}
      <div className={`hidden md:flex w-64 flex-col ${currentTheme.bg} shadow-lg border-r border-gray-200`}>
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <LayoutDashboard className="h-5 w-5 text-white" />
            </div>
            <h1 className={`text-xl font-bold ${currentTheme.text}`}>Dashboard</h1>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${activeTab === "dashboard"
              ? "bg-blue-50 text-blue-700 border border-blue-200"
              : `${currentTheme.text} hover:bg-gray-50 hover:text-gray-900`
              }`}
          >
            <LayoutDashboard className="h-5 w-5" />
            Dashboard
          </button>

          <button
            onClick={() => setActiveTab("products")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${activeTab === "products"
              ? "bg-blue-50 text-blue-700 border border-blue-200"
              : `${currentTheme.text} hover:bg-gray-50 hover:text-gray-900`
              }`}
          >
            <Package className="h-5 w-5" />
            Products
          </button>

          <button
            onClick={() => setActiveTab("settings")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${activeTab === "settings"
              ? "bg-blue-50 text-blue-700 border border-blue-200"
              : `${currentTheme.text} hover:bg-gray-50 hover:text-gray-900`
              }`}
          >
            <Settings className="h-5 w-5" />
            Settings
          </button>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-red-600 hover:bg-red-50 transition-colors">
            <LogOut className="h-5 w-5" />
            Logout
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden fixed bottom-0 left-0 right-0 ${currentTheme.bg} border-t border-gray-200 z-50`}>
        <div className="flex justify-around p-2">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`flex flex-col items-center gap-1 p-3 rounded-lg ${activeTab === "dashboard" ? "text-blue-600 bg-blue-50" : currentTheme.text
              }`}
          >
            <LayoutDashboard className="h-5 w-5" />
            <span className="text-xs">Dashboard</span>
          </button>
          <button
            onClick={() => setActiveTab("products")}
            className={`flex flex-col items-center gap-1 p-3 rounded-lg ${activeTab === "products" ? "text-blue-600 bg-blue-50" : currentTheme.text
              }`}
          >
            <Package className="h-5 w-5" />
            <span className="text-xs">Products</span>
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`flex flex-col items-center gap-1 p-3 rounded-lg ${activeTab === "settings" ? "text-blue-600 bg-blue-50" : currentTheme.text
              }`}
          >
            <Settings className="h-5 w-5" />
            <span className="text-xs">Settings</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8 pb-20 md:pb-8 overflow-auto">
        {activeTab === "dashboard" && (
          <Dashboard
            user={user}
            products={products}
            getSocialIcon={getSocialIcon}
            getSocialPlatformName={getSocialPlatformName}
          />
        )}

        {activeTab === "products" && (
          <Products
            products={products}
            setProducts={setProducts}
            userId={userId}
            fetchUser={fetchUser}
            isSubmitting={isSubmitting}
            setIsSubmitting={setIsSubmitting}
          />
        )}

        {activeTab === "settings" && (
          <SettingsComponent
            user={user}
            setUser={setUser}
            userId={userId}
            fetchUser={fetchUser}
            isSubmitting={isSubmitting}
            setIsSubmitting={setIsSubmitting}
          />
        )}
      </div>
    </div>
  )
}
