"use client"

import { useEffect, useState } from "react"
import { Package, PlusCircle, Pencil, Mail } from "lucide-react"
import { useTheme } from "./ThemeContext"
import themes from "./themeStyles"

export default function Dashboard({ user, products, getSocialIcon, getSocialPlatformName }) {
  const { theme } = useTheme()
  const currentTheme = themes[theme]

  const [origin, setOrigin] = useState("")

  useEffect(() => {
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin)
    }
  }, [])

  return (
    <div className={`space-y-6 ${currentTheme.bg} ${currentTheme.text}`}>
      <div className="mb-8">
        <h2 className={`text-3xl font-bold ${currentTheme.text} mb-2`}>Welcome back!</h2>
        <p className={`${currentTheme.text} opacity-70`}>
          Here's what's happening with your account today.
        </p>
      </div>

      {user && (
        <div
          className={`${currentTheme.bg} rounded-xl shadow-sm border border-gray-200 p-6 mb-6`}
        >
          <h3 className={`text-lg font-semibold ${currentTheme.text} mb-4`}>
            Profile Overview
          </h3>

          <div className="flex flex-col md:flex-row md:items-center gap-6 mb-6">
            <div className="relative">
              <img
                src={user.profilePic || "/placeholder.svg?height=80&width=80"}
                alt="Profile"
                className="w-20 h-20 rounded-full border-4 border-gray-100 object-cover"
              />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <h4 className={`text-xl font-bold ${currentTheme.text}`}>
                {user.name || "Not Available"}
              </h4>
              <p
                className={`${currentTheme.text} opacity-70 flex items-center gap-2 mt-1`}
              >
                <Mail className="h-4 w-4" />
                {user.email || "No email provided"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <p
                  className={`text-sm font-medium ${currentTheme.text} opacity-70`}
                >
                  Profile Picture URL
                </p>
                <p className={`text-sm ${currentTheme.text} truncate`}>
                  {user.profilePic || "Not set"}
                </p>
              </div>
              <div>
                <p
                  className={`text-sm font-medium ${currentTheme.text} opacity-70`}
                >
                  Name
                </p>
                <p className={`text-sm ${currentTheme.text}`}>
                  {user.name || "Not set"}
                </p>
              </div>
              <div className="mt-6">
                <p
                  className={`text-sm font-medium ${currentTheme.text} opacity-70 mb-3`}
                >
                  Social Links
                </p>
                {user.socialLinks && user.socialLinks.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {user.socialLinks.map((link, index) => {
                      const IconComponent = getSocialIcon(link)
                      const platformName = getSocialPlatformName(link)
                      return (
                        <a
                          key={index}
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-3 py-2 bg-blue-50 text-blue-700 text-sm rounded-full border border-blue-200 hover:bg-blue-100 transition-colors"
                        >
                          <IconComponent className="h-4 w-4" />
                          {platformName}
                        </a>
                      )
                    })}
                  </div>
                ) : (
                  <p className={`text-sm ${currentTheme.text} opacity-70`}>
                    No social links added
                  </p>
                )}
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <p
                  className={`text-sm font-medium ${currentTheme.text} opacity-70`}
                >
                  Email
                </p>
                <p className={`text-sm ${currentTheme.text}`}>
                  {user.email || "Not set"}
                </p>
              </div>
              <div>
                <p
                  className={`text-sm font-medium ${currentTheme.text} opacity-70`}
                >
                  Password
                </p>
                <p className={`text-sm ${currentTheme.text}`}>
                  {user.password ? "••••••••" : "Not set"}
                </p>
              </div>

              {/* ✅ Public Profile Link */}
              <div>
                <p
                  className={`text-sm font-medium ${currentTheme.text} opacity-70`}
                >
                  Public Profile Link
                </p>
                {user.userLink ? (
                  <a
                    href={`/user/public/${user.userLink}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 underline hover:text-blue-800 break-all"
                  >
                    {`${origin}/user/public/${user.userLink}`}
                  </a>
                ) : (
                  <p
                    className={`text-sm ${currentTheme.text} opacity-70`}
                  >
                    Not set
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className={`text-xl font-bold ${currentTheme.text}`}>Your Products</h3>
          <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
            {products.length} Products
          </span>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className={`${currentTheme.bg} rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow`}
              >
                {/* <div className="bg-gradient-to-br from-blue-50 to-indigo-100 h-32 flex items-center justify-center">
                  <Package className="h-12 w-12 text-blue-400" />
                </div> */}
                <div className="flex items-center justify-center h-32 bg-gray-50 mb-3 overflow-hidden rounded">
                  {product.image ? (
                    <img src={product.image} alt="Product" className="h-full object-contain" />
                  ) : (
                    <Package className="h-10 w-10 text-gray-400" />
                  )}
                </div>
                <div className="p-4">
                  <h4
                    className={`font-semibold text-lg ${currentTheme.text} mb-2 truncate`}
                  >
                    {product.title}
                  </h4>
                  <p
                    className={`${currentTheme.text} opacity-70 text-sm mb-3 line-clamp-2`}
                  >
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-green-600 font-bold text-lg">
                      ₹{product.price}
                    </span>
                    <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <Pencil className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div
            className={`${currentTheme.bg} rounded-xl shadow-sm border border-gray-200 p-12 text-center`}
          >
            <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className={`text-xl font-medium ${currentTheme.text} mb-2`}>
              No products yet
            </h3>
            <p className={`${currentTheme.text} opacity-70 mb-6`}>
              Create your first product to get started
            </p>
            <button
              className={`inline-flex items-center gap-2 px-6 py-3 font-medium rounded-lg transition-colors ${currentTheme.button}`}
            >
              <PlusCircle className="h-5 w-5" />
              Add Product
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
