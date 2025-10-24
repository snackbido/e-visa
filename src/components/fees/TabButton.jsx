export const TabButton = ({
  id,
  label,
  icon: Icon,
  setActiveTab,
  activeTab,
}) => {
  return (
    <button
      className={`py-3 px-6 text-center font-semibold rounded-t-lg transition-all duration-200 flex items-center justify-center space-x-2 ${
        activeTab === id
          ? "bg-white text-indigo-700 border-b-4 border-indigo-500 shadow-t-md"
          : "bg-white text-gray-600 hover:bg-gray-200"
      }`}
      onClick={() => setActiveTab(id)}
    >
      <Icon className="w-5 h-5" />
      <span>{label}</span>
    </button>
  );
};
