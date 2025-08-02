"use client"
import { useState, useEffect } from "react"
import { Star, Play, Trophy } from "lucide-react"
import moviesData from "../../../data/movies.json" // Use the same JSON file
import { useRouter } from "next/navigation"

export default function TopRatedPage() {
  const router = useRouter()
  const [isDarkMode, setIsDarkMode] = useState(false)
   const [movies, setMovies] = useState([])
    const [genres, setGenres] = useState([])
    useEffect(() => {
        // Set data from JSON file
        setMovies(moviesData.movies)
        setGenres(moviesData.genres)
        const savedTheme = localStorage.getItem("theme")
        setIsDarkMode(savedTheme === "dark")
      }, [])
    
      const navigateToDetails = (movie) => {
        router.push(`/movies/${movie.id}?title=${encodeURIComponent(movie.title)}`)
      }
   
 

  // Sort movies by rating and take top 4
  const topMovies = [...moviesData.movies]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4)
    .map((movie, index) => ({
      ...movie,
      rank: index + 1
    }))

  return (
    <div
      className={`min-h-screen pt-20 transition-colors duration-300 ${
        isDarkMode ? "dark bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <Trophy className="text-yellow-500 mr-3" size={32} />
          <h1 className="text-4xl font-bold">Top Rated Movies</h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {topMovies.map((movie) => (
            <div
              key={movie.id}
              className={`group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 ${
                isDarkMode ? "bg-gray-800" : "bg-white"
              }`}
            >
              <div className="relative h-80 overflow-hidden">
                <img
                  src={movie.image || "/placeholder.svg"}
                  alt={movie.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2 left-2 bg-yellow-500 text-black px-2 py-1 rounded-full text-sm font-bold">
                  #{movie.rank}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <button onClick={() => navigateToDetails(movie)} 
                  className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-full flex items-center transition-colors text-sm mx-auto mb-4 text-white">
                    <Play className="mr-1" size={16} />
                    Watch Now
                  </button>
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold line-clamp-1">{movie.title}</h3>
                  <span
                    className={`flex items-center px-2 py-1 rounded text-sm ml-2 ${
                      isDarkMode ? "bg-gray-700" : "bg-gray-200"
                    }`}
                  >
                    <Star className="text-yellow-400 mr-1" size={14} />
                    {movie.rating}
                  </span>
                </div>
                <div className={`flex items-center text-sm mb-3 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                  <span>{movie.year}</span>
                  <span className="mx-2">•</span>
                  <span>{movie.duration}</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {movie.genre.slice(0, 2).map((genre, index) => (
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
