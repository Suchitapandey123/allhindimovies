"use client"
import { useState, useEffect } from "react"
import { Search, Star, Play } from "lucide-react"
import { useRouter } from "next/navigation"
import moviesData from "../../../data/movies.json"

export default function MoviesPage() {
  const router = useRouter()

  // Initialize state with JSON data
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedGenre, setSelectedGenre] = useState("All")
  const [movies, setMovies] = useState(moviesData.movies)
  const [genres, setGenres] = useState(moviesData.genres)

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    setIsDarkMode(savedTheme === "dark")
  }, [])


  const navigateToDetails = (movie) => {
    router.push(`/movies/${movie.id}?title=${encodeURIComponent(movie.title)}`)
  }

  const filteredMovies = movies.filter((movie) => {
    const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesGenre = selectedGenre === "All" || movie.genre.includes(selectedGenre)
    return matchesSearch && matchesGenre
  })

  return (
    <div
      className={`min-h-screen pt-20 transition-colors duration-300 ${
        isDarkMode ? "dark bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">All Movies</h1>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search movies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-colors ${
                isDarkMode
                  ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                  : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
              }`}
            />
          </div>
          {/* <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className={`px-4 py-3 rounded-lg border transition-colors ${
              isDarkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-300 text-gray-900"
            }`}
          >
            {genres.map((genre, index) => {
  const genreLabel = typeof genre === "string" ? genre : JSON.stringify(genre);
  return (
    <option key={genreLabel + index} value={genreLabel}>
      {genreLabel}
    </option>
  );
})}

          </select> */}
        </div>

        {/* Movies Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredMovies.map((movie) => (
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
                {/* Always visible on mobile, hover effect on desktop */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <button 
                    onClick={() => navigateToDetails(movie)} 
                    className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-full flex items-center transition-colors text-sm mx-auto mb-4 text-white"
                  >
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
  {Array.isArray(movie.genre) &&
    movie.genre.slice(0, 2).map((genre, index) => (
      <span
        key={index}
        className={`text-xs px-2 py-1 rounded ${
          isDarkMode ? "bg-gray-700" : "bg-gray-200"
        }`}
      >
        {genre}
      </span>
    ))}
</div>

              </div>
            </div>
          ))}
        </div>

        {filteredMovies.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-500">No movies found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  )
}