import { useEffect, useState } from "react";
import axios from "../axios/axios";
import { Link } from "react-router-dom";

export function Blog() {
  const [searchTerm, setSearchTerm] = useState("");
  const [blog, setBlog] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getBlog = async () => {
      setLoading(true);
      const { data } = await axios.get("/blog");
      if (data.status === "success") {
        await new Promise((data) => setTimeout(data, 1000));
        setBlog(data.data);
        setLoading(false);
      }
    };

    getBlog();
    window.scroll(0, 0);
  }, []);

  const filteredCategories = blog.filter(
    (category) =>
      category.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <>
      <div className="min-h-screen bg-gray-100">
        <header className="py-24 bg-[url('https://wallpapercave.com/wp/wp4144066.jpg')] bg-cover bg-center text-white text-center shadow-lg mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog</h1>
          <p className="text-lg">
            Find answers and guides on all things visa and travel.
          </p>
          <div className="mt-6 flex justify-center">
            <div className="relative w-full max-w-xl">
              <input
                type="text"
                placeholder="Search for articles..."
                className="w-full px-6 py-3 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 shadow-md"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg
                className="absolute right-6 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
          </div>
        </header>

        <main className="container mx-auto p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredCategories.map((category) => (
              <div
                key={category.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-200 hover:scale-105 cursor-pointer"
              >
                <Link to={`/blog/${category.slug}`}>
                  <img
                    src={category.cover_image}
                    alt={category.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {category.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {category.description}
                    </p>
                    <div className="flex items-center text-gray-500 text-xs font-medium"></div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </main>
        {loading && (
          <div className="flex flex-col items-center justify-center">
            {/* SVG spinner animation */}
            <svg
              className="animate-spin h-12 w-12 text-blue-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <h1 className="mt-4 text-2xl font-bold text-blue-500">
              In process
            </h1>
          </div>
        )}
      </div>
    </>
  );
}
