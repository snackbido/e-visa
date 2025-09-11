import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

const Home = () => {
  const carouselRef = useRef(null);
  const [openFAQId, setOpenFAQId] = useState(null);

  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const cardWidth =
        carouselRef.current.querySelector("div")?.offsetWidth || 350;
      const scrollAmount = cardWidth + 32; // card width + gap (tailwind gap-8 is 32px)
      if (direction === "next") {
        carouselRef.current.scrollBy({
          left: scrollAmount,
          behavior: "smooth",
        });
      } else {
        carouselRef.current.scrollBy({
          left: -scrollAmount,
          behavior: "smooth",
        });
      }
    }
  };

  const faqItems = [
    {
      id: 1,
      question: "What is an E-Visa?",
      answer:
        "An E-Visa is an official document permitting entry into and travel within a country. It is an alternative to visas issued on arrival at airports and is processed and stored digitally. You receive it via email, and you simply need to print it or show it on your mobile device at the border.",
    },
    {
      id: 2,
      question: "How long does the application process take?",
      answer:
        "Our online form takes only a few minutes to complete. Once submitted, processing times vary by country, but we always aim to expedite the process and will keep you updated every step of the way.",
    },
    {
      id: 3,
      question: "Is my personal information secure?",
      answer:
        "Absolutely. We use advanced encryption and security protocols to ensure that all of your personal and payment information is protected. We comply with international data protection regulations to safeguard your privacy.",
    },
    {
      id: 4,
      question: "What documents do I need to apply?",
      answer:
        "The required documents vary depending on your destination country and nationality. Generally, you will need a valid passport and a digital photo. We will provide a clear list of requirements during your application process.",
    },
    {
      id: 5,
      question: "Can I apply for multiple people at once?",
      answer:
        "Yes, our system allows you to submit applications for multiple family members or a group under a single account. This feature simplifies the process and allows for easy management of all applications.",
    },
  ];

  const toggleFAQ = (id) => {
    setOpenFAQId(openFAQId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-inter">
      {/* Header Section */}
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-white py-12 sm:py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-4 sm:mb-6">
                Your Journey Starts Here: Fast & Secure E-Visa
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-gray-500 mb-6 sm:mb-8 px-4 sm:px-0">
                Apply for your electronic visa online in minutes. We simplify
                the application process, so you can focus on your travel plans.
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 px-4 sm:px-0">
                <Link
                  to="#"
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-indigo-600 text-white font-bold rounded-full hover:bg-indigo-700 transition-colors duration-200 shadow-lg transform hover:scale-105 text-center"
                >
                  Start Application
                </Link>
                <Link
                  to="#"
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 text-indigo-600 font-bold border-2 border-indigo-600 rounded-full hover:bg-indigo-50 transition-colors duration-200 transform hover:scale-105 text-center"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-12 sm:py-16 lg:py-24 bg-gray-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
                How It Works
              </h2>
              <p className="mt-3 sm:mt-4 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4 sm:px-0">
                A simple, 3-step process to get your visa online.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {/* Step 1 */}
              <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg text-center transform hover:scale-105 transition-transform duration-300">
                <div className="flex justify-center mb-4">
                  <svg
                    className="h-12 w-12 sm:h-16 sm:w-16 text-indigo-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                  1. Fill Out the Form
                </h3>
                <p className="text-sm sm:text-base text-gray-600">
                  Provide your details and travel information through our secure
                  online form. It takes just a few minutes.
                </p>
              </div>

              {/* Step 2 */}
              <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg text-center transform hover:scale-105 transition-transform duration-300">
                <div className="flex justify-center mb-4">
                  <svg
                    className="h-12 w-12 sm:h-16 sm:w-16 text-indigo-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                  2. Pay Securely Online
                </h3>
                <p className="text-sm sm:text-base text-gray-600">
                  Complete your payment with our encrypted system. We accept all
                  major credit cards.
                </p>
              </div>

              {/* Step 3 */}
              <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg text-center transform hover:scale-105 transition-transform duration-300 md:col-span-2 lg:col-span-1">
                <div className="flex justify-center mb-4">
                  <svg
                    className="h-12 w-12 sm:h-16 sm:w-16 text-indigo-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 018.382 3.049m-1.414 1.414A9.954 9.954 0 0012 5a9.954 9.954 0 00-7.054 2.969m0 0a9.954 9.954 0 0114.108 0l-1.414 1.414z"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                  3. Receive Your E-Visa
                </h3>
                <p className="text-sm sm:text-base text-gray-600">
                  Your approved e-visa will be sent to your email address within
                  the specified time frame.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 sm:py-16 lg:py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="order-2 lg:order-1">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-4 sm:mb-6">
                  Why Choose Our E-Visa Service?
                </h2>
                <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8">
                  We provide a seamless and reliable platform for all your visa
                  needs. Our service is designed to be fast, secure, and
                  user-friendly.
                </p>
                <ul className="space-y-4 sm:space-y-6">
                  <li className="flex items-start space-x-3 sm:space-x-4">
                    <svg
                      className="h-6 w-6 sm:h-7 sm:w-7 text-green-500 flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    <div>
                      <h4 className="text-lg sm:text-xl font-semibold text-gray-900">
                        Fast Processing
                      </h4>
                      <p className="text-sm sm:text-base text-gray-600 mt-1">
                        Get your visa approved in a fraction of the time
                        compared to traditional methods.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3 sm:space-x-4">
                    <svg
                      className="h-6 w-6 sm:h-7 sm:w-7 text-green-500 flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      ></path>
                    </svg>
                    <div>
                      <h4 className="text-lg sm:text-xl font-semibold text-gray-900">
                        Secure Payments
                      </h4>
                      <p className="text-sm sm:text-base text-gray-600 mt-1">
                        Your personal and payment information is protected with
                        advanced encryption.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3 sm:space-x-4">
                    <svg
                      className="h-6 w-6 sm:h-7 sm:w-7 text-green-500 flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 11-6.364 2.636 8.25 8.25 0 016.364-2.636z"
                      ></path>
                    </svg>
                    <div>
                      <h4 className="text-lg sm:text-xl font-semibold text-gray-900">
                        24/7 Support
                      </h4>
                      <p className="text-sm sm:text-base text-gray-600 mt-1">
                        Our dedicated support team is available around the clock
                        to assist you with any queries.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="order-1 lg:order-2 flex justify-center items-center">
                {/* Placeholder for illustration */}
                <div className="bg-gradient-to-br from-indigo-100 to-purple-100 rounded-3xl w-full max-w-md lg:max-w-lg h-64 sm:h-80 lg:h-96 flex items-center justify-center p-6 sm:p-8">
                  <div className="text-center">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-indigo-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <svg
                        className="w-8 h-8 sm:w-10 sm:h-10 text-indigo-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 2L3 7v11a1 1 0 001 1h3v-6h6v6h3a1 1 0 001-1V7l-7-5z" />
                      </svg>
                    </div>
                    <p className="text-sm sm:text-base text-gray-600 font-semibold">
                      Visa Processing Illustration
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Section with Carousel */}
        <section className="py-12 sm:py-16 lg:py-24 bg-gray-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
                Our Latest Blog Posts
              </h2>
              <p className="mt-3 sm:mt-4 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4 sm:px-0">
                Stay informed with our latest travel tips, visa news, and
                destination guides.
              </p>
            </div>
            <div className="relative">
              <div
                ref={carouselRef}
                className="flex overflow-x-auto gap-4 sm:gap-6 lg:gap-8 pb-4 blog-carousel snap-x snap-mandatory scrollbar-hide px-4 sm:px-0"
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
              >
                {/* Blog Posts */}
                {[
                  {
                    title: "Top 5 Destinations for Your Next Trip",
                    description:
                      "Discover the best places to visit this year and get inspired for your next adventure. We cover everything from vibrant cities to serene nature spots.",
                    imageAlt: "Travel blog post image",
                  },
                  {
                    title: "Essential Tips for a Smooth Visa Application",
                    description:
                      "Learn how to avoid common mistakes and ensure your e-visa application is approved quickly and efficiently. A must-read for all applicants.",
                    imageAlt: "Visa tips blog post image",
                  },
                  {
                    title: "The Ultimate Packing Guide for Your Next Flight",
                    description:
                      "From carry-on essentials to clever packing hacks, this guide will help you prepare for your journey like a pro and save valuable space.",
                    imageAlt: "Packing guide blog post image",
                  },
                  {
                    title: "A Beginner's Guide to Solo Travel",
                    description:
                      "Thinking of traveling alone? Our comprehensive guide offers tips on safety, planning, and making the most of your solo adventure.",
                    imageAlt: "Solo travel blog post image",
                  },
                  {
                    title: "Cultural Etiquette for International Travelers",
                    description:
                      "Respect local customs and traditions by reading our guide to cultural etiquette, ensuring a pleasant experience for everyone.",
                    imageAlt: "Cultural etiquette blog post image",
                  },
                ].map((post, index) => (
                  <div
                    key={index}
                    className="min-w-[calc(100%-2rem)] w-[calc(100%-2rem)] sm:min-w-[320px] sm:w-[320px] md:min-w-[350px] md:w-[350px] bg-white rounded-2xl shadow-lg snap-center transform hover:scale-105 transition-transform duration-300 flex-shrink-0 mx-4 sm:mx-0"
                  >
                    <div className="bg-gray-200 rounded-t-2xl w-full h-48 sm:h-40 flex items-center justify-center">
                      <svg
                        className="w-16 h-16 sm:w-16 sm:h-16 text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="p-4 sm:p-6">
                      <h3 className="text-xl sm:text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 text-sm sm:text-sm mb-4 sm:mb-4 line-clamp-3">
                        {post.description}
                      </p>
                      <Link
                        to="#"
                        className="text-indigo-600 font-semibold hover:underline text-sm"
                      >
                        Read More &rarr;
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation Buttons - Always visible beside the cards */}
              <button
                onClick={() => scrollCarousel("prev")}
                className="absolute left-0 sm:-left-8 top-1/2 -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:scale-110 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 z-10"
              >
                <svg
                  className="w-5 h-5 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 19l-7-7 7-7"
                  ></path>
                </svg>
              </button>
              <button
                onClick={() => scrollCarousel("next")}
                className="absolute right-0 sm:-right-8 top-1/2 -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:scale-110 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 z-10"
              >
                <svg
                  className="w-5 h-5 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  ></path>
                </svg>
              </button>
            </div>

            {/* View More Button */}
            <div className="text-center mt-8 sm:mt-12">
              <Link
                to="#"
                className="inline-flex items-center px-6 py-3 text-indigo-600 font-semibold border-2 border-indigo-600 rounded-full hover:bg-indigo-50 transition-colors duration-200 transform hover:scale-105"
              >
                View More
                <svg
                  className="ml-2 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  ></path>
                </svg>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-24 bg-white">
          <div className="container mx-auto px-8 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                Frequently Asked Questions
              </h2>
              <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                Find answers to the most common questions about our E-Visa
                service.
              </p>
            </div>
            <div className="max-w-3xl mx-auto space-y-4">
              {faqItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden"
                >
                  <button
                    onClick={() => toggleFAQ(item.id)}
                    className="w-full text-left py-4 px-6 focus:outline-none flex justify-between items-center text-gray-900 font-semibold text-lg hover:bg-gray-50 transition-colors"
                  >
                    {item.question}
                    <span className="transition-transform duration-300">
                      {openFAQId === item.id ? (
                        <svg
                          className="w-6 h-6 text-indigo-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M20 12H4"
                          ></path>
                        </svg>
                      ) : (
                        <svg
                          className="w-6 h-6 text-indigo-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 4v16m8-8H4"
                          ></path>
                        </svg>
                      )}
                    </span>
                  </button>
                  <div
                    className={`transition-max-height duration-500 ease-in-out overflow-hidden ${
                      openFAQId === item.id
                        ? "max-h-screen py-4 px-6"
                        : "max-h-0"
                    }`}
                  >
                    <p className="text-gray-600">{item.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-indigo-600 py-12 sm:py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">
              Ready to Travel?
            </h2>
            <p className="text-base sm:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto px-4 sm:px-0">
              Take the first step towards your international trip. Start your
              hassle-free visa application now and get ready for your adventure.
            </p>
            <Link
              to="#"
              className="inline-block px-6 sm:px-8 py-3 bg-white text-indigo-600 font-bold rounded-full hover:bg-gray-100 transition-colors duration-200 shadow-lg transform hover:scale-105"
            >
              Apply for Your E-Visa
            </Link>
          </div>
        </section>
      </main>

      {/* Footer Section */}
      <Footer />
    </div>
  );
};

export default Home;
