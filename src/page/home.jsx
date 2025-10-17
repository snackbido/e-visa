import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BlogCard } from "../components/blog/Blog";

const Home = () => {
  const [openFAQId, setOpenFAQId] = useState(null);

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
      <main>
        <section className="py-12 sm:py-16 lg:py-24 bg-[url(https://images.pexels.com/photos/1831271/pexels-photo-1831271.jpeg)] bg-center">
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
                  to="/apply-visa"
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-custom text-white font-bold rounded-full hover:bg-custom transition-colors duration-200 shadow-lg transform hover:scale-105 text-center"
                >
                  Start Application
                </Link>
                <Link
                  to="/blog"
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 text-custom font-bold border-2 border-custom rounded-full hover:bg-custom transition-colors duration-200 transform hover:scale-105 text-center"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="howitwork" className="py-12 sm:py-16 lg:py-24">
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
                    className="h-12 w-12 sm:h-16 sm:w-16 text-custom-600"
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
                    className="h-12 w-12 sm:h-16 sm:w-16 text-custom-600"
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
                    className="h-12 w-12 sm:h-16 sm:w-16 text-custom-600"
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
                <div className="bg-[url(https://www.kwalterconsulting.com/img/insurance/travel/19998723-travel-and-vacation-accessories-top-view-xxl.png)] bg-center from-custom-100 to-purple-100 rounded-3xl w-full max-w-md lg:max-w-lg h-64 sm:h-80 lg:h-96 flex items-center justify-center p-6 sm:p-8">
                  <div className="text-center"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Section with Carousel */}
        <BlogCard />

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
                          className="w-6 h-6 text-custom"
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
                          className="w-6 h-6 text-custom"
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
        <section id="cta" className="bg-custom py-12 sm:py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">
              Ready to Travel?
            </h2>
            <p className="text-base sm:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto px-4 sm:px-0">
              Take the first step towards your international trip. Start your
              hassle-free visa application now and get ready for your adventure.
            </p>
            <Link
              to="/apply-visa"
              className="inline-block px-6 sm:px-8 py-3 bg-white text-custom font-bold rounded-full hover:bg-gray-100 transition-colors duration-200 shadow-lg transform hover:scale-105"
            >
              Apply for Your E-Visa
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
