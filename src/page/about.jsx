export const About = () => {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-gray-800 mb-3">
            About Us
          </h1>
          <p className="text-xl text-blue-600 font-medium">
            Simplifying Your Global Visa Journey
          </p>
        </div>

        {/* Section 1: Our Mission */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 mb-12">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl font-bold text-gray-800 mb-4 border-l-4 border-blue-600 pl-3">
                Our Mission
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                E-Visa was founded with the mission of simplifying the complex
                visa application process. We believe that traveling and
                exploring the world should not be hindered by complicated
                paperwork.
              </p>
              <p className="text-gray-700 leading-relaxed">
                We provide a **fast, secure, and user-friendly** online platform
                that helps you fulfill all e-visa requirements from anywhere in
                the world. Our goal is to provide absolute peace of mind to
                every customer before their trip.
              </p>
            </div>
            <div className="order-1 md:order-2">
              <img
                src="https://placehold.co/600x400/80a0ff/ffffff/png?text=Our+Mission"
                alt="Our Mission"
                className="w-full h-auto rounded-xl shadow-xl object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://placehold.co/600x400/80a0ff/ffffff/png?text=Our+Mission";
                }}
              />
            </div>
          </div>
        </div>

        {/* Section 2: Why Choose Us */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-blue-600 mb-8">
            Why Choose E-Visa?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-red-500 transform hover:scale-105 transition-all duration-300">
              <div className="text-4xl mb-3 text-red-500">⏱</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Processing Speed
              </h3>
              <p className="text-sm text-gray-600">
                Fast processing, typically within 24-48 hours.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-green-500 transform hover:scale-105 transition-all duration-300">
              <div className="text-4xl mb-3 text-green-500">🛡</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Absolute Security
              </h3>
              <p className="text-sm text-gray-600">
                Personal data is strictly encrypted and secured.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-yellow-500 transform hover:scale-105 transition-all duration-300">
              <div className="text-4xl mb-3 text-yellow-500">🌍</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Global Coverage
              </h3>
              <p className="text-sm text-gray-600">
                Support for visa applications to over 100 countries worldwide.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-purple-500 transform hover:scale-105 transition-all duration-300">
              <div className="text-4xl mb-3 text-purple-500">📞</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                24/7 Support
              </h3>
              <p className="text-sm text-gray-600">
                Our team of experts is always ready to assist you 24/7.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: Call to Action */}
        <div className="bg-blue-100 border-l-8 border-blue-600 p-8 rounded-xl text-center shadow-lg">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Ready for your next trip?
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Start your journey today with E-Visa!
          </p>
          <button className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-blue-700 transition-colors shadow-md">
            Start Application
          </button>
        </div>
      </div>
    </div>
  );
};
