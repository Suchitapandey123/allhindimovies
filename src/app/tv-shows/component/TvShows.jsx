"use client"
import { useState, useEffect } from "react"
import { Star, Play } from "lucide-react"
import tvShowsData from "../../../data/tvShows.json" // Import JSON

export default function TVShowsPage() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    setIsDarkMode(savedTheme === "dark")
  }, [])

  // Use data from JSON file
  const tvShows = tvShowsData.tvShows

  return (
    <div
      className={`min-h-screen pt-20 transition-colors duration-300 ${
        isDarkMode ? "dark bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">TV Shows</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {tvShows.map((show) => (
            <div
              key={show.id}
              className={`group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 ${
                isDarkMode ? "bg-gray-800" : "bg-white"
              }`}
            >
              <div className="relative h-80 overflow-hidden">
                <img
                  src={show.image }
                  alt={show.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <button className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-full flex items-center transition-colors text-sm mx-auto mb-4 text-white">
                    <Play className="mr-1" size={16} />
                    Watch Now
                  </button>
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold line-clamp-1">{show.title}</h3>
                  <span
                    className={`flex items-center px-2 py-1 rounded text-sm ml-2 ${
                      isDarkMode ? "bg-gray-700" : "bg-gray-200"
                    }`}
                  >
                    <Star className="text-yellow-400 mr-1" size={14} />
                    {show.rating}
                  </span>
                </div>
                <div className={`flex items-center text-sm mb-3 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                  <span>{show.year}</span>
                  <span className="mx-2">•</span>
                  <span>{show.episodes}</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {show.genre.slice(0, 2).map((genre, index) => (
                    <span
                      key={index}
                      className={`text-xs px-2 py-1 rounded ${isDarkMode ? "bg-gray-700" : "bg-gray-200"}`}
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
