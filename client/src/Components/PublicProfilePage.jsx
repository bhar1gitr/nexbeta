import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Mail, Package } from "lucide-react"
import { useTheme } from "./ThemeContext"
import themes from "./themeStyles"
import axios from "axios"

export default function PublicProfilePage() {
    const { userLink } = useParams()
    const { theme } = useTheme()
    const currentTheme = themes[theme]

    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(`http://localhost:4000/user/public/${userLink}`)
                console.log(res.data);

                // if (!res.ok) throw new Error(res.data.message || "Failed to fetch")

                setUser(res.data.user)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        if (userLink) fetchUser()
    }, [userLink])

    if (loading) return <p className="p-6">Loading...</p>
    if (error) return <p className="p-6 text-red-600">Error: {error}</p>
    if (!user) return <p className="p-6">User not found.</p>

    return (
        <div className={`min-h-screen p-6 ${currentTheme.bg} ${currentTheme.text}`}>
            <div className="max-w-4xl mx-auto">
                <div className="flex flex-col items-center gap-4 mb-10">
                    <img
                        src={user.profilePic || "/placeholder.svg"}
                        alt="Profile"
                        className="w-24 h-24 rounded-full object-cover border-4 border-gray-300"
                    />
                    <h1 className="text-2xl font-bold">{user.name}</h1>
                    <p className="flex items-center gap-2 text-gray-500">
                        <Mail className="h-4 w-4" /> {user.email || "Email not public"}
                    </p>

                    {user.socialLinks?.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                            {user.socialLinks.map((link, index) => (
                                <a
                                    key={index}
                                    href={link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-3 py-1 text-sm text-blue-700 bg-blue-100 rounded-full hover:bg-blue-200"
                                >
                                    {link}
                                </a>
                            ))}
                        </div>
                    )}
                </div>

                <div>
                    <h2 className="text-xl font-semibold mb-4">Products</h2>
                    {user.products?.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {user.products.map((product, index) => (
                                <div
                                    key={index}
                                    className={`border rounded-lg p-4 shadow hover:shadow-md transition ${currentTheme.bg}`}
                                >
                                    <div className="flex items-center justify-center h-32 bg-gray-50 mb-3 overflow-hidden rounded">
                                        {product.image ? (
                                            <img src={product.image} alt="Product" className="h-full object-contain" />
                                        ) : (
                                            <Package className="h-10 w-10 text-gray-400" />
                                        )}
                                    </div>
                                    <h3 className={`font-semibold text-lg mb-1 ${currentTheme.text}`}>{product.title}</h3>
                                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">{product.description}</p>
                                    <p className="text-green-600 font-bold">₹{product.price}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500">No products to show.</p>
                    )}
                </div>
            </div>
        </div>
    )
}
