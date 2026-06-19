import { useEffect, useState } from "react";
import { Step1 } from "../components/form/Step1";
import { Step2 } from "../components/form/Step2";
import { Step3 } from "../components/form/Step3";
import countries from "../data.json";
import { toast } from "react-toastify";
import axios from "axios";
import { createVisa, updateVisa } from "../services/visa";

export function ApplyVisa({ user }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [visaId, setVisaId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [totalFee, setTotalFee] = useState(0);
  const [formData, setFormData] = useState({
    step1: {
      nationality: "",
      visaTime: "",
      visaType: "",
      processingTime: "",
      purpose: "",
    },
    applicants: [
      {
        id: 1,
        passport_name: "",
        passport_number: "",
        gender: "",
        avatar: null,
        passport_image: null,
        previewAvatar: null,
        previewPassport: null,
      },
    ],
    info: {
      email: "",
      first_name: "",
      last_name: "",
      phone_number: "",
      country_code: "",
      arrival_date: "",
      arrival_border: "",
      emergency_name: "",
      emergency_phone_number: "",
      emergency_relationship: "",
      emergency_country_code: "",
    },
  });
  const [exchangeRateUSD, setExchangeRateUSD] = useState(0);

  const handleCountries = () => {
    const result = Object.values(countries)
      .map((country) => {
        return {
          name: country.name,
          code: country.alpha2Code,
          dialCode: "+" + country.callingCodes[0],
          flag: country.flag || "",
        };
      })
      .sort((a, b) => a.name.localeCompare(b.name));
    return result;
  };
  const data = handleCountries();

  // calculate fee
  const FEES = {
    base: 65,
    visaType: {
      single: 0,
      multiple: 20,
    },
    processingTime: {
      standard: 0,
      express: 25,
      superExpress: 50,
    },
  };

  const convertDate = (date) => {
    const d = new Date(date);
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const year = d.getFullYear();
    return [year, month, day].join("-");
  };

  useEffect(() => {
    const handleHashChange = () => {
      const stepFromHash = window.location.hash.replace("#step=", "");
      const step = parseInt(stepFromHash, 10);
      if (step >= 1 && step <= 3) {
        setCurrentStep(step);
      } else {
        setCurrentStep(1);
        window.location.hash = "step=1";
      }
    };

    const getExchangeRate = async () => {
      const date = convertDate(new Date());
      const response = await axios({
        method: "GET",
        url: `https://www.vietcombank.com.vn/api/exchangerates?date=${date}`,
      });
      setExchangeRateUSD(response.data.Data[0].transfer);
    };

    window.addEventListener("hashchange", handleHashChange);
    handleHashChange();
    getExchangeRate();

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  // Recalculate fee whenever form data changes
  useEffect(() => {
    const calculateFee = () => {
      const { step1, applicants } = formData;
      const numApplicants = applicants.length;
      let fee = FEES.base * numApplicants;

      if (step1.visaType) {
        fee += FEES.visaType[step1.visaType] || 0;
      }
      if (step1.processingTime) {
        fee += FEES.processingTime[step1.processingTime] || 0;
      }

      setTotalFee(fee);
    };
    calculateFee();
  }, [formData, FEES.base, FEES.processingTime, FEES.visaType]);

  // handle step
  const handleNextStep = () => {
    const newStep = currentStep + 1;
    if (newStep <= 3) {
      window.location.hash = `step=${newStep}`;
    }
  };

  const handleNextStep2 = async () => {
    setIsLoading(true);

    const body = new FormData();

    body.append("nationality", formData.step1.nationality);
    body.append("time_of_visa", formData.step1.visaTime);
    body.append("type_of_visa", formData.step1.visaType);
    body.append("number_of_visa", formData.applicants.length * 1);
    body.append("processing_time", formData.step1.processingTime);
    body.append("purpose_of_visit", formData.step1.purpose);
    body.append("user_id", user.id);

    body.append("date_of_arrival", formData.info.arrival_date);
    body.append("arrival_border", formData.info.arrival_border);
    body.append("email", formData.info.email);
    body.append("phone_number", formData.info.phone_number);
    body.append("country_code", formData.info.country_code);
    body.append("first_name", formData.info.first_name);
    body.append("last_name", formData.info.last_name);
    // Emergency Contact
    body.append("emergency_name", formData.info.emergency_name);
    body.append("emergency_relationship", formData.info.emergency_relationship);
    body.append("emergency_phone_number", formData.info.emergency_phone_number);
    body.append("emergency_country_code", formData.info.emergency_country_code);
    body.append("is_active", "0");

    // Dữ liệu Applicants
    formData.applicants.forEach((applicant, index) => {
      body.append(
        `applicant[${index}][passport_name]`,
        applicant.passport_name,
      );
      body.append(
        `applicant[${index}][passport_number]`,
        applicant.passport_number,
      );
      body.append(`applicant[${index}][gender]`, applicant.gender);
      if (applicant.avatar) {
        body.append(`applicant[${index}][avatar]`, applicant.avatar);
      }
      if (applicant.passport_image) {
        body.append(
          `applicant[${index}][passport_image]`,
          applicant.passport_image,
        );
      }
    });

    try {
      let response;

      if (visaId) {
        response = await updateVisa(`/visa/${visaId}`, body);
      } else {
        response = await createVisa(body);
        setVisaId(response.data.data.id);
      }

      if (response.data.status === "success") {
        setIsLoading(false);
        window.location.hash = "step=3";
      } else {
        // Xử lý lỗi cập nhật/tạo
        setIsLoading(false);
      }
    } catch (error) {
      toast.error(error);
      console.error("API call to /visa failed:", error);
    } finally {
      // reset loading state...
    }
  };

  const handlePrevStep = () => {
    const newStep = currentStep - 1;
    if (newStep >= 1) {
      window.location.hash = `step=${newStep}`;
    }
  };

  return (
    <>
      <div className="relative">
        <div className="max-w-7xl w-full mx-auto rounded-2xl p-6 sm:p-10">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Apply Online
          </h1>
          <p className="text-sm text-gray-500 mb-8">Home / Apply Online</p>

          {/* Navigation Tabs */}
          <div className="flex items-center justify-between text-center mb-10 border-b border-gray-200 pb-4">
            <div className="flex-1 flex items-center gap-2">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full border ${
                  currentStep === 1
                    ? "border-custom bg-custom"
                    : "border-gray-400 bg-gray-200 text-gray-700"
                } text-white font-medium`}
              >
                1
              </div>
              <div className="text-left hidden sm:block">
                <p
                  className={`text-sm font-semibold ${
                    currentStep === 1 ? "text-custom" : "text-gray-700"
                  }`}
                >
                  Visa Information
                </p>
                <p className="text-xs text-gray-500">Visa Option</p>
              </div>
            </div>
            <div className="flex-1 flex justify-center items-center gap-2 relative">
              <svg
                className="absolute lg:-left-32 sm:-left-12 -left-10 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
              </svg>
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full border ${
                  currentStep === 2
                    ? "border-custom bg-custom"
                    : "border-gray-400 bg-gray-200 text-gray-700"
                } text-white font-medium`}
              >
                2
              </div>
              <div className="text-left hidden sm:block">
                <p
                  className={`text-sm font-semibold ${
                    currentStep === 2 ? "text-custom" : "text-gray-700"
                  }`}
                >
                  Application Detail
                </p>
                <p className="text-xs text-gray-500">
                  Application detail and contact
                </p>
              </div>
            </div>
            <div className="flex-1 flex justify-end items-center gap-2 relative">
              <svg
                className="absolute sm:left-6 left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
              </svg>
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full border ${
                  currentStep === 3
                    ? "border-custom bg-custom"
                    : "border-gray-400 bg-gray-200 text-gray-700"
                } text-white font-medium`}
              >
                3
              </div>
              <div className="text-left hidden sm:block">
                <p
                  className={`text-sm font-semibold ${
                    currentStep === 3 ? "text-custom" : "text-gray-700"
                  }`}
                >
                  Payment & Finalize
                </p>
                <p className="text-xs text-gray-500">Confirm & Payment</p>
              </div>
            </div>
          </div>
          {/* Step 1: Visa Information */}
          {currentStep === 1 && (
            <Step1
              handleNextStep={handleNextStep}
              data={data}
              formData={formData}
              setFormData={setFormData}
              totalFee={totalFee}
              exchangeRateUSD={exchangeRateUSD}
            />
          )}

          {/* Step 2: Applicant Information */}
          {currentStep === 2 && (
            <Step2
              data={data}
              formData={formData}
              setFormData={setFormData}
              handleNextStep={handleNextStep2}
              handlePrevStep={handlePrevStep}
              totalFee={totalFee}
              isLoading={isLoading}
              exchangeRateUSD={exchangeRateUSD}
            />
          )}

          {/* Step 3: Payment */}
          {currentStep === 3 && (
            <Step3
              visaId={visaId}
              handlePrevStep={handlePrevStep}
              formData={formData}
              totalFee={totalFee}
              exchangeRateUSD={exchangeRateUSD}
            />
          )}
        </div>
      </div>
    </>
  );
}
