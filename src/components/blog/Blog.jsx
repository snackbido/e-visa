import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../axios/axios";

export function BlogCard() {
  const carouselRef = useRef(null);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const getArticles = async () => {
      const { data } = await axios.get("/article/latest/blog");
      if (data.status === "success") {
        setArticles(data.data);
      }
    };
    getArticles();
  }, []);

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

  return (
    <section id="blog" className="py-12 sm:py-16 lg:py-24 bg-gray-100">
      <div className="container mx-auto px-4 sm:px-8 lg:px-8">
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
            {articles
              .filter((e) => e.blog.title.toLowerCase() === "about visa")
              .slice(0, 5)
              .map((post, index) => (
                <div
                  key={index}
                  className="min-w-[calc(100%-2rem)] w-[calc(100%-2rem)] md:min-w-[350px] md:w-[350px] bg-white rounded-2xl shadow-lg snap-center transform hover:scale-105 transition-transform duration-300 flex-shrink-0 mx-4 sm:mx-0"
                >
                  <div className="bg-gray-200 rounded-t-2xl  h-48 sm:h-40 flex items-center justify-center">
                    <img
                      src={post.image_url}
                      alt=""
                      className="w-full h-full"
                    />
                  </div>
                  <div className="p-4 sm:p-6">
                    <h3 className="text-xl sm:text-xl font-bold text-gray-900 mb-3 line-clamp-1">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm sm:text-sm mb-4 sm:mb-4 line-clamp-2">
                      {post.description}
                    </p>
                    <Link
                      to={`/blog/article/${post.slug}`}
                      className="text-custom font-semibold hover:underline text-sm"
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
            className="absolute left-0 sm:-left-8 top-1/2 -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:scale-110 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-custom z-10"
          >
            <svg
              className="w-5 h-5 text-custom"
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
            className="absolute right-0 sm:-right-8 top-1/2 -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:scale-110 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-custom z-10"
          >
            <svg
              className="w-5 h-5 text-custom"
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
            to="/blog"
            className="inline-flex items-center px-6 py-3 text-custom font-semibold border-2 border-custom rounded-full hover:bg-custom hover:text-white transition-colors duration-200 transform hover:scale-105"
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
  );
}
