// themeStyles.js
const themes = {
  light: {
    bg: "bg-white",
    text: "text-gray-900",
    input: "border-gray-300 focus:ring-blue-500 focus:border-blue-500",
    button: "bg-blue-600 hover:bg-blue-700 text-white",
    dangerButton: "bg-red-600 hover:bg-red-700 text-white",
  },
  dark: {
    bg: "bg-gray-900",
    text: "text-white",
    input: "border-gray-600 bg-gray-800 text-white focus:ring-blue-400 focus:border-blue-400",
    button: "bg-blue-700 hover:bg-blue-800 text-white",
    dangerButton: "bg-red-700 hover:bg-red-800 text-white",
  },
  blue: {
    bg: "bg-blue-50",
    text: "text-blue-900",
    input: "border-blue-300 focus:ring-blue-500 focus:border-blue-500",
    button: "bg-blue-500 hover:bg-blue-600 text-white",
    dangerButton: "bg-red-500 hover:bg-red-600 text-white",
  },
}

export default themes
