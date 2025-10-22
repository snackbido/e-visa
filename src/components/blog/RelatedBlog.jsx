import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../axios/axios";

export const RelatedBlog = () => {
  const [suggestionsArticles, setSuggestionArticles] = useState([]);

  const shuffleArticle = (data) => {
    const shuffled = [...data]; // copy original array
    for (let i = data.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // random index
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // swap
    }
    return shuffled.slice(0, 3);
  };

  useEffect(() => {
    const getSuggestBlog = async () => {
      const { data } = await axios.get("/article");
      if (data.status === "success") {
        const articles = shuffleArticle(data.data);
        setSuggestionArticles(articles);
      }
    };
    getSuggestBlog();
  }, []);

  return (
    <div className="mt-16 pt-8 border-t border-gray-200">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 border-l-4 border-yellow-500 pl-4">
        Related Articles
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {suggestionsArticles.map((article) => (
          <Link
            to={`/blog/article/${article.slug}`}
            key={article.slug}
            className="block group rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white border border-gray-100"
          >
            <div className="p-4">
              <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-blue-100 text-blue-800 mb-2">
                {article.blog.title}
              </span>
              <h3 className="text-base font-semibold text-gray-900 group-hover:text-blue-600 line-clamp-2">
                {article.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
