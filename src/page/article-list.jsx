import { useEffect, useState } from "react";
import axios from "../axios/axios";
import { Link, useParams } from "react-router-dom";
import { ArticleItem } from "../components/articles/ArticleItem";

export const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const { slug } = useParams();
  const [loading, setLoading] = useState(false);
  const [blog, setBlog] = useState({});
  useEffect(() => {
    const getArticles = async () => {
      setLoading(true);
      const { data } = await axios.get(`/blog/slug/${slug}`);
      if (data.status === "success") {
        await new Promise((data) => setTimeout(data, 1500));
        setBlog(data.data);
        setArticles(data.data.articles);
        setLoading(false);
      }
    };

    getArticles();
    window.scroll(0, 0);
  }, [slug]);
  const handleReturn = () => {
    window.location.href = `/blog`;
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Main Content Area */}
      {loading ? (
        <div className="flex flex-col justify-center items-center h-screen w-full">
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
          <h1 className="mt-4 text-2xl font-bold text-blue-500">In process</h1>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
          {/* Header Section */}
          <button
            className="flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors mb-8"
            onClick={handleReturn}
          >
            <svg
              className="w-5 h-5 mr-1"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Return blog
          </button>
          {articles.length > 0 ? (
            <>
              <header className="mb-10 sm:mb-12">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2">
                  {blog.title}
                </h1>
                <p className="text-base sm:text-lg text-gray-600">
                  {/* {blog.description} */}
                </p>
              </header>

              <div className="flex items-center space-x-4 mb-10 text-sm text-gray-500">
                {/* Avatars */}
                <div className="flex -space-x-2">
                  <div className="w-7 h-7 bg-blue-400 rounded-full border-2 border-white shadow-sm"></div>
                  <div className="w-7 h-7 bg-green-400 rounded-full border-2 border-white shadow-sm"></div>
                  <div className="w-7 h-7 bg-red-400 rounded-full border-2 border-white shadow-sm"></div>
                </div>
                <p className="font-semibold">
                  By <span className="text-gray-900">Victor and 2 others</span>{" "}
                  • 7 articles
                </p>
              </div>

              <div className="bg-white shadow-xl rounded-xl p-4 sm:p-6 border border-gray-100">
                {articles.map((article, index) => (
                  // Border bottom cho mục cuối cùng bị ẩn bằng cách thêm border-b-0
                  <div
                    key={index}
                    className={
                      index === article.length - 1 ? "border-b-0" : "border-b"
                    }
                  >
                    <Link to={`/blog/article/${article.slug}`}>
                      <ArticleItem title={article.title} index={index} />
                    </Link>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <h2 className="text-center text-lg font-bold">No Article</h2>
          )}
        </div>
      )}
    </div>
  );
};
