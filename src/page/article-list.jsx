export const ArticleList = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Main Content Area */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        {/* Header Section */}
        <header className="mb-10 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2">
            About iVisa
          </h1>
          <p className="text-base sm:text-lg text-gray-600">
            Find out about our services and policies, and get basic info on
            visas and travel documents.
          </p>
        </header>

        {/* Author Info Section */}
        <div className="flex items-center space-x-4 mb-10 text-sm text-gray-500">
          {/* Avatars */}
          <div className="flex -space-x-2">
            <div className="w-7 h-7 bg-blue-400 rounded-full border-2 border-white shadow-sm"></div>
            <div className="w-7 h-7 bg-green-400 rounded-full border-2 border-white shadow-sm"></div>
            <div className="w-7 h-7 bg-red-400 rounded-full border-2 border-white shadow-sm"></div>
          </div>
          <p className="font-semibold">
            By <span className="text-gray-900">Victor and 2 others</span> • 7
            articles
          </p>
        </div>

        {/* Article List Container (FAQ Style) */}
        <div className="bg-white shadow-xl rounded-xl p-4 sm:p-6 border border-gray-100">
          {articlesData.map((article, index) => (
            // Border bottom cho mục cuối cùng bị ẩn bằng cách thêm border-b-0
            <div
              key={index}
              className={
                index === articlesData.length - 1 ? "border-b-0" : "border-b"
              }
            >
              <ArticleItem
                title={article}
                index={index}
                handleSelectArticle={handleSelectArticle}
              />
            </div>
          ))}
        </div>

        {/* Footer Logo */}
        <footer className="mt-20 flex justify-center">
          <div className="flex items-center text-green-600 font-extrabold text-4xl tracking-widest">
            <span className="text-5xl font-light mr-1">✓</span> IVISA
          </div>
        </footer>
      </div>
    </div>
  );
};
