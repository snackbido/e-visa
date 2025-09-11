import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-8 sm:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        <div className="sm:col-span-2 lg:col-span-1">
          <h3 className="text-white text-lg sm:text-xl font-bold mb-3 sm:mb-4">
            E-Visa
          </h3>
          <p className="text-sm">
            Simplifying your visa application process with speed and security.
          </p>
        </div>
        <div>
          <h4 className="text-white text-base sm:text-lg font-semibold mb-3 sm:mb-4">
            Quick Links
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                to="#"
                className="hover:text-indigo-400 transition-colors duration-200"
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="hover:text-indigo-400 transition-colors duration-200"
              >
                Pricing
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="hover:text-indigo-400 transition-colors duration-200"
              >
                FAQ
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="hover:text-indigo-400 transition-colors duration-200"
              >
                About Us
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-white text-base sm:text-lg font-semibold mb-3 sm:mb-4">
            Support
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                to="#"
                className="hover:text-indigo-400 transition-colors duration-200"
              >
                Contact Us
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="hover:text-indigo-400 transition-colors duration-200"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="hover:text-indigo-400 transition-colors duration-200"
              >
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-white text-base sm:text-lg font-semibold mb-3 sm:mb-4">
            Contact Info
          </h4>
          <div className="text-sm space-y-2">
            <p>
              123 Travel Blvd, Suite 400
              <br />
              Global City, GT 54321
            </p>
            <p>
              Email:{" "}
              <Link
                to="mailto:info@evisa.com"
                className="hover:text-indigo-400 break-all"
              >
                info@evisa.com
              </Link>
            </p>
            <p>
              Phone:{" "}
              <Link to="tel:+1234567890" className="hover:text-indigo-400">
                +1 (234) 567-890
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 border-t border-gray-700 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center">
        <p className="text-xs sm:text-sm text-gray-500">
          &copy; 2024 E-Visa. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
