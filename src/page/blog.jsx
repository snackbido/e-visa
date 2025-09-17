import { useState } from "react";

export function Blog() {
  const blogCategories = [
    {
      id: 1,
      title: "About iVisa",
      description:
        "Find out about our services and policies, and get basic info on visas and travel documents.",
      authors: ["DJ", "NC"],
      articles: 7,
      imageUrl:
        "https://placehold.co/400x250/b3c4f7/ffffff/png?text=iVisa+Info",
    },
    {
      id: 2,
      title: "How to apply",
      description:
        "Read our step-by-step guides for completing your application.",
      authors: ["DJ", "NC", "VJ"],
      articles: 16,
      imageUrl:
        "https://placehold.co/400x250/c3b1e7/ffffff/png?text=How+to+Apply",
    },
    {
      id: 3,
      title: "Other Products",
      description:
        "Learn about our other products, like health declarations and passport renewals.",
      authors: ["VJ"],
      articles: 2,
      imageUrl:
        "https://placehold.co/400x250/a395c8/ffffff/png?text=Other+Products",
    },
    {
      id: 4,
      title: "Account Management",
      description:
        "Learn how to manage your account, subscriptions, and orders through our website.",
      authors: ["DJ", "VJ", "NC"],
      articles: 10,
      imageUrl:
        "https://placehold.co/400x250/b8b8d1/ffffff/png?text=Account+Management",
    },
  ];
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCategories = blogCategories.filter(
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
                  <div className="flex items-center text-gray-500 text-xs font-medium">
                    <span className="flex items-center mr-4">
                      <svg
                        className="h-4 w-4 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 9a3 3 0 100-6 3 3 0 000 6zM10 12a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                      </svg>
                      {category.authors.length}{" "}
                      {category.authors.length > 1 ? "authors" : "author"}
                    </span>
                    <span className="flex items-center">
                      <svg
                        className="h-4 w-4 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm12 1.5a.5.5 0 01.5.5v3a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zM4 6a1 1 0 011-1h10a1 1 0 011 1v2H4V6zm11 5a.5.5 0 01.5.5v3a.5.5 0 01-1 0V11a.5.5 0 01.5-.5z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      {category.articles}{" "}
                      {category.articles > 1 ? "articles" : "article"}
                    </span>
                  </div>
                </div>
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
