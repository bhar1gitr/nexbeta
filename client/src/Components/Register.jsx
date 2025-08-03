"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useTheme } from "./ThemeContext"
import themes from "./themeStyles"

export default function RegisterPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const navigate = useNavigate()

  const { theme } = useTheme()
  const currentTheme = themes[theme]

  const handleRegister = async (e) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    try {
      setLoading(true)

      const res = await axios.post("http://localhost:4000/api/v1/register", {
        name,
        email,
        password,
      })

      setSuccess(res.data.message || "Registered successfully")

      // Redirect to login page after success
      setTimeout(() => {
        navigate("/login")
      }, 2000)

    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || "Registration failed")
      } else {
        setError("Server error. Try again later.")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={`min-h-screen flex items-center justify-center ${currentTheme.bg}`}>
      <div className={`p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-200 ${currentTheme.bg}`}>
        <h2 className={`text-2xl font-bold text-center mb-4 ${currentTheme.text}`}>Register</h2>

        {error && <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">{error}</div>}
        {success && <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg">{success}</div>}

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className={`block text-sm font-medium ${currentTheme.text} mb-1`}>Name</label>
            <input
              type="text"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
              className={`w-full px-4 py-2 rounded-lg focus:ring-2 ${currentTheme.input}`}
              placeholder="Your name"
              disabled={loading}
            />
          </div>

          <div>
            <label className={`block text-sm font-medium ${currentTheme.text} mb-1`}>Email</label>
            <input
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-4 py-2 rounded-lg focus:ring-2 ${currentTheme.input}`}
              placeholder="you@example.com"
              disabled={loading}
            />
          </div>

          <div>
            <label className={`block text-sm font-medium ${currentTheme.text} mb-1`}>Password</label>
            <input
              type="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-4 py-2 rounded-lg focus:ring-2 ${currentTheme.input}`}
              placeholder="••••••••"
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
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  )
}
