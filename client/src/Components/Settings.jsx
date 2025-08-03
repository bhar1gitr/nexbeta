"use client"

import axios from "axios"
import { PlusCircle, Trash2, Save, Loader2 } from "lucide-react"
import { useTheme } from "./ThemeContext"
import themes from "./themeStyles"

export default function SettingsComponent({ user, setUser, userId, fetchUser, isSubmitting, setIsSubmitting }) {
  const { theme, setTheme } = useTheme()
  const currentTheme = themes[theme]

  const handleUpdateUser = async () => {
    setIsSubmitting(true)
    try {
      const updatedFields = {
        userId: user._id,
        name: user.name,
        email: user.email,
        profilePic: user.profilePic,
        socialLinks: user.socialLinks,
        password: user.password || "",
      }

      await axios.put("http://localhost:4000/api/v1/users/update", updatedFields)
      await fetchUser()
      alert("Profile updated successfully!")
    } catch (error) {
      console.error("Error updating user:", error)
      alert("Failed to update profile")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteAccount = async () => {
    if (!window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      return
    }

    setIsSubmitting(true)
    try {
      await axios.delete(`http://localhost:4000/api/v1/users/delete/${userId}`)
      alert("Account deleted successfully")
    } catch (error) {
      console.error("Error deleting account:", error)
      alert("Failed to delete account")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!user) return null

  return (
    <div className={`min-h-screen ${currentTheme.bg} ${currentTheme.text}`}>
      <div className="space-y-6">
        <div className={`${currentTheme.bg} rounded-xl shadow-sm border border-gray-200 p-6`}>
          <h3 className={`text-lg font-semibold ${currentTheme.text} mb-6`}>Theme Preferences</h3>
          <div className="flex gap-4 items-center">
            <label className={`text-sm font-medium ${currentTheme.text}`}>Select Theme:</label>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className={`px-4 py-2 rounded-lg focus:ring-2 ${currentTheme.input}`}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="blue">Blue</option>
            </select>
          </div>
        </div>

        <div>
          <h2 className={`text-3xl font-bold ${currentTheme.text}`}>Settings</h2>
          <p className={`${currentTheme.text} opacity-70`}>Manage your account settings and preferences</p>
        </div>

        <div className={`${currentTheme.bg} rounded-xl shadow-sm border border-gray-200 p-6`}>
          <h3 className={`text-lg font-semibold ${currentTheme.text} mb-6`}>Profile Information</h3>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={`block text-sm font-medium ${currentTheme.text} mb-2`}>Full Name</label>
                <input
                  type="text"
                  value={user.name || ""}
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                  className={`w-full px-4 py-3 rounded-lg focus:ring-2 ${currentTheme.input}`}
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label className={`block text-sm font-medium ${currentTheme.text} mb-2`}>Email Address</label>
                <input
                  type="email"
                  value={user.email || ""}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  className={`w-full px-4 py-3 rounded-lg focus:ring-2 ${currentTheme.input}`}
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label className={`block text-sm font-medium ${currentTheme.text} mb-2`}>Profile Picture URL</label>
              <input
                type="url"
                value={user.profilePic || ""}
                onChange={(e) => setUser({ ...user, profilePic: e.target.value })}
                className={`w-full px-4 py-3 rounded-lg focus:ring-2 ${currentTheme.input}`}
                placeholder="Enter profile picture URL"
              />
            </div>

            <div>
              <label className={`block text-sm font-medium ${currentTheme.text} mb-2`}>New Password</label>
              <input
                type="password"
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                className={`w-full px-4 py-3 rounded-lg focus:ring-2 ${currentTheme.input}`}
                placeholder="Enter new password (leave blank to keep current)"
              />
            </div>

            <div>
              <label className={`block text-sm font-medium ${currentTheme.text} mb-3`}>Social Links</label>
              <div className="space-y-3">
                {(user.socialLinks || []).map((link, index) => (
                  <div key={index} className="flex gap-3">
                    <input
                      type="url"
                      value={link}
                      onChange={(e) => {
                        const newLinks = [...(user.socialLinks || [])]
                        newLinks[index] = e.target.value
                        setUser({ ...user, socialLinks: newLinks })
                      }}
                      className={`flex-1 px-4 py-3 rounded-lg focus:ring-2 ${currentTheme.input}`}
                      placeholder={`Social link ${index + 1}`}
                    />
                    <button
                      onClick={() => {
                        const newLinks = user.socialLinks?.filter((_, i) => i !== index) || []
                        setUser({ ...user, socialLinks: newLinks })
                      }}
                      className={`p-3 rounded-lg border transition-colors ${currentTheme.dangerButton}`}
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() =>
                    setUser({
                      ...user,
                      socialLinks: [...(user.socialLinks || []), ""],
                    })
                  }
                  className={`inline-flex items-center gap-2 px-4 py-2 border rounded-lg transition-colors ${currentTheme.button}`}
                >
                  <PlusCircle className="h-4 w-4" />
                  Add Social Link
                </button>
              </div>
            </div>

            <button
              onClick={handleUpdateUser}
              disabled={isSubmitting}
              className={`inline-flex items-center gap-2 px-6 py-3 font-medium rounded-lg disabled:opacity-50 transition-colors ${currentTheme.button}`}
            >
              {isSubmitting ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />}
              Update Profile
            </button>
          </div>
        </div>

        <div className={`${currentTheme.bg} rounded-xl shadow-sm border border-red-200 p-6`}>
          <h3 className="text-lg font-semibold text-red-600 mb-4">Danger Zone</h3>
          <p className={`${currentTheme.text} opacity-70 mb-4`}>
            Once you delete your account, there is no going back. Please be certain.
          </p>
          <button
            onClick={handleDeleteAccount}
            disabled={isSubmitting}
            className={`inline-flex items-center gap-2 px-6 py-3 font-medium rounded-lg disabled:opacity-50 transition-colors ${currentTheme.dangerButton}`}
          >
            {isSubmitting ? <Loader2 className="h-5 w-5 animate-spin" /> : <Trash2 className="h-5 w-5" />}
            Delete Account
          </button>
        </div>
      </div>
    </div>
  )
}
