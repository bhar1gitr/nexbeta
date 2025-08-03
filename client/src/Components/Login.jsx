"use client"

import { useState } from "react"
import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useTheme } from "./ThemeContext"
import themes from "./themeStyles"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const { theme } = useTheme()
  const currentTheme = themes[theme]

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await axios.post("http://localhost:4000/api/v1/login", {
        email,
        password,
      })

      const { token, user } = response.data

      Cookies.set("token", token, { expires: 1 })

      window.location.href = "/dashboard"
    } catch (error) {
      console.error("Login error:", error)

      if (error.response) {
        const errorMessage = error.response.data?.message || error.response.data?.error || "Login failed"
        setError(errorMessage)
      } else if (error.request) {
        setError("Unable to connect to server. Please check your connection.")
      } else {
        setError("An unexpected error occurred. Please try again.")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={`min-h-screen flex items-center justify-center ${currentTheme.bg}`}>
      <div className={`${currentTheme.bg} p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-200`}>
        <h2 className={`text-2xl font-bold text-center mb-4 ${currentTheme.text}`}>Login</h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            <p className="text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className={`block text-sm font-medium ${currentTheme.text} mb-1`}>Email</label>
            <input
              type="email"
              required
              className={`w-full px-4 py-2 rounded-lg focus:ring-2 ${currentTheme.input}`}
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
          </div>

          <div>
            <label className={`block text-sm font-medium ${currentTheme.text} mb-1`}>Password</label>
            <input
              type="password"
              required
              className={`w-full px-4 py-2 rounded-lg focus:ring-2 ${currentTheme.input}`}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 rounded-lg transition ${
              loading ? "bg-gray-400 cursor-not-allowed" : currentTheme.button
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Logging in...
              </div>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
