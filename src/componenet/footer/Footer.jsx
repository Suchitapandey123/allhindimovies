import React from 'react'
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa"
import Link from "next/link"

const Footer = () => {
  return (
    <footer className="py-12 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-red-500 mb-4">AllHindiMovies</h3>
              <p className="text-gray-400 mb-4">The ultimate destination for Hindi cinema lovers worldwide.</p>
              <div className="flex space-x-4">
                <button className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors">
                  <FaFacebookF size={20} />
                </button>
                <button className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors">
                  <FaTwitter size={20} />
                </button>
                <button className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors">
                  <FaInstagram size={20} />
                </button>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/movies" className="text-gray-400 hover:text-white transition-colors">
                    Movies
                  </Link>
                </li>
                <li>
                  <Link href="/tv-shows" className="text-gray-400 hover:text-white transition-colors">
                    TV Shows
                  </Link>
                </li>
                <li>
                  <Link href="/live-tv" className="text-gray-400 hover:text-white transition-colors">
                    Live TV
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/privacy-policy" className="text-gray-400 hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Connect</h4>
              <ul className="space-y-2">
                <li className="text-gray-400">support@allhindimovies.com</li>
                <li className="text-gray-400">+91 98765 43210</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
            <p>© {new Date().getFullYear()} AllHindiMovies.com. All rights reserved.</p>
          </div>
        </div>
      </footer>
  )
}


export default Footer