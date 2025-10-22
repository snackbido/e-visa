import { useEffect, useState } from "react";
import axios from "../axios/axios";
import { Link } from "react-router-dom";

export function Blog() {
  const [searchTerm, setSearchTerm] = useState("");
  const [blog, setBlog] = useState([]);

  useEffect(() => {
    const getBlog = async () => {
      const { data } = await axios.get("/blog");
      if (data.status === "success") {
        await new Promise((data) => setTimeout(data, 1500));
        setBlog(data.data);
      }
    };

    getBlog();
  }, []);

  const filteredCategories = blog.filter(
    (category) =>
      category.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <>
      <div className="min-h-screen bg-gray-100 p-8">
        <header className="py-12 bg-[url('https://placehold.co/1920x400/b3c4f7/ffffff/png?text=Blog+Background')] bg-cover bg-center text-white text-center rounded-xl shadow-lg mb-8">
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

        <main className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredCategories.map((category) => (
              <div
                key={category.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-200 hover:scale-105 cursor-pointer"
              >
                <Link to={"/"}>
                  <img
                    src={category.imageUrl}
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
            {filteredCategories.length === 0 && (
              <p className="text-center text-gray-500 col-span-full">
                No articles found.
              </p>
            )}
          </div>
        </main>
      </div>
    </>
  );
}
