"use client"

import { useState } from "react"
import axios from "axios"
import { Package, PlusCircle, Pencil, Trash2, Save, X, Loader2 } from "lucide-react"
import { useTheme } from "./ThemeContext"
import themes from "./themeStyles"

export default function Products({ products, setProducts, userId, fetchUser, isSubmitting, setIsSubmitting }) {
  const [form, setForm] = useState({ title: "", description: "", price: "", image: "" })
  const [editForm, setEditForm] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null)
  const { theme } = useTheme()
  const currentTheme = themes[theme]

  const handleCreateProduct = async () => {
    if (!form.title || !form.description || !form.price) {
      alert("Please fill in all fields")
      return
    }

    setIsSubmitting(true)
    try {
      const res = await axios.post("http://localhost:4000/api/v1/product/create", { userId, ...form })
      setProducts((prev) => [...prev, res.data.product])
      setForm({ title: "", description: "", price: "" })
      setShowModal(false)
      alert("Product created successfully!")
    } catch (error) {
      console.error("Error creating product:", error)
      alert("Failed to create product")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleUpdateProduct = async () => {
    setIsSubmitting(true)
    try {
      await axios.put("http://localhost:4000/api/v1/product/update", { userId, ...editForm })
      await fetchUser()
      setEditForm(null)
      alert("Product updated successfully!")
    } catch (error) {
      console.error("Error updating product:", error)
      alert("Failed to update product")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteProduct = async (productId) => {
    setIsSubmitting(true)
    try {
      await axios.post("http://localhost:4000/api/v1/product/delete", { userId, productId })
      await fetchUser()
      setShowDeleteConfirm(null)
      alert("Product deleted successfully!")
    } catch (error) {
      console.error("Error deleting product:", error)
      alert("Failed to delete product")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={`${currentTheme.bg} ${currentTheme.text} min-h-screen`}>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className={`text-3xl font-bold ${currentTheme.text}`}>Products</h2>
            <p className={`${currentTheme.text} opacity-70`}>Manage your product inventory</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className={`inline-flex items-center gap-2 px-6 py-3 font-medium rounded-lg transition-colors ${currentTheme.button}`}
          >
            <PlusCircle className="h-5 w-5" />
            Add Product
          </button>
        </div>

        {products.length > 0 ? (
          <div className={`${currentTheme.bg} rounded-xl shadow-sm border border-gray-200 overflow-hidden`}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className={`px-6 py-4 text-left text-sm font-medium ${currentTheme.text}`}>Title</th>
                    <th className={`px-6 py-4 text-left text-sm font-medium ${currentTheme.text}`}>Description</th>
                    <th className={`px-6 py-4 text-left text-sm font-medium ${currentTheme.text}`}>Price</th>
                    <th className={`px-6 py-4 text-right text-sm font-medium ${currentTheme.text}`}>Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {products.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      {editForm?.id === product.id ? (
                        <>
                          <td className="px-6 py-4">
                            <input
                              type="text"
                              value={editForm.title}
                              onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                              className={`w-full px-3 py-2 rounded-lg focus:ring-2 ${currentTheme.input}`}
                            />
                          </td>
                          <td className="px-6 py-4">
                            <input
                              type="text"
                              value={editForm.description}
                              onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                              className={`w-full px-3 py-2 rounded-lg focus:ring-2 ${currentTheme.input}`}
                            />
                          </td>
                          <td className="px-6 py-4">
                            <input
                              type="number"
                              value={editForm.price}
                              onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                              className={`w-full px-3 py-2 rounded-lg focus:ring-2 ${currentTheme.input}`}
                            />
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex justify-end gap-2">
                              <button
                                onClick={handleUpdateProduct}
                                disabled={isSubmitting}
                                className="inline-flex items-center gap-1 px-3 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
                              >
                                {isSubmitting ? (
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                  <Save className="h-4 w-4" />
                                )}
                                Save
                              </button>
                              <button
                                onClick={() => setEditForm(null)}
                                className="inline-flex items-center gap-1 px-3 py-2 bg-gray-500 text-white text-sm font-medium rounded-lg hover:bg-gray-600 transition-colors"
                              >
                                <X className="h-4 w-4" />
                                Cancel
                              </button>
                            </div>
                          </td>
                        </>
                      ) : (
                        <>
                          <td className={`px-6 py-4 font-medium ${currentTheme.text}`}>{product.title}</td>
                          <td className={`px-6 py-4 ${currentTheme.text} opacity-70 max-w-xs truncate`}>
                            {product.description}
                          </td>
                          <td className="px-6 py-4 font-semibold text-green-600">₹{product.price}</td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex justify-end gap-2">
                              <button
                                onClick={() => setEditForm(product)}
                                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              >
                                <Pencil className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => setShowDeleteConfirm(product.id)}
                                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className={`${currentTheme.bg} rounded-xl shadow-sm border border-gray-200 p-12 text-center`}>
            <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className={`text-xl font-medium ${currentTheme.text} mb-2`}>No products found</h3>
            <p className={`${currentTheme.text} opacity-70 mb-6`}>Create your first product to get started</p>
            <button
              onClick={() => setShowModal(true)}
              className={`inline-flex items-center gap-2 px-6 py-3 font-medium rounded-lg transition-colors ${currentTheme.button}`}
            >
              <PlusCircle className="h-5 w-5" />
              Add Product
            </button>
          </div>
        )}
      </div>

      {/* Add Product Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`${currentTheme.bg} rounded-xl shadow-xl w-full max-w-md`}>
            <div className="p-6 border-b border-gray-200">
              <h3 className={`text-lg font-semibold ${currentTheme.text}`}>Add New Product</h3>
              <p className={`${currentTheme.text} opacity-70 text-sm mt-1`}>Create a new product for your inventory</p>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className={`block text-sm font-medium ${currentTheme.text} mb-2`}>Product Title</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className={`w-full px-4 py-3 rounded-lg focus:ring-2 ${currentTheme.input}`}
                  placeholder="Enter product title"
                />
              </div>

              <div>
                <label className={`block text-sm font-medium ${currentTheme.text} mb-2`}>Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={3}
                  className={`w-full px-4 py-3 rounded-lg focus:ring-2 ${currentTheme.input}`}
                  placeholder="Enter product description"
                />
              </div>

              <div>
                <label className={`block text-sm font-medium ${currentTheme.text} mb-2`}>Image URL</label>
                <input
                  type="text"
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  className={`w-full px-4 py-3 rounded-lg focus:ring-2 ${currentTheme.input}`}
                  placeholder="https://example.com/image.png"
                />
              </div>

              <div>
                <label className={`block text-sm font-medium ${currentTheme.text} mb-2`}>Price (₹)</label>
                <input
                  type="number"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  className={`w-full px-4 py-3 rounded-lg focus:ring-2 ${currentTheme.input}`}
                  placeholder="Enter price"
                />
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex gap-3 justify-end">
              <button
                onClick={() => setShowModal(false)}
                className={`px-4 py-2 border rounded-lg transition-colors ${currentTheme.text} border-gray-300 hover:bg-gray-50`}
              >
                Cancel
              </button>
              <button
                onClick={handleCreateProduct}
                disabled={isSubmitting || !form.title || !form.price}
                className={`inline-flex items-center gap-2 px-6 py-2 font-medium rounded-lg disabled:opacity-50 transition-colors ${currentTheme.button}`}
              >
                {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <PlusCircle className="h-4 w-4" />}
                Create Product
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`${currentTheme.bg} rounded-xl shadow-xl w-full max-w-md`}>
            <div className="p-6">
              <h3 className={`text-lg font-semibold ${currentTheme.text} mb-2`}>Delete Product</h3>
              <p className={`${currentTheme.text} opacity-70 mb-6`}>
                Are you sure you want to delete this product? This action cannot be undone.
              </p>

              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className={`px-4 py-2 border rounded-lg transition-colors ${currentTheme.text} border-gray-300 hover:bg-gray-50`}
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteProduct(showDeleteConfirm)}
                  disabled={isSubmitting}
                  className={`inline-flex items-center gap-2 px-6 py-2 font-medium rounded-lg disabled:opacity-50 transition-colors ${currentTheme.dangerButton}`}
                >
                  {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
