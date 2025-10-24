export const SectionHeader = ({ title, subtitle, isVOA = false }) => {
  console.log(title, subtitle, isVOA);

  return (
    <div
      className={`mb-6 p-4 rounded-lg ${
        isVOA ? "bg-amber-50 border-amber-300" : "bg-blue-50 border-blue-300"
      } border-l-4`}
    >
      <h2
        className={`text-2xl font-extrabold ${
          isVOA ? "text-amber-800" : "text-blue-800"
        } mb-1`}
      >
        {title}
      </h2>
      <p className="text-gray-600">{subtitle}</p>
    </div>
  );
};
