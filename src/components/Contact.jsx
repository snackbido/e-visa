import { CreditCard, HandCoins, PlaneLanding } from "lucide-react";

export const ContactSection = () => (
  <div className="bg-white p-6 rounded-xl border border-gray-200">
    <h2 className="text-xl font-extrabold text-gray-900 mb-4">Contact us!</h2>
    <div className="space-y-3">
      <div className="flex items-center">
        {/* Giả sử bạn thay thế Phone bằng icon thực tế của bạn nếu khác */}
        <PlaneLanding className="w-5 h-5 text-blue-600 mr-3" />
        <a
          href="tel:+84946583583"
          className="text-blue-600 hover:underline font-medium"
        >
          +84. 946.583.583
        </a>
      </div>
      <div className="flex items-center">
        {/* Giả sử bạn thay thế Mail bằng icon thực tế của bạn nếu khác */}
        <CreditCard className="w-5 h-5 text-blue-600 mr-3" />
        <a
          href="mailto:support@vietnam-visa.com"
          className="text-blue-600 hover:underline font-medium"
        >
          support@vietnam-visa.com
        </a>
      </div>
      <div className="flex items-center text-gray-600">
        {/* Giả sử bạn thay thế Clock bằng icon thực tế của bạn nếu khác */}
        <HandCoins className="w-5 h-5 text-blue-600 mr-3" />
        <span>Fri Oct 24 2025, 14:06:21 (GMT+7)</span>
      </div>
    </div>
  </div>
);
