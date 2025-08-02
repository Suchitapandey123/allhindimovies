"use client"
import { useState, useEffect } from "react"
import { Mail, Phone, MapPin, Send } from "lucide-react"

export default function ContactPage() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    setIsDarkMode(savedTheme === "dark")
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate form submission
    setTimeout(() => {
      alert('Thank you for your message! We will get back to you soon.')
      setFormData({ name: '', email: '', message: '' })
      setIsSubmitting(false)
    }, 1500)
  }

  return (
    <div className={`min-h-screen pt-20 transition-colors duration-300 ${
      isDarkMode ? "dark bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
    }`}>
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className={`text-xl max-w-2xl mx-auto ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
            Have questions or feedback? We'd love to hear from you!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className={`p-8 rounded-2xl shadow-xl ${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <Send className="mr-2 text-red-500" size={24} />
              Send us a message
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className={`block mb-2 font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all ${
                    isDarkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"
                  }`}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className={`block mb-2 font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all ${
                    isDarkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"
                  }`}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="message" className={`block mb-2 font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all ${
                    isDarkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"
                  }`}
                  required
                ></textarea>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-6 rounded-lg font-bold text-white bg-red-600 hover:bg-red-700 transition-colors flex items-center justify-center ${
                  isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Send className="mr-2" size={18} />
                    Send Message
                  </span>
                )}
              </button>
            </form>
          </div>

          {/* Contact Info & Map */}
          <div className="space-y-8">
            {/* Contact Cards */}
            <div className={`p-8 rounded-2xl shadow-xl ${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
              <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className={`p-3 rounded-full mr-4 ${isDarkMode ? "bg-gray-700" : "bg-red-100"}`}>
                    <Mail className="text-red-500" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Email Us</h3>
                    <p className={`mt-1 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                      support@allhindimovies.com
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className={`p-3 rounded-full mr-4 ${isDarkMode ? "bg-gray-700" : "bg-red-100"}`}>
                    <Phone className="text-red-500" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Call Us</h3>
                    <p className={`mt-1 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                      +91 98765 43210
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className={`p-3 rounded-full mr-4 ${isDarkMode ? "bg-gray-700" : "bg-red-100"}`}>
                    <MapPin className="text-red-500" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Visit Us</h3>
                    <p className={`mt-1 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                      123 Bollywood Avenue, Mumbai, Maharashtra 400001
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className={`overflow-hidden rounded-2xl shadow-xl ${isDarkMode ? "border border-gray-700" : "border border-gray-200"}`}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.715482127767!2d72.8246603153849!3d19.05272245794885!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c8df05cf75a9%3A0x5f9c6af4b1f5f9f5!2sBollywood%20Avenue!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                className={`${isDarkMode ? "grayscale-[50%] invert-[90%]" : ""}`}
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}