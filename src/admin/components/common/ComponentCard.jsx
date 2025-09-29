import { Download, Save } from "lucide-react";

const ComponentCard = ({
  title,
  children,
  handleDownload,
  handleChangeStatus,
  type,
  className = "",
  desc = "",
}) => {
  return (
    <div className={`rounded-2xl border border-gray-200 bg-white ${className}`}>
      {/* Card Header */}
      <div className="px-6 py-5 flex items-center justify-between">
        <h3 className="text-base font-medium text-gray-800">{title}</h3>
        {desc && <p className="mt-1 text-sm text-gray-500">{desc}</p>}
        {type === "visa" && (
          <div className="flex">
            <button
              onClick={handleChangeStatus}
              className="p-2 mr-2 text-sm sm:text-base items-center flex bg-blue-500 rounded-lg text-white"
            >
              Save
              <Save className="ml-2" />
            </button>
            <button
              className="p-2 flex text-sm sm:text-base bg-green-500 items-center rounded-xl text-white"
              onClick={handleDownload}
            >
              Download CSV
              <Download className="ml-1" />
            </button>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-4 border-t border-gray-100 sm:p-6">
        <div className="space-y-6">{children}</div>
      </div>
    </div>
  );
};

export default ComponentCard;
