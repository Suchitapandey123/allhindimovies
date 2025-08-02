"use client"

import { useState, useEffect, useMemo } from "react"
import { useParams, useSearchParams, useRouter } from "next/navigation"
import {
  Play,
  Download,
  Star,
  Clock,
  Heart,
  Share2,
  ArrowLeft,
  Volume2,
  VolumeX,
  Maximize,
  ChevronLeft,
} from "lucide-react"
import moviesData from "../../../../data/movies.json"

export default function MovieDetailsPageFixed() {
  const params = useParams()
  const searchParams = useSearchParams()
  const router = useRouter()

  // State management
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [showPlayer, setShowPlayer] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Get movie data
  const movieData = useMemo(() => {
    try {
      const movieId = params?.slug
      if (!movieId || !moviesData?.movies) return null

      const foundMovie = moviesData.movies.find((movie) => movie.id.toString() === movieId.toString())

      if (!foundMovie) return null

      return {
        id: foundMovie.id,
        title: foundMovie.title || searchParams?.get("title") || "Unknown Movie",
        year: foundMovie.year || "2023",
        rating: foundMovie.rating || "4.5",
        genre: foundMovie.genre || ["Action", "Drama"],
        duration: foundMovie.duration || "2h 30m",
        description: foundMovie.description || "An amazing movie experience awaits you.",
        director: foundMovie.director || "Unknown Director",
        cast: foundMovie.cast || ["Unknown Cast"],
        language: foundMovie.language || "Hindi",
        quality: ["4K", "1080p", "720p", "480p"],
        size: {
          "4K": "8.5 GB",
          "1080p": "2.1 GB",
          "720p": "1.2 GB",
          "480p": "650 MB",
        },
        poster: foundMovie.image || "/placeholder.svg?height=600&width=400",
        backdrop: foundMovie.backdrop || "/placeholder.svg?height=1080&width=1920",
        trailer: "/placeholder-video.mp4",
        downloadUrls: {
          "4K": "#download-4k",
          "1080p": "#download-1080p",
          "720p": "#download-720p",
          "480p": "#download-480p",
        },
      }
    } catch (error) {
      console.error("Error loading movie data:", error)
      return null
    }
  }, [params?.slug, searchParams])

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleWatch = () => {
    setShowPlayer(true)
    setIsPlaying(true)
  }

  const handleDownload = (quality) => {
    if (!movieData) return

    try {
      const downloadUrl = movieData.downloadUrls?.[quality] || "#"
      console.log(`Downloading ${movieData.title} in ${quality} quality`)
      if (typeof window !== "undefined" && window.alert) {
        alert(`Download started: ${movieData.title} (${quality})`)
      }
    } catch (error) {
      console.error("Download error:", error)
    }
  }

  const handleBack = () => {
    try {
      if (typeof window !== "undefined" && window.history?.length > 1) {
        router.back()
      } else {
        router.push("/")
      }
    } catch (error) {
      console.error("Navigation error:", error)
      if (typeof window !== "undefined") {
        window.location.href = "/"
      }
    }
  }

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-700 rounded w-1/3 mb-4"></div>
            <div className="h-64 bg-gray-700 rounded mb-4"></div>
            <div className="h-4 bg-gray-700 rounded w-2/3 mb-2"></div>
            <div className="h-4 bg-gray-700 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    )
  }

  const displayData = movieData || {
    id: "unknown",
    title: searchParams?.get("title") || "Movie Details",
    year: "2023",
    rating: "4.5",
    genre: ["Action", "Drama"],
    duration: "2h 30m",
    description: "Movie details are loading. Please check your connection and try again.",
    director: "Unknown Director",
    cast: ["Loading..."],
    language: "Hindi",
    quality: ["1080p", "720p", "480p"],
    size: {
      "1080p": "2.1 GB",
      "720p": "1.2 GB",
      "480p": "650 MB",
    },
    poster: "/placeholder.svg?height=600&width=400",
    backdrop: "/placeholder.svg?height=1080&width=1920",
    trailer: "/placeholder-video.mp4",
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white pb-24 sm:pb-0 pt-16">
      {/* Back Button */}
      <div className="fixed top-4 left-4 z-50">
        <button
          onClick={handleBack}
          className="bg-black/70 hover:bg-black/90 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 shadow-xl"
          aria-label="Go back"
        >
          <ChevronLeft size={24} />
        </button>
      </div>

      {/* Video Player Modal */}
      {showPlayer && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
          <div className="relative w-full h-full">
            <video
              className="w-full h-full object-cover"
              poster={displayData.backdrop}
              controls
              autoPlay={isPlaying}
              muted={isMuted}
              onError={(e) => {
                console.error("Video playback error:", e)
              }}
            >
              <source src={displayData.trailer} type="video/mp4" />
              <p>Your browser does not support the video tag.</p>
            </video>

            {/* Player Controls */}
            <div className="absolute top-4 left-4 right-4 flex justify-between items-center bg-black/50 backdrop-blur-sm rounded-lg p-4">
              <button
                onClick={() => setShowPlayer(false)}
                className="bg-red-600 hover:bg-red-700 p-2 rounded-full transition-colors"
              >
                <ArrowLeft size={24} />
              </button>
              <h3 className="text-xl font-bold truncate mx-4">{displayData.title}</h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors"
                >
                  {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
                <button className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors">
                  <Maximize size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="relative">
        {/* Hero Section */}
        <div className="relative h-[50vh] sm:h-[80vh] overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={displayData.backdrop || "/placeholder.svg"}
              alt={displayData.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = "/placeholder.svg?height=1080&width=1920"
              }}
            />
            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/40"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/20"></div>
          </div>

          {/* Hero Content */}
          <div className="absolute inset-0 z-20 flex items-end sm:items-center pb-8 sm:pb-12">
            <div className="container mx-auto px-4 pt-8">
              <div className="max-w-6xl">
                <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 items-start">
                  {/* Movie Poster */}
                  <div className="hidden sm:flex flex-shrink-0">
                    <img
                      src={displayData.poster || "/placeholder.svg"}
                      alt={displayData.title}
                      className="w-40 sm:w-56 lg:w-72 h-60 sm:h-84 lg:h-[420px] object-cover rounded-xl shadow-2xl border-4 border-white/10"
                      onError={(e) => {
                        e.target.src = "/placeholder.svg?height=600&width=400"
                      }}
                    />
                  </div>

                  {/* Movie Info */}
                  <div className="flex-1 space-y-3 sm:space-y-4">
                    <div>
                      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-3 text-white drop-shadow-2xl leading-tight">
                        {displayData.title}
                      </h1>

                      {/* Movie Meta Info */}
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm lg:text-base">
                        <span className="bg-red-600 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full font-bold shadow-lg">
                          {displayData.year}
                        </span>
                        <div className="flex items-center bg-black/40 backdrop-blur-sm px-2 py-1 sm:px-3 sm:py-1.5 rounded-full border border-white/20">
                          <Star className="text-yellow-400 mr-1 sm:mr-1.5" size={16} />
                          <span className="font-semibold">{displayData.rating}/5</span>
                        </div>
                        <div className="flex items-center bg-black/40 backdrop-blur-sm px-2 py-1 sm:px-3 sm:py-1.5 rounded-full border border-white/20">
                          <Clock className="mr-1 sm:mr-1.5" size={16} />
                          <span>{displayData.duration}</span>
                        </div>
                        <span className="text-gray-200 bg-black/40 backdrop-blur-sm px-2 py-1 sm:px-3 sm:py-1.5 rounded-full border border-white/20">
                          {displayData.language}
                        </span>
                      </div>
                    </div>

                    {/* Genre Tags */}
                    <div className="flex flex-wrap gap-1 sm:gap-2">
                      {displayData.genre.map((g, index) => (
                        <span
                          key={index}
                          className="bg-white/20 hover:bg-white/30 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs sm:text-sm backdrop-blur-sm border border-white/20 transition-all duration-300 hover:scale-105"
                        >
                          {g}
                        </span>
                      ))}
                    </div>

                    {/* Description */}
                    <div className="max-w-3xl">
                      <p className="text-sm sm:text-base lg:text-lg text-gray-100 leading-relaxed bg-black/30 backdrop-blur-sm p-3 sm:p-4 rounded-xl border border-white/10 shadow-xl line-clamp-3">
                        {displayData.description}
                      </p>
                    </div>

                    {/* Desktop Action Buttons */}
                    <div className="hidden sm:flex gap-3 pt-6">
                      <button
                        onClick={handleWatch}
                        className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-full flex items-center text-base font-bold transition-all transform hover:scale-105 shadow-xl"
                      >
                        <Play className="mr-2" size={20} />
                        Watch Now
                      </button>
                      <button className="bg-white/20 hover:bg-white/30 px-6 py-3 rounded-full flex items-center text-base font-semibold backdrop-blur-sm transition-all transform hover:scale-105 border border-white/20">
                        <Heart className="mr-2" size={20} />
                        Add to Watchlist
                      </button>
                      <button className="border-2 border-white/50 hover:bg-white/10 px-6 py-3 rounded-full flex items-center text-base font-semibold backdrop-blur-sm transition-all transform hover:scale-105">
                        <Share2 className="mr-2" size={20} />
                        Share
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Action Buttons */}
        <div className="fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-sm p-3 z-40 sm:hidden border-t border-white/10">
          <div className="container mx-auto">
            <div className="flex gap-2">
              <button
                onClick={handleWatch}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-full flex items-center text-white font-semibold flex-1 justify-center transition-all text-sm"
              >
                <Play className="mr-1" size={16} />
                Watch Now
              </button>
              <button className="bg-white/20 hover:bg-white/30 px-3 py-2 rounded-full flex items-center justify-center transition-all">
                <Heart size={16} />
              </button>
              <button className="border border-white/50 hover:bg-white/10 px-3 py-2 rounded-full flex items-center justify-center transition-all">
                <Share2 size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Movie Details Section */}
        <div className="container mx-auto px-4 py-6 sm:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-4 sm:space-y-6">
              {/* Download Options Section */}
              <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-gray-700/50">
                <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 flex items-center">
                  <Download className="mr-2 sm:mr-3 text-green-500" size={24} />
                  Download Options
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                  {displayData.quality.map((quality) => (
                    <button
                      key={quality}
                      onClick={() => handleDownload(quality)}
                      className="bg-gray-700/80 hover:bg-gray-600/80 backdrop-blur-sm p-3 sm:p-4 rounded-lg transition-all duration-300 text-left border border-gray-600/50 hover:border-green-500/50 group"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-bold text-sm sm:text-base text-white group-hover:text-green-400 transition-colors">
                            {quality}
                          </div>
                          <div className="text-gray-400 text-xs sm:text-sm">
                            Size: {displayData.size?.[quality] || "Unknown"}
                          </div>
                        </div>
                        <Download className="text-green-500 group-hover:scale-110 transition-transform" size={20} />
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Cast & Crew */}
              <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-gray-700/50">
                <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Cast & Crew</h2>
                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-red-500 mb-1 sm:mb-2">Director</h3>
                    <p className="text-gray-200 text-sm sm:text-base">{displayData.director}</p>
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-red-500 mb-1 sm:mb-2">Cast</h3>
                    <div className="flex flex-wrap gap-1 sm:gap-2">
                      {displayData.cast.map((actor, index) => (
                        <span
                          key={index}
                          className="bg-gray-700/80 hover:bg-gray-600/80 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs sm:text-sm transition-all duration-300 border border-gray-600/50"
                        >
                          {actor}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-4 sm:space-y-6">
              {/* Movie Information */}
              <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-gray-700/50">
                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Movie Information</h3>
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex justify-between items-center text-xs sm:text-sm">
                    <span className="text-gray-400 font-medium">Release Year:</span>
                    <span className="font-semibold">{displayData.year}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs sm:text-sm">
                    <span className="text-gray-400 font-medium">Duration:</span>
                    <span className="font-semibold">{displayData.duration}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs sm:text-sm">
                    <span className="text-gray-400 font-medium">Language:</span>
                    <span className="font-semibold">{displayData.language}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs sm:text-sm">
                    <span className="text-gray-400 font-medium">Rating:</span>
                    <div className="flex items-center">
                      <Star className="text-yellow-400 mr-1" size={14} />
                      <span className="font-semibold">{displayData.rating}/5</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* You May Also Like */}
              <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-gray-700/50">
                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">You May Also Like</h3>
                <div className="space-y-3 sm:space-y-4">
                  {(moviesData?.movies || [])
                    .filter((m) => m.id !== displayData.id)
                    .slice(0, 3)
                    .map((movie) => (
                      <div
                        key={movie.id}
                        className="flex space-x-2 sm:space-x-3 group cursor-pointer hover:bg-gray-700/50 p-1 sm:p-2 rounded-lg transition-all"
                      >
                        <img
                          src={movie.image || "/placeholder.svg?height=120&width=80&query=movie poster"}
                          alt={movie.title}
                          className="w-10 h-14 sm:w-14 sm:h-20 object-cover rounded border border-gray-600/50 group-hover:border-red-500/50 transition-all"
                          onError={(e) => {
                            e.target.src = "/placeholder.svg?height=120&width=80"
                          }}
                        />
                        <div className="flex-1">
                          <h4 className="font-bold text-xs sm:text-sm group-hover:text-red-400 transition-colors line-clamp-1">
                            {movie.title}
                          </h4>
                          <p className="text-xxs sm:text-xs text-gray-400 mt-0.5">
                            {movie.year} • {movie.genre?.[0] || "Drama"}
                          </p>
                          <div className="flex items-center mt-1">
                            <Star className="text-yellow-400 mr-0.5" size={10} />
                            <span className="text-xxs sm:text-xs font-medium">{movie.rating}/5</span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}