import { useEffect, useState } from "react";
import axios from "../../axios/axios";
import { ReviewRow } from "../ReviewRow";

export function Step3({ handlePrevStep, formData, totalFee, visaId }) {
  const [isLoading, setIsLoading] = useState(false);
  const [visa, setVisa] = useState({});

  useEffect(() => {
    const getVisa = async () => {
      setIsLoading(true);
      const { data } = await axios.get(`/visa/${visaId}`);
      if (data.status === "success") {
        setVisa(data.data);
        setIsLoading(false);
        window.scrollTo(0, 0);
      }
    };
    getVisa();
  }, [visaId]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const getProcessingTimeLabel = (time) => {
    switch (time) {
      case "standard":
        return "Standard (3-5 working days)";
      case "urgent":
        return "Urgent (2 working days)";
      case "super_urgent":
        return "Super Urgent (1 working day)";
      default:
        return time;
    }
  };

  // Hàm định dạng loại visa
  const getVisaTypeLabel = (type) => {
    switch (type) {
      case "single":
        return "Single Entry";
      case "multiple":
        return "Multiple Entry";
      default:
        return type;
    }
  };

  // Hàm định dạng thời hạn visa
  const getVisaTimeLabel = (time) => {
    switch (time) {
      case "1_month":
        return "1 Month";
      case "3_month":
        return "3 Months";
      default:
        return time;
    }
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const paymentUrl = await axios.get(
        `/payment/checkout/?amount=${totalFee + 200000}&orderInfo=${
          visa.public_id
        }`
      );
      const { status, data } = paymentUrl.data;
      if (status === "success") {
        setTimeout(() => {
          setIsLoading(false);
          window.location.href = data.url;
        }, 2000);
      }
    } catch (error) {
      console.error("Payment submission failed:", error);
      setIsLoading(false);
      // alert("There was an error processing your request. Please try again.");
    }
  };

  return (
    <div className="mx-auto">
      <section className="bg-white antialiased md:pb-8">
        <div className="mx-auto max-w-screen-xl 2xl:px-0">
          <div className="mx-auto">
            <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12">
              <div className="mt-6 grow sm:mt-8 lg:mt-0 space-y-8">
                {/* 1. REVIEW DỊCH VỤ VISA */}
                <div className="rounded-lg border border-gray-100 bg-gray-50 p-6">
                  <h2 className="text-xl font-bold mb-4">
                    Visa Service Detail
                  </h2>
                  <div className="space-y-2">
                    <ReviewRow label="Visa Code" value={visa.public_id} />
                    <ReviewRow
                      label="Nationality"
                      value={formData.step1.nationality}
                    />
                    <ReviewRow
                      label="Visa Type"
                      value={getVisaTypeLabel(formData.step1.visaType)}
                    />
                    <ReviewRow
                      label="Visa Time"
                      value={getVisaTimeLabel(formData.step1.visaTime)}
                    />
                    <ReviewRow
                      label="Processing Time"
                      value={getProcessingTimeLabel(
                        formData.step1.processingTime
                      )}
                    />
                    <ReviewRow
                      label="Purpose of Visit"
                      value={formData.step1.purpose}
                    />
                    <ReviewRow
                      label="Number of Applicants"
                      value={`${formData.applicants.length}`}
                    />
                  </div>
                </div>

                {/* 2. REVIEW CONTACT DETAIL */}
                <div className="rounded-lg border border-gray-100 bg-gray-50 p-6">
                  <h2 className="text-xl font-bold mb-4">
                    Contact & Arrival Detail
                  </h2>
                  <div className="space-y-2">
                    <ReviewRow
                      label="Date of Arrival"
                      value={formData.info.arrival_date}
                    />
                    <ReviewRow
                      label="Arrival Border"
                      value={formData.info.arrival_border}
                    />
                    <ReviewRow
                      label="Full Name (Contact)"
                      value={`${formData.info.first_name} ${formData.info.last_name}`}
                    />
                    <ReviewRow
                      label="Email Address"
                      value={formData.info.email}
                    />
                    <ReviewRow
                      label="Phone Number"
                      value={`(${formData.info.country_code}) ${formData.info.phone_number}`}
                    />

                    {/* EMERGENCY CONTACT */}
                    <h3 className="pt-4 font-semibold text-gray-700">
                      Emergency Contact
                    </h3>
                    <ReviewRow
                      label="Emergency Name"
                      value={formData.info.emergency_name}
                    />
                    <ReviewRow
                      label="Relationship"
                      value={formData.info.emergency_relationship}
                    />
                    <ReviewRow
                      label="Emergency Phone"
                      value={`(${formData.info.emergency_country_code}) ${formData.info.emergency_phone_number}`}
                    />
                  </div>
                </div>

                {/* 3. REVIEW APPLICANT DETAILS (Dạng danh sách) */}
                <div className="rounded-lg border border-gray-100 bg-gray-50 p-6">
                  <h2 className="text-xl font-bold mb-4">Applicant Details</h2>
                  <div className="space-y-4">
                    {formData.applicants.map((applicant, index) => (
                      <div
                        key={applicant.id}
                        className="border-b pb-4 last:border-b-0 last:pb-0"
                      >
                        <h4 className="font-bold text-gray-800">
                          Applicant {index + 1}
                        </h4>
                        <ReviewRow
                          label="Passport Full Name"
                          value={applicant.passport_name}
                        />
                        <ReviewRow
                          label="Passport Number"
                          value={applicant.passport_number}
                        />
                        <ReviewRow label="Gender" value={applicant.gender} />
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4. TỔNG CỘNG PHÍ */}
                <div className="rounded-lg border border-gray-100 bg-gray-50 p-6">
                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-bold text-gray-900">
                      Total Fee to Pay
                    </dt>
                    <dd className="text-xl font-extrabold text-indigo-600">
                      {formatCurrency(totalFee)}
                    </dd>
                  </dl>
                </div>
              </div>
              <form
                onSubmit={handlePaymentSubmit}
                className="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6 lg:max-w-xl lg:p-8 lg:sticky lg:top-20 lg:self-start mt-8 sm:mt-0"
              >
                <h2 className="text-2xl font-semibold mb-6">3. Payment</h2>
                <div className="mb-6">
                  <p className="text-gray-600 mb-4">
                    Please confirm all information is correct before proceeding
                    to payment.
                  </p>
                  <button
                    type="submit" // Đổi sang type submit
                    disabled={isLoading}
                    className="flex w-full items-center justify-center rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-colors duration-200"
                  >
                    {isLoading
                      ? "Processing..."
                      : `Proceed to Pay ${formatCurrency(totalFee)}`}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={handlePrevStep}
            className="sm:px-6 sm:py-3 px-5 py-2 text-gray-600 font-semibold rounded-full border border-gray-400 hover:bg-gray-200 transition-colors duration-200"
          >
            Back
          </button>
        </div>
      </section>
      <div className=" mt-8 sm:m-0 p-4 bg-yellow-50 border-l-4 border-yellow-400">
        <p className="text-yellow-700 font-semibold">
          Notice: After payment successful, you will received an email includes
          your information and visa. When your visa applied by consulate at
          VietNam, we will be sent your visa via your email provide.
        </p>
      </div>
    </div>
  );
}
