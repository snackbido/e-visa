import { CheckCircle } from "lucide-react"; // Giả sử bạn đang dùng lucide-react hoặc icon set tương tự

export const WhyApplySection = () => (
  <div className="bg-white p-6 rounded-xl border border-gray-200">
    <h2 className="text-xl font-extrabold text-gray-900 mb-4">
      Why apply with us?
    </h2>
    <ul className="space-y-3">
      <li className="flex items-start text-gray-700">
        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
        Expert consultation.
      </li>
      <li className="flex items-start text-gray-700">
        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
        Free Initial Assessment.
      </li>
      <li className="flex items-start text-gray-700">
        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
        24/7 support.
      </li>
      <li className="flex items-start text-gray-700">
        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
        Transparency in procedure and fees.
      </li>
      <li className="flex items-start text-gray-700">
        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
        Timely delivery guaranteed.
      </li>
    </ul>
  </div>
);
