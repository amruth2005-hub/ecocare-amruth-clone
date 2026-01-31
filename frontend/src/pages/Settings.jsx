import { useState } from "react"
import Header from "../components/Header"
import profile from "../assets/profile.jpg"

function Settings() {
  const [name, setName] = useState("John Doe")
  const [email, setEmail] = useState("john@example.com")
  const [image, setImage] = useState(profile)

  const [isEditing, setIsEditing] = useState(false)
  const [toast, setToast] = useState(null)

  const handleImage = (e) => {
    if (!isEditing) return
    const file = e.target.files[0]
    if (file) {
      setImage(URL.createObjectURL(file))
    }
  }

  const handleSave = async () => {
    try {
      // simulate API
      await new Promise((res) => setTimeout(res, 800))

      setIsEditing(false)
      setToast({ type: "success", message: "Changes saved successfully" })

      setTimeout(() => setToast(null), 2500)
    } catch {
      setToast({ type: "error", message: "Failed to save changes" })
      setTimeout(() => setToast(null), 2500)
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    setToast(null)
  }

  return (
    <div className="min-h-screen bg-white animate-fadeIn">

      {/* Header */}
      <Header variant="settings" />

      {/* Toast */}
      {toast && (
        <div
          className={`
            fixed bottom-6 left-1/2 -translate-x-1/2
            px-5 py-2 rounded-lg text-sm text-white
            animate-blockUp
            ${toast.type === "success" ? "bg-black" : "bg-red-600"}
          `}
        >
          {toast.message}
        </div>
      )}

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-10 animate-slideUp">

        <h1 className="text-2xl font-semibold text-gray-900 mb-8">
          Account Settings
        </h1>

        {/* Card */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm animate-popUp">

          {/* Profile */}
          <div className="flex items-center gap-6 mb-8">
            <img
              src={image}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover"
            />

            <label
              className={`text-sm font-medium ${
                isEditing
                  ? "cursor-pointer text-black"
                  : "cursor-not-allowed text-gray-400"
              }`}
            >
              Change photo
              <input
                type="file"
                hidden
                disabled={!isEditing}
                onChange={handleImage}
              />
            </label>
          </div>

          {/* Name */}
          <div className="mb-5">
            <label className="block text-sm font-medium mb-1">
              Full name
            </label>
            <input
              value={name}
              disabled={!isEditing}
              onChange={(e) => setName(e.target.value)}
              className={`
                w-full px-4 py-2 rounded-lg border
                transition-all
                ${
                  isEditing
                    ? "border-gray-300 focus:ring-1 focus:ring-black"
                    : "border-gray-200 bg-gray-50 text-gray-500"
                }
              `}
            />
          </div>

          {/* Email */}
          <div className="mb-8">
            <label className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              value={email}
              disabled={!isEditing}
              onChange={(e) => setEmail(e.target.value)}
              className={`
                w-full px-4 py-2 rounded-lg border
                transition-all
                ${
                  isEditing
                    ? "border-gray-300 focus:ring-1 focus:ring-black"
                    : "border-gray-200 bg-gray-50 text-gray-500"
                }
              `}
            />
          </div>

          {/* Actions */}
          <div className="flex gap-4">

            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="
                  px-6 py-2 bg-black text-white rounded-lg
                  hover:bg-gray-800 active:scale-95
                  transition
                "
              >
                Edit
              </button>
            ) : (
              <>
                <button
                  onClick={handleSave}
                  className="
                    px-6 py-2 bg-black text-white rounded-lg
                    hover:bg-gray-800 active:scale-95
                    transition
                  "
                >
                  Save changes
                </button>

                <button
                  onClick={handleCancel}
                  className="
                    px-6 py-2 border border-gray-300 rounded-lg
                    hover:bg-gray-50 transition
                  "
                >
                  Cancel
                </button>
              </>
            )}

          </div>

        </div>
      </div>
    </div>
  )
}

export default Settings
