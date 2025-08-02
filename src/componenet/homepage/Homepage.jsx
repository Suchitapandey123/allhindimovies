"use client"

import { useState, useEffect } from "react"
import moviesData from "../../data/movies.json"
import { useRouter } from "next/navigation"
import { Play, Star, ArrowRight, ChevronLeft, ChevronRight, Info, Plus, Volume2, VolumeX } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function FixedHome() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const [isHovered, setIsHovered] = useState(false)
  const router = useRouter()

  const movies = moviesData?.movies || []
  const genres = moviesData?.genres || []

  // Navigate to details page
  const navigateToDetails = (movie) => {
    router.push(`/movies/${movie.id}?title=${encodeURIComponent(movie.title)}`)
  }

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark")
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      setIsDarkMode(prefersDark)
    }
    setIsLoading(false)
  }, [])

  useEffect(() => {
    if (isLoading) return
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }, [isDarkMode, isLoading])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % movies.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + movies.length) % movies.length)
  }

  // Auto slide every 6 seconds, pause on hover
  useEffect(() => {
    if (isHovered) return

    const interval = setInterval(() => {
      nextSlide()
    }, 6000)
    return () => clearInterval(interval)
  }, [currentSlide, isHovered])

  const currentMovie = movies[currentSlide] || {}
  const featuredMovies = movies.slice(0, 4)
  const trendingMovies = movies.slice(2, 6)

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode ? "dark bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Fixed Hero Slider */}
      <section
        className="relative h-screen flex items-center justify-center overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Background Image */}
        {currentMovie.backdrop ? (
          <div className="absolute inset-0 w-full h-full">
            <Image
              src={currentMovie.backdrop || "/placeholder.svg"}
              alt={currentMovie.title || "Movie backdrop"}
              fill
              priority
              quality={90}
              className={`object-cover transition-all duration-1000 ${isHovered ? "scale-105" : "scale-100"}`}
              style={{
                objectPosition: "center center",
                filter: `brightness(0.6) contrast(1.1) saturate(1.2)`,
              }}
              onError={(e) => {
                const target = e.target
                target.onerror = null
                target.src = "/placeholder-backdrop.jpg"
              }}
              sizes="100vw"
            />
          </div>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-black flex items-center justify-center">
            <div className="text-white animate-pulse text-xl">Loading cinematic experience...</div>
          </div>
        )}

        {/* Enhanced Gradient Overlays */}
        <div className="absolute inset-0 z-10">
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/30"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70"></div>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-4 md:left-8 top-1/2 transform -translate-y-1/2 z-30 bg-black/50 hover:bg-black/80 backdrop-blur-sm text-white p-3 md:p-4 rounded-full transition-all duration-300 shadow-2xl hover:scale-110"
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} className="md:w-8 md:h-8" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 md:right-8 top-1/2 transform -translate-y-1/2 z-30 bg-black/50 hover:bg-black/80 backdrop-blur-sm text-white p-3 md:p-4 rounded-full transition-all duration-300 shadow-2xl hover:scale-110"
          aria-label="Next slide"
        >
          <ChevronRight size={24} className="md:w-8 md:h-8" />
        </button>

        {/* Volume Control */}
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="absolute top-4 md:top-8 right-4 md:right-8 z-30 bg-black/50 hover:bg-black/80 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 shadow-xl"
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>

        {/* Hero Content - Fixed Layout */}
        <div className="container mx-auto px-4 md:px-8 relative z-20 flex flex-col justify-center h-full">
          <div className="max-w-4xl space-y-6 md:space-y-8">
            {/* Movie Title */}
            <div className="overflow-hidden">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight text-white drop-shadow-2xl">
                {currentMovie.title || "Loading..."}
              </h1>
            </div>

            {/* Movie Info Row */}
            <div className="flex flex-wrap items-center gap-3 md:gap-4">
              <span className="bg-red-600 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-full font-bold text-sm md:text-base shadow-lg">
                {currentMovie.year || "2009"}
              </span>

              <div className="flex items-center text-white bg-black/40 backdrop-blur-sm px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-white/20 shadow-lg">
                <Star className="text-yellow-400 mr-1.5 md:mr-2" size={16} />
                <span className="font-semibold text-sm md:text-base">{currentMovie.rating || "4.9"}/5</span>
              </div>

              <span className="text-white/90 font-medium bg-black/40 backdrop-blur-sm px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-white/20 text-sm md:text-base">
                {currentMovie.duration || "2h 50m"}
              </span>

              <span className="text-white/90 font-medium bg-black/40 backdrop-blur-sm px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-white/20 text-sm md:text-base">
                HD • 4K
              </span>
            </div>

            {/* Description */}
            <div className="max-w-3xl">
              <p className="text-base md:text-lg lg:text-xl leading-relaxed text-white/95 bg-black/30 backdrop-blur-sm p-4 md:p-6 rounded-xl border border-white/10 shadow-xl">
                {currentMovie.description
                  ? currentMovie.description.split(" ").slice(0, 30).join(" ") + "..."
                  : "3 Idiots (2009) is a heartwarming and thought-provoking Bollywood comedy drama that follows the journey of three engineering students Rancho, Farhan, and Raju navigating the pressures of a rigid..."}
              </p>
            </div>

            {/* Genre Tags */}
            <div className="flex flex-wrap gap-2 md:gap-3">
              {(currentMovie.genre || ["Comedy", "Drama"]).map((genre, i) => (
                <span
                  key={i}
                  className="bg-white/20 hover:bg-white/30 transition-all duration-300 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-full text-sm md:text-base font-medium shadow-lg backdrop-blur-sm border border-white/20 hover:scale-105 cursor-pointer"
                >
                  {genre}
                </span>
              ))}
            </div>

            {/* Action Buttons - Fixed Layout */}
            <div className="flex flex-wrap items-center gap-3 md:gap-4 pt-4">
              <button
                onClick={() => currentMovie.id && navigateToDetails(currentMovie)}
                className="bg-red-600 hover:bg-red-700 px-6 py-3 md:px-8 md:py-4 rounded-full flex items-center text-white font-bold text-sm md:text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl"
                disabled={!currentMovie.id}
              >
                <Play className="mr-2 md:mr-3" size={20} />
                Watch Now
              </button>

              <button className="bg-black/50 hover:bg-black/70 backdrop-blur-sm px-6 py-3 md:px-8 md:py-4 rounded-full text-white transition-all duration-300 border border-white/30 hover:border-white/50 shadow-xl hover:scale-105 flex items-center font-semibold text-sm md:text-base">
                <Info className="mr-2 md:mr-3" size={20} />
                More Info
              </button>

              <button className="bg-black/50 hover:bg-black/70 backdrop-blur-sm p-3 md:p-4 rounded-full text-white transition-all duration-300 border border-white/30 hover:border-white/50 shadow-xl hover:scale-105">
                <Plus size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Slide Indicators - Fixed Position */}
        <div className="absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2 md:space-x-3">
          {movies.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentSlide
                  ? "bg-red-600 w-8 md:w-12 h-2 md:h-3 shadow-lg"
                  : "bg-white/40 hover:bg-white/60 w-2 md:w-3 h-2 md:h-3"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Enhanced Featured Movies Section */}
      <section
        className={`py-16 md:py-20 relative overflow-hidden ${
          isDarkMode ? "bg-gradient-to-b from-gray-900 to-gray-800" : "bg-gradient-to-b from-gray-100 to-white"
        }`}
      >
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 md:mb-16">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-red-600 to-yellow-600 bg-clip-text text-transparent">
                Featured Hindi Movies
              </h2>
              <p className={`text-base md:text-lg ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                Handpicked selections from our premium collection
              </p>
            </div>
            <Link
              href="/movies"
              className="group text-red-600 hover:text-red-500 flex items-center transition-all duration-300 font-semibold text-lg mt-4 md:mt-0"
            >
              View All
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </Link>
          </div>

          {movies.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {featuredMovies.map((movie, index) => (
                <div
                  key={movie.id}
                  className={`group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${
                    isDarkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-white hover:bg-gray-50"
                  }`}
                >
                  <div className="relative pb-[150%] overflow-hidden">
                    <Image
                      src={movie.image || "/placeholder.svg?height=600&width=400&query=movie poster"}
                      alt={movie.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => {
                        const target = e.target
                        target.onerror = null
                        target.src = "/placeholder.svg?height=600&width=400"
                      }}
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <div className="absolute bottom-4 left-4 right-4">
                        <button
                          onClick={() => navigateToDetails(movie)}
                          className="w-full bg-red-600 hover:bg-red-700 px-6 py-3 rounded-full flex items-center justify-center text-white font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                        >
                          <Play className="mr-2" size={18} />
                          Watch Now
                        </button>
                      </div>
                    </div>

                    <div className="absolute top-3 right-3 bg-gradient-to-r from-green-500 to-green-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                      HD
                    </div>
                  </div>

                  <div className="p-4 md:p-6">
                    <h3 className="text-lg md:text-xl font-bold mb-3 line-clamp-1 group-hover:text-red-600 transition-colors">
                      {movie.title}
                    </h3>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Star className="text-yellow-400 mr-1" size={16} />
                        <span className="font-semibold">{movie.rating}/5</span>
                      </div>
                      <span className={`text-sm font-medium ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                        {movie.year}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-xl md:text-2xl font-semibold">No movies found. Please check back later.</p>
            </div>
          )}
        </div>
      </section>

      {/* Enhanced Trending Section */}
      <section
        className={`py-16 md:py-20 relative overflow-hidden ${
          isDarkMode ? "bg-gradient-to-br from-gray-800 to-gray-900" : "bg-gradient-to-br from-gray-200 to-gray-100"
        }`}
      >
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 md:mb-16">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-red-600 to-purple-600 bg-clip-text text-transparent">
                Trending Now
              </h2>
              <p className={`text-base md:text-lg ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                The hottest movies everyone's watching right now
              </p>
            </div>
            <Link
              href="/trending"
              className="group mt-6 md:mt-0 flex items-center text-red-600 hover:text-red-500 transition-all duration-300 font-semibold text-lg"
            >
              View All Trending
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </Link>
          </div>

          {movies.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {trendingMovies.map((movie, index) => (
                <div
                  key={movie.id}
                  className={`group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 ${
                    isDarkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-white hover:bg-gray-50"
                  }`}
                >
                  <div className="absolute top-4 left-4 z-20 bg-gradient-to-r from-red-600 to-pink-600 text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg border border-white/20">
                    #{index + 1} Trending
                  </div>

                  <div className="relative pb-[150%] overflow-hidden">
                    <Image
                      src={movie.image || "/placeholder.svg?height=600&width=400&query=trending movie poster"}
                      alt={movie.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => {
                        const target = e.target
                        target.onerror = null
                        target.src = "/placeholder.svg?height=600&width=400"
                      }}
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <div className="absolute bottom-6 left-4 right-4">
                        <button
                          onClick={() => navigateToDetails(movie)}
                          className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 px-6 py-3 rounded-full flex items-center justify-center text-white font-semibold mb-4 transition-all duration-300 transform hover:scale-105 shadow-lg"
                        >
                          <Play className="mr-2" size={18} /> Watch Now
                        </button>
                        <div className="flex items-center justify-between text-white">
                          <div className="flex items-center">
                            <Star className="text-yellow-400 mr-1" size={16} />
                            <span className="font-semibold">{movie.rating}/5</span>
                          </div>
                          <span className="text-sm font-medium">{movie.year}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 md:p-6">
                    <h3 className="text-lg md:text-xl font-bold mb-3 line-clamp-1 group-hover:text-red-600 transition-colors">
                      {movie.title}
                    </h3>
                    <div className="flex items-center">
                      <span className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                        {movie.genre?.slice(0, 2).join(" • ") || "Action • Drama"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-xl md:text-2xl font-semibold">No trending movies available.</p>
            </div>
          )}
        </div>
      </section>

      {/* Enhanced Call to Action */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-red-600 via-red-700 to-red-800 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-8 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-6 md:mb-8 text-white leading-tight">
            Join AllHindiMovies.com Today
          </h2>
          <p className="text-lg md:text-xl lg:text-2xl text-white/95 max-w-3xl mx-auto mb-8 md:mb-12 leading-relaxed">
            Unlimited access to thousands of Hindi movies and TV shows. Watch anywhere, cancel anytime.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6">
            <button className="group bg-white text-red-600 hover:bg-gray-100 px-8 py-4 md:px-10 md:py-4 rounded-full font-bold text-base md:text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl">
              Start Your Free Trial
              <ArrowRight className="inline ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </button>
            <button className="group border-2 border-white text-white hover:bg-white/10 px-8 py-4 md:px-10 md:py-4 rounded-full font-bold text-base md:text-lg transition-all duration-300 transform hover:scale-105 backdrop-blur-sm">
              Learn More
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
