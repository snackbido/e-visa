export const FeeCard = ({
  title,
  fee,
  icon: Icon,
  description,
  bgColor = "bg-indigo-50",
  note,
  isVOA = false,
}) => (
  <div
    className={`p-6 border-b-4 ${
      isVOA ? "border-amber-400" : "border-blue-400"
    } rounded-xl shadow-lg ${bgColor} transform hover:scale-[1.02] transition duration-300 ease-in-out`}
  >
    <div className="flex justify-between items-start mb-4">
      <h3 className="text-xl font-bold text-gray-800">{title}</h3>
      <Icon
        className={`w-8 h-8 ${isVOA ? "text-amber-600" : "text-blue-600"}`}
      />
    </div>
    <p className="text-4xl font-extrabold text-gray-900 mb-2">${fee}</p>
    <p className="text-sm text-gray-600 mb-4">{description}</p>
    {note && (
      <p className="text-xs text-gray-500 italic border-t pt-2 mt-2">{note}</p>
    )}
  </div>
);
