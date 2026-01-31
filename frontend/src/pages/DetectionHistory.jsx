import { useEffect, useState } from "react"
import Header from "../components/Header"
import FilterBar from "../components/FilterBar"
import productsData from "../assets/products_data.json"

function DetectionHistory() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    if (Array.isArray(productsData.samples)) {
      setProducts(productsData.samples)
    } else {
      console.error("products_data.json → samples is not an array")
    }
  }, [])

  return (
    <div className="min-h-screen bg-white pb-12 animate-fadeIn">

      {/* HEADER */}
      <Header />

      {/* FILTER BAR */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mt-4">
        <FilterBar />
      </div>

      {/* PAGE CONTENT */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mt-10">

        {/* EMPTY STATE */}
        {products.length === 0 && (
          <div className="text-center text-gray-500 mt-20">
            No detected items available.
          </div>
        )}

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((item) => (
            <div
              key={item.id}
              className="bg-white border rounded-xl shadow-sm hover:shadow-md transition hover:scale-[1.02]"
            >
              {/* IMAGE */}
              <div className="h-44 bg-gray-100 rounded-t-xl flex items-center justify-center">
                <img
                  src={item.image}
                  alt={`${item.brand} ${item.model_or_series}`}
                  className="h-full object-contain"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.png"
                  }}
                />
              </div>

              {/* CONTENT */}
              <div className="p-4">

                {/* TITLE */}
                <div className="mb-3">
                  <h2 className="font-semibold text-gray-900">
                    {item.brand} {item.model_or_series}
                  </h2>
                  <span className="inline-block mt-1 text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-600 capitalize">
                    {item.device_category}
                  </span>
                </div>

                {/* SPECIFICATIONS */}
                <div className="mb-4">
                  <h3 className="text-xs font-semibold text-gray-800 mb-1">
                    Specifications
                  </h3>
                  <div className="text-xs text-gray-600 space-y-1">
                    <div>Form Factor: {item.visible_specs.form_factor}</div>
                    <div>Material: {item.visible_specs.material}</div>
                    <div>Camera Count: {item.visible_specs.camera_count}</div>
                    <div>Camera Layout: {item.visible_specs.camera_layout}</div>
                    <div>Logo Visible: {item.visible_specs.logo_visible}</div>
                  </div>
                </div>

                {/* MINERALS */}
                <div className="mb-4">
                  <h3 className="text-xs font-semibold text-gray-800 mb-2">
                    Minerals Detected
                  </h3>

                  {Object.entries(item.minerals_present).map(
                    ([category, values]) =>
                      values.length > 0 && (
                        <div key={category} className="mb-2">
                          <p className="text-[11px] font-medium text-gray-700 capitalize">
                            {category.replace("_", " ")}
                          </p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {values.map((v, i) => (
                              <span
                                key={i}
                                className="px-2 py-0.5 bg-gray-100 rounded text-[11px] text-gray-600 capitalize"
                              >
                                {v}
                              </span>
                            ))}
                          </div>
                        </div>
                      )
                  )}
                </div>

                {/* CONFIDENCE */}
                <div>
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>Confidence</span>
                    <span>{Math.round(item.confidence * 100)}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${
                        item.confidence >= 0.85
                          ? "bg-green-500"
                          : item.confidence >= 0.6
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                      style={{ width: `${item.confidence * 100}%` }}
                    />
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default DetectionHistory
