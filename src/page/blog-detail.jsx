import { useEffect, useState } from "react";
import axios from "../axios/axios";
import { RelatedBlog } from "../components/blog/RelatedBlog";
import { useParams } from "react-router-dom";

export const BlogDetail = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the detailed article content when the component mounts or ID changes
  useEffect(() => {
    const loadArticle = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await axios.get(`/article/slug/${slug}`); // Use the API simulation function
        if (data.status === "success") {
          await new Promise((data) => setTimeout(data, 1500));
          setArticle(data.data);
        }
      } catch (err) {
        setError("Cannot load post. Please try again");
      } finally {
        setLoading(false);
      }
    };
    loadArticle();
  }, [slug]); // Dependency on articleId

  // Component to render individual content blocks
  const renderContentBlock = (block, index) => {
    switch (block.type) {
      case "heading":
        return (
          <h2
            key={index}
            className="text-3xl font-bold text-gray-800 mt-8 mb-4 border-l-4 border-blue-500 pl-4"
          >
            {block.text}
          </h2>
        );
      case "paragraph":
        return (
          <p key={index} className="text-lg text-gray-700 leading-relaxed mb-6">
            {block.text}
          </p>
        );
      case "list":
        return (
          <ul
            key={index}
            className="list-disc list-inside space-y-2 mb-6 ml-4 text-gray-700"
          >
            {block.items.map((item, i) => (
              <li key={i} dangerouslySetInnerHTML={{ __html: item }}></li>
            ))}
          </ul>
        );
      case "quote":
        return (
          <blockquote
            key={index}
            className="border-l-4 border-green-500 pl-4 py-3 my-6 bg-gray-50 italic text-xl text-gray-600 rounded-r-lg"
          >
            {block.text}
          </blockquote>
        );
      case "image":
        return (
          <figure key={index} className="my-8">
            <img
              src={block.url}
              alt={block.caption || "Hình ảnh minh họa"}
              className="w-full h-auto object-cover rounded-xl shadow-md"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://placehold.co/1200x500/b3c4f7/1f2937/png?text=Article+Image";
              }}
            />
            {block.caption && (
              <figcaption className="mt-2 text-center text-sm text-gray-500">
                {block.caption}
              </figcaption>
            )}
          </figure>
        );
      case "callout":
        const styleClasses =
          block.style === "warning"
            ? "bg-red-50 border-red-500 text-red-800"
            : "bg-blue-50 border-blue-500 text-blue-800";
        return (
          <div
            key={index}
            className={`p-4 border-l-4 rounded-r-md my-6 font-medium ${styleClasses}`}
          >
            {block.text}
          </div>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="flex items-center space-x-2 text-blue-600">
          <svg
            className="animate-spin h-6 w-6"
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
          <span>Post loading...</span>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen flex justify-center items-center text-center p-8">
        <div className="text-red-600">
          <h2 className="text-2xl font-bold mb-4">Error</h2>
          <p className="mb-6">{error || "Article not found."}</p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors">
            Return blog
          </button>
        </div>
      </div>
    );
  }

  const handleReturn = () => {
    window.location.href = "/blog";
  };

  // Find category info for badge styl

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Back Link */}
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

        {/* Article Header */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
          {article.title}
        </h1>

        <img
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-auto object-cover rounded-xl shadow-lg mb-8"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://placehold.co/1200x500/b3c4f7/1f2937/png?text=Article+Image";
          }}
        />

        {/* Article Content */}
        <div className="prose max-w-none">
          {article.content.map(renderContentBlock)}
        </div>
        <RelatedBlog />
      </div>
    </div>
  );
};
