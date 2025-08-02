"use client"
import { useState, useEffect } from "react"

export default function PrivacyPolicyPage() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    setIsDarkMode(savedTheme === "dark")
  }, [])

  const sections = [
    {
      title: "Information We Collect",
      content: "We may collect personal information such as your name, email address, and viewing preferences when you register for an account or use our services."
    },
    {
      title: "How We Use Your Information",
      content: "Your information helps us personalize your experience, improve our services, and communicate with you about updates and offers."
    },
    {
      title: "Cookies and Tracking",
      content: "We use cookies to enhance your browsing experience and analyze site traffic. You can control cookies through your browser settings."
    },
    {
      title: "Third-Party Sharing",
      content: "We do not sell your personal information but may share it with trusted partners who assist in operating our website and services."
    },
    {
      title: "Data Security",
      content: "We implement security measures to protect your information, but no method of transmission over the Internet is 100% secure."
    },
    {
      title: "Children's Privacy",
      content: "Our services are not directed to children under 13. We do not knowingly collect personal information from children."
    },
    {
      title: "Changes to This Policy",
      content: "We may update this policy periodically. We'll notify you of significant changes by posting the new policy on this page."
    },
    {
      title: "Contact Us",
      content: "If you have questions about this privacy policy, please contact us at privacy@allhindimovies.com."
    }
  ]

  return (
    <div
      className={`min-h-screen pt-20 transition-colors duration-300 ${
        isDarkMode ? "dark bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">Privacy Policy</h1>
          <p className={`text-lg mb-12 text-center ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
            Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <div className="space-y-8">
            {sections.map((section, index) => (
              <div 
                key={index}
                className={`p-6 rounded-xl shadow-md transition-all duration-300 ${
                  isDarkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-white hover:bg-gray-50"
                }`}
              >
                <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
                <p className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>{section.content}</p>
              </div>
            ))}
          </div>

          <div className={`mt-12 p-6 rounded-xl ${
            isDarkMode ? "bg-gray-800" : "bg-white border border-gray-200"
          }`}>
            <h2 className="text-xl font-semibold mb-4">Your Consent</h2>
            <p className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
              By using our website, you consent to our privacy policy and agree to its terms.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}