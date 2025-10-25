export const VisaCard = ({ option }) => (
  <div
    className={`p-4 rounded-xl border-l-4 transition duration-300 hover:shadow-2xl ${option.color} flex flex-col h-full transform hover:scale-[1.01]`}
  >
    <div className="flex items-center mb-4">
      <span className="text-3xl mr-3">{option.icon}</span>
      <h3 className="text-xl font-bold text-gray-900">{option.title}</h3>
    </div>
    <p className="text-lg font-semibold text-gray-700 mb-4">
      {option.duration}
    </p>

    <div className="flex-grow">
      <h4 className="font-semibold text-gray-700 mt-2 text-sm uppercase tracking-wider">
        Pros:
      </h4>
      <ul className="list-disc list-inside ml-4 text-sm text-gray-600 space-y-1">
        {option.pros.map((pro, index) => (
          <li key={index}>{pro}</li>
        ))}
      </ul>
      <h4 className="font-semibold text-gray-700 mt-4 text-sm uppercase tracking-wider">
        Cons:
      </h4>
      <ul className="list-disc list-inside ml-4 text-sm text-gray-600 mb-6 space-y-1">
        {option.cons.map((con, index) => (
          <li key={index} className="text-red-600">
            {con}
          </li>
        ))}
      </ul>
    </div>

    <a
      href={option.link}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-auto text-sm font-medium text-center py-3 px-4 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition duration-150 shadow-md hover:shadow-lg"
    >
      {option.linkText}
    </a>
  </div>
);
