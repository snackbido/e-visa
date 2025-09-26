import { useEffect, useState } from "react";
import { Step1 } from "../components/form/Step1";
import { Step2 } from "../components/form/Step2";
import { Step3 } from "../components/form/Step3";
import countries from "../data.json";

export function ApplyVisa({ user }) {
  const [currentStep, setCurrentStep] = useState(1);
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
      arrival_date: "",
      arrival_border: "",
    },
  });

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
    setCurrentStep((prev) => prev + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => prev - 1);
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
                    ? "border-indigo-600 bg-indigo-600"
                    : "border-gray-400 bg-gray-200 text-gray-700"
                } text-white font-medium`}
              >
                1
              </div>
              <div className="text-left hidden sm:block">
                <p
                  className={`text-sm font-semibold ${
                    currentStep === 1 ? "text-indigo-600" : "text-gray-700"
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
                    ? "border-indigo-600 bg-indigo-600"
                    : "border-gray-400 bg-gray-200 text-gray-700"
                } text-white font-medium`}
              >
                2
              </div>
              <div className="text-left hidden sm:block">
                <p
                  className={`text-sm font-semibold ${
                    currentStep === 2 ? "text-indigo-600" : "text-gray-700"
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
                    ? "border-indigo-600 bg-indigo-600"
                    : "border-gray-400 bg-gray-200 text-gray-700"
                } text-white font-medium`}
              >
                3
              </div>
              <div className="text-left hidden sm:block">
                <p
                  className={`text-sm font-semibold ${
                    currentStep === 3 ? "text-indigo-600" : "text-gray-700"
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
            />
          )}

          {/* Step 2: Applicant Information */}
          {currentStep === 2 && (
            <Step2
              data={data}
              formData={formData}
              setFormData={setFormData}
              handleNextStep={handleNextStep}
              handlePrevStep={handlePrevStep}
              totalFee={totalFee}
            />
          )}

          {/* Step 3: Payment */}
          {currentStep === 3 && (
            <Step3
              handlePrevStep={handlePrevStep}
              formData={formData}
              totalFee={totalFee}
              user={user}
            />
          )}
        </div>
      </div>
    </>
  );
}
