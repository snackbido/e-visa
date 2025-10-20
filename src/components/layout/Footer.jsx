import { useState } from "react";
import { Link } from "react-router-dom";

export const Footer = ({ setPage }) => {
  // State to manage which footer section is open on mobile
  const [openSection, setOpenSection] = useState(null);

  // Data for the footer links
  const footerLinks = [
    {
      title: "Vietnam visa guides",
      id: "popular",
      links: [
        { name: "Vietnam visa information", page: "schengen" },
        { name: "Vietnam visa fees", page: "us" },
        { name: "Vietnam visa requirements", page: "canada" },
      ],
    },
    {
      title: "Company",
      id: "company",
      links: [
        { name: "About Us", page: "about-us" },
        { name: "Blog", page: "blog" },
      ],
    },
    {
      title: "Legal",
      id: "legal",
      links: [
        { name: "Privacy Policy", page: "privacy" },
        { name: "Terms & Conditions", page: "terms" },
        { name: "Refund Policy", page: "refund" },
      ],
    },
  ];

  const handleLinkClick = (e, page) => {
    e.preventDefault();
    // Only navigate if the page exists in our router setup, otherwise log.
    if (
      ["home", "about-us", "login", "blog", "apply", "contact"].includes(page)
    ) {
      setPage(page);
    } else {
      console.log(`Navigating to dummy page: ${page}`);
    }
  };

  // Helper component for the Accordion on mobile
  const FooterAccordionItem = ({ title, id, links }) => (
    <div className="border-b border-gray-700 md:hidden">
      <button
        className="flex justify-between items-center w-full py-4 text-lg font-bold text-white hover:text-blue-400 transition-colors focus:outline-none"
        onClick={() => setOpenSection(openSection === id ? null : id)}
        aria-expanded={openSection === id}
      >
        {title}
        <svg
          className={`w-5 h-5 transition-transform duration-300 ${
            openSection === id ? "rotate-180" : "rotate-0"
          }`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-max-height duration-300 ease-in-out ${
          openSection === id ? "max-h-96" : "max-h-0"
        }`}
        style={{
          maxHeight: openSection === id ? links.length * 32 + "px" : "0px",
        }} // Dynamic height for smooth transition
      >
        <ul className="pb-4 space-y-2">
          {links.map((link, index) => (
            <li key={index}>
              <Link
                to="#"
                onClick={(e) => handleLinkClick(e, link.page)}
                className="text-gray-400 hover:text-blue-400 transition-colors text-sm block"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  // Helper component for standard Desktop column
  const FooterColumn = ({ title, links }) => (
    <div className="hidden md:block">
      <h4 className="text-lg font-bold text-white mb-4 border-b border-gray-700 pb-2">
        {title}
      </h4>
      <ul className="space-y-2">
        {links.map((link, index) => (
          <li key={index}>
            <Link
              to="#"
              onClick={(e) => handleLinkClick(e, link.page)}
              className="text-gray-400 hover:text-blue-400 transition-colors text-sm"
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <footer className="bg-gray-900 text-white pt-10 pb-6 border-t-2 border-custom">
      <div className="container mx-auto px-6">
        {/* Logo Section (Always visible) */}

        {/* --- MOBILE ACCORDION SECTION (Visible on mobile only) --- */}
        <div className="md:hidden space-y-2 mb-8">
          <div className="mb-8">
            <div className="md:col-span-2 mb-8 md:mb-0">
              <h2 className="text-3xl font-extrabold text-blue-400 mb-4">
                E-Visa
              </h2>
              <p className="text-gray-400 text-sm mb-4 max-w-md">
                Your global partner for fast, reliable, and secure online visa
                and travel document processing. Simplifying world travel, one
                application at a time.
              </p>
            </div>
          </div>
          {footerLinks.map((col) => (
            <FooterAccordionItem
              key={col.id}
              title={col.title}
              id={col.id}
              links={col.links}
            />
          ))}
        </div>

        {/* --- DESKTOP GRID SECTION (Visible on desktop/tablet only) --- */}
        <div className="hidden md:grid md:grid-cols-4 lg:grid-cols-5 gap-8 border-b border-gray-700 pb-8">
          {/* Column 1 (Logo/Intro is handled above, this is for the first set of links) */}
          <div className="mb-8">
            <div className="md:col-span-2 mb-8 md:mb-0">
              <h2 className="text-3xl font-extrabold text-blue-400 mb-4">
                E-Visa
              </h2>
              <p className="text-gray-400 text-sm mb-4 max-w-md">
                Your global partner for fast, reliable, and secure online visa
                and travel document processing. Simplifying world travel, one
                application at a time.
              </p>
            </div>
          </div>

          {/* Columns 2, 3, 4 (Standard columns) */}
          <FooterColumn
            title={footerLinks[0].title}
            links={footerLinks[0].links}
          />
          <FooterColumn
            title={footerLinks[1].title}
            links={footerLinks[1].links}
          />
          <FooterColumn
            title={footerLinks[2].title}
            links={footerLinks[2].links}
          />

          <div className="lg:col-span-1">
            <h4 className="text-lg font-bold text-white mb-4 border-b border-gray-700 pb-2">
              Contact info
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="#"
                  onClick={(e) => handleLinkClick(e, "about-us")}
                  className="text-gray-400 hover:text-blue-400 transition-colors text-sm"
                >
                  123 Travel Blvd, Suite 400 Global City, GT 54321
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  onClick={(e) => handleLinkClick(e, "blog")}
                  className="text-gray-400 hover:text-blue-400 transition-colors text-sm"
                >
                  Email: info@evisa.com
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  onClick={(e) => handleLinkClick(e, "how-it-works")}
                  className="text-gray-400 hover:text-blue-400 transition-colors text-sm"
                >
                  Phone: +1 (234) 567-890
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Connect With Us Section (Visible after accordions on mobile, standard on desktop) */}
        <div className="text-center md:text-left pt-6 md:pt-0 mt-8">
          <p className="text-gray-400 text-sm mb-4 text-center">
            Connect with us:
          </p>
          <div className="flex justify-center space-x-4 mb-8">
            {/* Instagram */}
            <Link
              to="#"
              className="text-gray-400 hover:text-pink-600 transition-colors bg-gray-800 p-2 rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.17 14.83a2.6 2.6 0 01-3.17 0c-1.43-1.43-2.6-2.6-2.6-2.6a2.6 2.6 0 010-3.17c1.43-1.43 2.6-2.6 2.6-2.6a2.6 2.6 0 013.17 0c1.43 1.43 2.6 2.6 2.6 2.6a2.6 2.6 0 010 3.17c-1.43 1.43-2.6 2.6-2.6 2.6zm-1.17-6.83a1 1 0 100-2 1 1 0 000 2z" />
              </svg>
            </Link>
            {/* LinkedIn */}
            <Link
              to="#"
              className="text-gray-400 hover:text-blue-700 transition-colors bg-gray-800 p-2 rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.136-4 0v5.604h-3v-11h3v1.765c1.397-2.776 7-2.669 7 3.771v5.464z" />
              </svg>
            </Link>
            {/* YouTube */}
            <Link
              to="#"
              className="text-gray-400 hover:text-red-600 transition-colors bg-gray-800 p-2 rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M19.615 3.184c-3.604-.265-11.233-.265-14.837 0C1.725 3.447 0 5.4 0 7.828v8.344C0 18.6 1.725 20.553 4.778 20.816c3.604.265 11.233.265 14.837 0 3.053-.263 4.778-2.216 4.778-4.644V7.828c0-2.428-1.725-4.381-4.778-4.644zM10.156 16.32V7.712l6.574 4.304-6.574 4.304z" />
              </svg>
            </Link>
            {/* Facebook */}
            <Link
              to="#"
              className="text-gray-400 hover:text-blue-600 transition-colors bg-gray-800 p-2 rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2C6.477 2 2 6.477 2 12c0 5.084 3.791 9.351 8.75 9.923v-7.01h-2.5v-2.913h2.5V9.45c0-2.484 1.492-3.854 3.738-3.854 1.056 0 2.15.189 2.15.189v2.36h-1.205c-1.187 0-1.554.737-1.554 1.493v1.85h2.646l-.422 2.913h-2.224v7.01C18.209 21.351 22 17.084 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Legal and Language/Currency (Always visible) */}
        <div className="flex justify-center flex-col space-y-4 md:space-y-0 text-center text-xs text-gray-400 border-t border-gray-700 pt-6">
          <p className="order-2 md:order-1 mb-2">
            &copy; 2014-{new Date().getFullYear()} E-Visa. All rights reserved.
            E-Visa and E-Visa logo are registered trademarks.
          </p>
        </div>
      </div>
    </footer>
  );
};
