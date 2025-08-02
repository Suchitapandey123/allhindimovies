"use client"
import { useState, useEffect } from "react"
import {
  Search,
  Menu,
  X,
  Moon,
  Sun,
  ChevronDown,
  Home,
  Film,
  Tv,
  Radio,
  Star,
  User,
  Settings,
  LogOut,
  Play,
  Heart,
  Clock,
  Zap,
  Smile,
  Drama,
  Flame,
  Ghost,
  Map,
  Shield,
  Users,
  Music,
  Building,
  BookOpen,
  Grid3X3,
} from "lucide-react"
import Link from "next/link"

// Enhanced genres with icons
const genres = [
  { name: "Action", icon: Zap, color: "text-orange-500" },
  { name: "Comedy", icon: Smile, color: "text-yellow-500" },
  { name: "Drama", icon: Drama, color: "text-purple-500" },
  { name: "Romance", icon: Heart, color: "text-pink-500" },
  { name: "Thriller", icon: Flame, color: "text-red-500" },
  { name: "Horror", icon: Ghost, color: "text-gray-500" },
  { name: "Adventure", icon: Map, color: "text-green-500" },
  { name: "Crime", icon: Shield, color: "text-blue-500" },
  { name: "Family", icon: Users, color: "text-indigo-500" },
  { name: "Musical", icon: Music, color: "text-cyan-500" },
  { name: "Historical", icon: Building, color: "text-amber-500" },
  { name: "Biographical", icon: BookOpen, color: "text-teal-500" },
]

