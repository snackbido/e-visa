export const RequirementBox = ({
  icon,
  title,
  description,
  bgColor,
  iconColor,
}) => (
  <div
    className={`p-6 ${bgColor} rounded-xl shadow-md border-l-4 border-indigo-400`}
  >
    <div className="flex items-center mb-3">
      <span className={`text-3xl mr-3 ${iconColor}`}>{icon}</span>
      <h3 className="font-bold text-lg text-gray-800">{title}</h3>
    </div>
    <p
      className="text-sm text-gray-600"
      dangerouslySetInnerHTML={{ __html: description }}
    ></p>
  </div>
);
