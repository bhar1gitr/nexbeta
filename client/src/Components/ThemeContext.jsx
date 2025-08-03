"use client"

import { createContext, useState, useContext, useEffect } from "react"

// Context creation
const ThemeContext = createContext()

// Custom hook (must be defined separately)
export const useTheme = () => useContext(ThemeContext)

// ThemeProvider component
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "light"
    }
    return "light"
  })

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.className = theme
      localStorage.setItem("theme", theme)
    }
  }, [theme])

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
}
