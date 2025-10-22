import { ArrowRight } from "lucide-react";

export const ArticleItem = ({ title, index, handleSelectArticle }) => {
  return (
    <div
      className="flex justify-between items-center py-4 border-b border-gray-200 cursor-pointer transition duration-150 hover:bg-green-50/50"
      onClick={() => handleSelectArticle(index)}
    >
      <p className="text-gray-700 font-medium text-base sm:text-lg">{title}</p>
      {/* Icon Arrow Right */}
      <ArrowRight className="w-5 h-5 text-green-500 group-hover:text-green-700 transition" />
    </div>
  );
};
