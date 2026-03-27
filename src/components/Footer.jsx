import { Mail, Phone } from "lucide-react"
import { FaGithub, FaInstagram, FaYoutube, FaLinkedin } from "react-icons/fa"
import React from "react"

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">

      {/* Main */}
      <div className="flex flex-col md:flex-row justify-around py-8 px-6 gap-8">

        {/* Contact */}
        <div className="max-w-xs text-center md:text-left mx-auto md:mx-0">
          <h3 className="font-bold text-lg mb-2">Contacts</h3>

          <p className="text-gray-300 flex items-center justify-center md:justify-start gap-2">
            <Phone size={18} /> 9342620781
          </p>

          <p className="text-gray-300 flex items-center justify-center md:justify-start gap-2 mt-2">
            <Mail size={18} /> sharjin1501@gmail.com
          </p>
        </div>

        {/* Follow Us */}
        <div className="max-w-xs text-center md:text-left mx-auto md:mx-0">
          <h3 className="font-bold text-lg mb-2">Follow Us</h3>

          <div className="flex justify-center md:justify-start gap-5 text-2xl">

            <a href="/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
              <FaGithub />
            </a>

            <a href="/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
              <FaLinkedin />
            </a>

            <a href="/" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500">
              <FaInstagram />
            </a>

            <a href="/" target="_blank" rel="noopener noreferrer" className="hover:text-red-500">
              <FaYoutube />
            </a>

          </div>
        </div>

        {/* About */}
        <div className="max-w-xs text-center md:text-left mx-auto md:mx-0">
          <h3 className="font-bold text-lg mb-2">About Us</h3>

          <p className="text-gray-300 text-sm md:text-base leading-relaxed">
            We provide high-quality products at affordable prices with a focus
            on customer satisfaction.
          </p>
        </div>

      </div>

      {/* Bottom */}
      <div className="text-gray-300 border-t border-gray-700 py-3 text-center text-sm">
        © 2026 Shopping Hub. All rights reserved.
      </div>

    </footer>
  )
}

export default Footer