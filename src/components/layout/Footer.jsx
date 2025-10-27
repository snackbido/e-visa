import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link } from "react-router-dom";

export const Footer = () => {
  const [openSection, setOpenSection] = useState(null);

  // Data for the footer links
  const footerLinks = [
    {
      title: "Vietnam visa guides",
      id: "popular",
      links: [
        { name: "Vietnam visa information", page: "vietnam-visa-information" },
        { name: "Vietnam visa fees", page: "vietnam-visa-fees" },
        { name: "Vietnam visa requirements", page: "vietnam-visa-requirement" },
      ],
    },
    {
      title: "Legal",
      id: "legal",
      links: [
        { name: "About Us", page: "about-us" },
        { name: "Privacy Policy", page: "privacy-policy" },
        { name: "Terms & Conditions", page: "terms-of-use" },
      ],
    },
  ];

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
                to={link.page}
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
              to={link.page}
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
        <div className="hidden md:grid md:grid-cols-4 lg:grid-cols-4 gap-8 border-b border-gray-700 pb-8">
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

          <div className="lg:col-span-1">
            <h4 className="text-lg font-bold text-white mb-4 border-b border-gray-700 pb-2">
              Contact info
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="#"
                  className="text-gray-400 hover:text-blue-400 transition-colors text-sm"
                >
                  1st Floor, Vietphone Building, 64 Nguyen Dinh Chieu, Da Kao
                  Ward, District 1, Ho Chi Minh City, Vietnam
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-gray-400 hover:text-blue-400 transition-colors text-sm"
                >
                  Email: contact@book247.vn
                </Link>
              </li>
              <li>
                <a
                  href="tel:+84902378061"
                  className="text-gray-400 hover:text-blue-400 transition-colors text-sm block"
                >
                  Tel 1: +84 902 378 061
                </a>
                <a
                  href="tel:+84916310247"
                  className="text-gray-400 hover:text-blue-400 transition-colors text-sm block"
                >
                  Tel 2: +84 916 310 247
                </a>
                <a
                  href="tel:+842836227747"
                  className="text-gray-400 hover:text-blue-400 transition-colors text-sm"
                >
                  Tel 3: +84 28 36 227 747
                </a>
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
            <a
              href="tel:+842836227747"
              className="w-[45px] h-[45px] rounded-full bg-[#25D366] flex items-center justify-center text-white no-underline"
            >
              <FontAwesomeIcon icon="fa-solid fa-phone" />
            </a>
            <Link
              to="viber://contact?number=+84902378061"
              className="w-[45px] h-[45px] rounded-full bg-[#7360F2] flex items-center justify-center text-white no-underline"
              title="Viber"
            >
              <FontAwesomeIcon icon="fa-brands fa-viber" />
            </Link>
            <Link
              to="https://zalo.me/3317052262052888113"
              className="w-[45px] h-[45px] rounded-full bg-[#0068FF] flex items-center justify-center text-white no-underline"
              title="Zalo"
              target="_blank"
            >
              <img
                src="https://www.book247.vn/wp-content/uploads/2022/04/Zalo.png"
                alt=""
                height="45"
                className="rounded-2xl"
                width="45"
              />
            </Link>
            <Link
              to="https://wa.me/84902378061"
              target="_blank"
              className="w-[45px] h-[45px] rounded-full bg-[#25D366] flex items-center justify-center text-white no-underline"
              title="WhatsApp"
            >
              <FontAwesomeIcon icon="fa-brands fa-whatsapp" />
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