const menuItems = [
  { name: "Home", href: "/", icon: Home, color: "text-blue-500" },
  { name: "Movies", href: "/movies", icon: Film, color: "text-red-500" },
  { name: "TV Shows", href: "/tv-shows", icon: Tv, color: "text-green-500" },
  { name: "Live TV", href: "/live-tv", icon: Radio, color: "text-purple-500" },
  // { name: "Genres", href: "/genres", icon: Grid3X3, color: "text-orange-500" },
  { name: "Top Rated", href: "/top-rated", icon: Star, color: "text-yellow-500" },
  // { name: "Watchlist", href: "/watchlist", icon: Heart, color: "text-pink-500" },
  // { name: "Recently Watched", href: "/recent", icon: Clock, color: "text-gray-500" },
]

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isGenreOpen, setIsGenreOpen] = useState(false)

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Initialize theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark")
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      setIsDarkMode(prefersDark)
    }
  }, [])

  // Apply theme
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }, [isDarkMode])

  return (
    <>
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled
            ? `${isDarkMode ? "bg-gray-900/95" : "bg-white/95"} py-2 shadow-lg backdrop-blur-md`
            : "bg-black/20 backdrop-blur-sm py-4"
        }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          {/* Left Logo + Menu */}
          <div className="flex items-center space-x-4">
            <button
              className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${
                isDarkMode ? "hover:bg-gray-700/50" : "hover:bg-gray-200/50"
              }`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <Link href="/" className="text-2xl font-bold text-red-600 hover:text-red-500 transition-colors">
              All
              <span className={isScrolled ? (isDarkMode ? "text-white" : "text-gray-900") : "text-white"}>Hindi</span>
              Movies
            </Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden lg:flex space-x-6 items-center">
            <Link
              href="/"
              className={`hover:text-red-600 font-medium transition-colors ${
                !isScrolled ? "text-white" : isDarkMode ? "text-gray-200" : "text-gray-700"
              }`}
            >
              Home
            </Link>
            <Link
              href="/movies"
              className={`hover:text-red-600 font-medium transition-colors ${
                !isScrolled ? "text-white" : isDarkMode ? "text-gray-200" : "text-gray-700"
              }`}
            >
              Movies
            </Link>
            <Link
              href="/tv-shows"
              className={`hover:text-red-600 font-medium transition-colors ${
                !isScrolled ? "text-white" : isDarkMode ? "text-gray-200" : "text-gray-700"
              }`}
            >
              TV Shows
            </Link>
            <Link
              href="/live-tv"
              className={`hover:text-red-600 font-medium transition-colors ${
                !isScrolled ? "text-white" : isDarkMode ? "text-gray-200" : "text-gray-700"
              }`}
            >
              Live TV
            </Link>

            {/* Genres dropdown */}
            <div className="relative">
              {/* <button
                onClick={() => setIsGenreOpen(!isGenreOpen)}
                className={`flex items-center hover:text-red-600 font-medium transition-colors ${
                  !isScrolled ? "text-white" : isDarkMode ? "text-gray-200" : "text-gray-700"
                }`}
              >
                Genres <ChevronDown size={16} className="ml-1" />
              </button> */}
              {isGenreOpen && (
                <div
                  className={`absolute top-full left-0 mt-2 w-64 rounded-xl shadow-2xl z-50 ${
                    isDarkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"
                  }`}
                >
                  <div className="py-3 max-h-64 overflow-y-auto">
                    <div className="grid grid-cols-2 gap-1 p-2">
                      {genres.map((genre) => {
                        const IconComponent = genre.icon
                        return (
                          <Link
                            key={genre.name}
                            href={`/genre/${genre.name.toLowerCase()}`}
                            className={`flex items-center px-3 py-2 text-sm rounded-lg transition-all duration-200 group ${
                              isDarkMode
                                ? "text-gray-200 hover:bg-gray-700 hover:text-white"
                                : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                            }`}
                            onClick={() => setIsGenreOpen(false)}
                          >
                            <IconComponent
                              size={16}
                              className={`mr-2 ${genre.color} group-hover:scale-110 transition-transform`}
                            />
                            {genre.name}
                          </Link>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/top-rated"
              className={`hover:text-red-600 font-medium transition-colors ${
                !isScrolled ? "text-white" : isDarkMode ? "text-gray-200" : "text-gray-700"
              }`}
            >
              Top Rated
            </Link>
             <Link
              href="/contact"
              className={`hover:text-red-600 font-medium transition-colors ${
                !isScrolled ? "text-white" : isDarkMode ? "text-gray-200" : "text-gray-700"
              }`}
            >
              Contact
            </Link>
          </div>

          {/* Right buttons */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${
                isDarkMode ? "hover:bg-gray-700/50" : "hover:bg-gray-200/50"
              }`}
            >
              {isDarkMode ? (
                <Sun size={20} className="text-yellow-400" />
              ) : (
                <Moon size={20} className={!isScrolled ? "text-white" : "text-gray-700"} />
              )}
            </button>
            <button
              className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${
                isDarkMode ? "hover:bg-gray-700/50" : "hover:bg-gray-200/50"
              }`}
            >
              <Search
                size={20}
                className={!isScrolled ? "text-white" : isDarkMode ? "text-gray-200" : "text-gray-700"}
              />
            </button>
            <button className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-full text-white font-medium transition-all duration-300 hover:scale-105">
              Sign In
            </button>
          </div>
        </div>
      </nav>

      {/* Enhanced Mobile Side Menu */}
      <div
        className={`fixed inset-y-0 left-0 w-80 shadow-2xl z-40 transform ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out ${
          isDarkMode ? "bg-gradient-to-b from-gray-800 to-gray-900" : "bg-gradient-to-b from-white to-gray-50"
        }`}
        style={{ zIndex: 999 }}
      >
        {/* Menu Header */}
        <div className={`p-6 border-b ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-red-700 rounded-xl flex items-center justify-center shadow-lg">
                <Play className="text-white" size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-red-600">AllHindi</h2>
                <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Movies & Shows</p>
              </div>
            </div>
            <button
              onClick={() => setIsMenuOpen(false)}
              className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${
                isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
              }`}
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Menu Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Main Navigation */}
          <div className="p-4">
            <div
              className={`text-xs font-semibold mb-4 ${isDarkMode ? "text-gray-400" : "text-gray-500"} uppercase tracking-wider`}
            >
              🎬 Navigation
            </div>
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const IconComponent = item.icon
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={`flex items-center px-4 py-3 rounded-xl transition-all duration-300 group hover:scale-105 ${
                        isDarkMode
                          ? "hover:bg-gray-700 text-gray-200 hover:text-white hover:shadow-lg"
                          : "hover:bg-gray-100 text-gray-700 hover:text-gray-900 hover:shadow-md"
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <div
                        className={`p-2 rounded-lg mr-4 transition-all duration-300 group-hover:scale-110 ${
                          isDarkMode ? "bg-gray-700 group-hover:bg-gray-600" : "bg-gray-200 group-hover:bg-white"
                        }`}
                      >
                        <IconComponent
                          size={20}
                          className={`${item.color} group-hover:scale-110 transition-transform`}
                        />
                      </div>
                      <span className="font-semibold">{item.name}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Genres Section */}
          {/* <div className="p-4">
            <div
              className={`text-xs font-semibold mb-4 ${isDarkMode ? "text-gray-400" : "text-gray-500"} uppercase tracking-wider`}
            >
              🎭 Popular Genres
            </div>
            <div className="grid grid-cols-2 gap-2">
              {genres.slice(0, 8).map((genre) => {
                const IconComponent = genre.icon
                return (
                  <Link
                    key={genre.name}
                    href={`/genre/${genre.name.toLowerCase()}`}
                    className={`flex items-center px-3 py-2 rounded-lg text-sm transition-all duration-300 group hover:scale-105 ${
                      isDarkMode
                        ? "hover:bg-gray-700 text-gray-300 hover:text-white hover:shadow-md"
                        : "hover:bg-gray-100 text-gray-600 hover:text-gray-900 hover:shadow-sm"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <IconComponent
                      size={16}
                      className={`mr-2 ${genre.color} group-hover:scale-110 transition-transform`}
                    />
                    <span className="font-medium">{genre.name}</span>
                  </Link>
                )
              })}
            </div>
          </div> */}

          {/* User Section */}
          <div className={`p-4 border-t ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}>
            <div
              className={`text-xs font-semibold mb-4 ${isDarkMode ? "text-gray-400" : "text-gray-500"} uppercase tracking-wider`}
            >
              👤 Account
            </div>
            <ul className="space-y-2">
              {[
                { name: "Profile", icon: User, color: "text-blue-500" },
                { name: "Settings", icon: Settings, color: "text-green-500" },
                { name: "Sign Out", icon: LogOut, color: "text-red-500" },
              ].map((item) => {
                const IconComponent = item.icon
                return (
                  <li key={item.name}>
                    <button
                      className={`flex items-center w-full px-4 py-3 rounded-xl transition-all duration-300 group hover:scale-105 ${
                        isDarkMode
                          ? "hover:bg-gray-700 text-gray-200 hover:text-white hover:shadow-lg"
                          : "hover:bg-gray-100 text-gray-700 hover:text-gray-900 hover:shadow-md"
                      }`}
                    >
                      <div
                        className={`p-2 rounded-lg mr-4 transition-all duration-300 group-hover:scale-110 ${
                          isDarkMode ? "bg-gray-700 group-hover:bg-gray-600" : "bg-gray-200 group-hover:bg-white"
                        }`}
                      >
                        <IconComponent
                          size={20}
                          className={`${item.color} group-hover:scale-110 transition-transform`}
                        />
                      </div>
                      <span className="font-semibold">{item.name}</span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>

      {/* Overlay when menu is open */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  )
}

export default Header
