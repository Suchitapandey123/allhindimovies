"use client"
import { useState, useEffect } from "react"
import { Play, Radio } from "lucide-react"

export default function LiveTVPage() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    setIsDarkMode(savedTheme === "dark")
  }, [])

  const channels = [
    {
      id: 1,
      name: "Star Plus",
      category: "Entertainment",
      image: "/placeholder.svg?height=200&width=300",
      isLive: true,
    },
    {
      id: 2,
      name: "Colors TV",
      category: "Entertainment",
      image: "/placeholder.svg?height=200&width=300",
      isLive: true,
    },
    {
      id: 3,
      name: "Sony TV",
      category: "Entertainment",
      image: "/placeholder.svg?height=200&width=300",
      isLive: true,
    },
    {
      id: 4,
      name: "Zee TV",
      category: "Entertainment",
      image: "/placeholder.svg?height=200&width=300",
      isLive: false,
    },
  ]

  return (
    <div
      className={`min-h-screen pt-20 transition-colors duration-300 ${
        isDarkMode ? "dark bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Live TV Channels</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {channels.map((channel) => (
            <div
              key={channel.id}
              className={`group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 ${
                isDarkMode ? "bg-gray-800" : "bg-white"
              }`}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={channel.image || "/placeholder.svg"}
                  alt={channel.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {channel.isLive && (
                  <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded-full text-xs flex items-center">
                    <Radio size={12} className="mr-1" />
                    LIVE
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <button className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-full flex items-center transition-colors text-sm mx-auto mb-4 text-white">
                    <Play className="mr-1" size={16} />
                    Watch Live
                  </button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold mb-2">{channel.name}</h3>
                <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>{channel.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
