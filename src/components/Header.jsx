import { LogOut, User } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <Link to="/" className="text-xl sm:text-2xl font-bold text-indigo-600">
          E-Visa
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex space-x-8 items-center">
          <Link
            to="/"
            className="text-gray-600 hover:text-indigo-600 transition-colors duration-200 font-medium"
          >
            Home
          </Link>
          <Link
            to="/apply-visa"
            className="text-gray-600 hover:text-indigo-600 transition-colors duration-200 font-medium"
          >
            Apply Visa
          </Link>
          <Link
            to="/blog"
            className="text-gray-600 hover:text-indigo-600 transition-colors duration-200 font-medium"
          >
            Blog
          </Link>
          <Link
            to="#about"
            className="text-gray-600 hover:text-indigo-600 transition-colors duration-200 font-medium"
          >
            About Us
          </Link>
          <Link
            to="#contact"
            className="text-gray-600 hover:text-indigo-600 transition-colors duration-200 font-medium"
          >
            Contact
          </Link>
        </div>

        {/* Desktop CTA Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {!user ? (
            <Link
              to="/login"
              className="text-gray-600 hover:text-indigo-600 font-medium hidden lg:block"
            >
              Log In
            </Link>
          ) : (
            <div className="mx-auto flex justify-end">
              {/* User Greeting and Hover Dropdown */}
              <div className="relative group">
                <button className="text-gray-700 dark:text-gray-300 text-sm md:text-base font-medium px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors cursor-pointer">
                  Hello, {user.email}
                </button>

                {/* Dropdown Menu */}
                <div className="absolute right-0 top-10 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300">
                  <Link
                    to={"/profile"}
                    className="flex items-center w-full px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-t-lg transition-colors"
                  >
                    <User className="w-4 h-4 mr-2" /> Profile
                  </Link>
                  <button className="flex items-center w-full px-4 py-2 text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-b-lg transition-colors">
                    <LogOut className="w-4 h-4 mr-2" /> Logout
                  </button>
                </div>
              </div>
            </div>
          )}
          <Link
            to="/apply-visa"
            className="px-4 py-2 sm:px-5 sm:py-2.5 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700 transition-colors duration-200 shadow-md text-sm sm:text-base"
          >
            Apply Now
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-gray-600 hover:text-indigo-600 focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={
                mobileMenuOpen
                  ? "M6 18L18 6M6 6l12 12"
                  : "M4 6h16M4 12h16m-7 6h7"
              }
            ></path>
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-4 space-y-4">
            <Link
              to="#"
              className="block text-gray-600 hover:text-indigo-600 font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="#"
              className="block text-gray-600 hover:text-indigo-600 font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              to="#"
              className="block text-gray-600 hover:text-indigo-600 font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              to="#"
              className="block text-gray-600 hover:text-indigo-600 font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              FAQ
            </Link>
            <Link
              to="#"
              className="block text-gray-600 hover:text-indigo-600 font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="pt-4 border-t border-gray-200 space-y-4">
              <Link
                to="#"
                className="block text-gray-600 hover:text-indigo-600 font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Log In
              </Link>
              <Link
                to="#"
                className="block px-4 py-2 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700 transition-colors duration-200 shadow-md text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Apply Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
