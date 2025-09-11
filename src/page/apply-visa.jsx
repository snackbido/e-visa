import { useEffect, useState } from "react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

export function ApplyVisa() {
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
        passportName: "",
        passportNumber: "",
        gender: "",
        avatar: null,
        passportImage: null,
        arrivalDate: "",
        arrivalBorder: "",
        email: "",
        phoneNumber: "",
      },
    ],
  });

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

  // Recalculate fee whenever form data changes
  useEffect(() => {
    calculateFee();
  }, [formData.step1, formData.applicants.length]);

  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);

  const handleNextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleStep1Change = (e) => {
    setFormData((prev) => ({
      ...prev,
      step1: {
        ...prev.step1,
        [e.target.name]: e.target.value,
      },
    }));
  };

  const handleNumApplicantsChange = (e) => {
    const num = parseInt(e.target.value, 10);
    if (num > 0) {
      const newApplicants = Array(num)
        .fill()
        .map((_, i) => ({
          ...formData.applicants[i],
          id: i + 1,
        }));
      setFormData((prev) => ({ ...prev, applicants: newApplicants }));
    }
  };

  const handleApplicantChange = (index, e) => {
    const newApplicants = [...formData.applicants];
    const { name, value, files } = e.target;
    if (files) {
      newApplicants[index][name] = files[0];
    } else {
      newApplicants[index][name] = value;
    }
    setFormData((prev) => ({
      ...prev,
      applicants: newApplicants,
    }));
  };

  const addApplicant = () => {
    setFormData((prev) => ({
      ...prev,
      applicants: [
        ...prev.applicants,
        {
          id: prev.applicants.length + 1,
          passportName: "",
          passportNumber: "",
          gender: "",
          avatar: null,
          passportImage: null,
        },
      ],
    }));
  };

  const handleRemoveApplicant = (index) => {
    if (formData.applicants.length > 1) {
      const newApplicants = formData.applicants.filter((_, i) => i !== index);
      setFormData((prev) => ({
        ...prev,
        applicants: newApplicants,
      }));
    }
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    // Simulate payment processing
    setTimeout(() => {
      setIsPaymentSuccessful(true);
    }, 1500);
  };

  return (
    <>
      <Header />
      <div className="min-h-screen ">
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
                className="absolute sm:-left-32 -left-10 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
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
            <div className="sm:flex sm:justify-between">
              <form
                className="bg-white p-8 sm:border-r border-gray-300 w-full mr-5"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleNextStep();
                }}
              >
                <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">
                  E-Visa Application
                </h1>
                <p className="text-center text-gray-600 mb-8">
                  Step {currentStep} of 3
                </p>
                <div className="flex flex-col lg:flex-row gap-8">
                  <div className="flex-1">
                    <h2 className="text-2xl font-semibold mb-6">
                      1. Visa Information
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="col-span-1">
                        <label
                          className="block text-gray-700 font-medium mb-2"
                          htmlFor="nationality"
                        >
                          Nationality
                        </label>
                        <input
                          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          type="text"
                          id="nationality"
                          name="nationality"
                          value={formData.step1.nationality || ""}
                          onChange={handleStep1Change}
                          required
                        />
                      </div>
                      <div className="col-span-1">
                        <label
                          className="block text-gray-700 font-medium mb-2"
                          htmlFor="visaTime"
                        >
                          Time of Visa
                        </label>
                        <select
                          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          id="visaTime"
                          name="visaTime"
                          value={formData.step1.visaTime || ""}
                          onChange={handleStep1Change}
                          required
                        >
                          <option value="">Select time</option>
                          <option value="30days">30 days</option>
                          <option value="90days">90 days</option>
                          <option value="180days">180 days</option>
                        </select>
                      </div>
                      <div className="col-span-1">
                        <label
                          className="block text-gray-700 font-medium mb-2"
                          htmlFor="visaType"
                        >
                          Type of Visa
                        </label>
                        <select
                          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          id="visaType"
                          name="visaType"
                          value={formData.step1.visaType || ""}
                          onChange={handleStep1Change}
                          required
                        >
                          <option value="">Select type</option>
                          <option value="single">Single Entry</option>
                          <option value="multiple">Multiple Entry</option>
                        </select>
                      </div>
                      <div className="col-span-1">
                        <label
                          className="block text-gray-700 font-medium mb-2"
                          htmlFor="visaNumber"
                        >
                          Number of Visas
                        </label>
                        <input
                          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          type="number"
                          id="visaNumber"
                          name="visaNumber"
                          min="1"
                          value={formData.applicants.length}
                          onChange={handleNumApplicantsChange}
                          required
                        />
                      </div>
                      <div className="col-span-1">
                        <label
                          className="block text-gray-700 font-medium mb-2"
                          htmlFor="processingTime"
                        >
                          Processing Time
                        </label>
                        <select
                          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          id="processingTime"
                          name="processingTime"
                          value={formData.step1.processingTime || ""}
                          onChange={handleStep1Change}
                          required
                        >
                          <option value="">Select time</option>
                          <option value="standard">Standard (7-10 days)</option>
                          <option value="express">Express (3-5 days)</option>
                          <option value="superExpress">
                            Super Express (1-2 days)
                          </option>
                        </select>
                      </div>
                      <div className="col-span-1">
                        <label
                          className="block text-gray-700 font-medium mb-2"
                          htmlFor="purpose"
                        >
                          Purpose of Visit
                        </label>
                        <input
                          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          type="text"
                          id="purpose"
                          name="purpose"
                          value={formData.step1.purpose || ""}
                          onChange={handleStep1Change}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </form>
              <div className="w-full sm:w-1/3 p-6 mt-4 sm:mt-0 bg-white rounded-3xl flex-shrink-0 flex flex-col items-center justify-center text-center">
                <h3 className="text-xl font-bold mb-4">Check your fees</h3>
                <div className="text-5xl font-extrabold text-red-600 mb-4">
                  ${totalFee}
                </div>
                <hr className="w-24 h-1 bg-gray-300 rounded-full mb-6" />
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700 transition-colors duration-200"
                  onClick={handleNextStep}
                >
                  APPLY NOW
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Applicant Information */}
          {currentStep === 2 && (
            <div>
              <div className="p-6 sm:p-8 border border-gray-200 rounded-xl mb-8">
                <h2 className="text-xl font-bold mb-4">2. Applicant Detail</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label
                      className="block text-gray-700 font-medium mb-2"
                      htmlFor="arrivalDate"
                    >
                      Date of arrival
                    </label>
                    <input
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      type="date"
                      id="arrivalDate"
                      name="arrivalDate"
                      value={formData.applicants[0].arrivalDate || ""}
                      onChange={(e) => handleApplicantChange(0, e)}
                      required
                    />
                  </div>
                  <div>
                    <label
                      className="block text-gray-700 font-medium mb-2"
                      htmlFor="arrivalBorder"
                    >
                      Arrival border
                    </label>
                    <input
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      type="text"
                      id="arrivalBorder"
                      name="arrivalBorder"
                      value={formData.applicants[0].arrivalBorder || ""}
                      onChange={(e) => handleApplicantChange(0, e)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-8">
                  {formData.applicants.map((applicant, index) => (
                    <div
                      key={applicant.id}
                      className="p-6 border rounded-xl bg-gray-50 relative"
                    >
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-bold">
                          Applicant {index + 1}
                        </h3>
                        {formData.applicants.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveApplicant(index)}
                            className="p-2 text-sm text-red-600 bg-red-100 rounded-full hover:bg-red-200 transition-colors duration-200"
                            title="Remove this applicant"
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                              ></path>
                            </svg>
                          </button>
                        )}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-6">
                          <div className="col-span-1">
                            <label
                              className="block text-gray-700 font-medium mb-2"
                              htmlFor={`passportFullName-${index}`}
                            >
                              Passport full name
                            </label>
                            <input
                              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                              type="text"
                              id={`passportFullName-${index}`}
                              name="passportName"
                              value={applicant.passportName}
                              onChange={(e) => handleApplicantChange(index, e)}
                              required
                            />
                          </div>
                          <div className="col-span-1">
                            <label
                              className="block text-gray-700 font-medium mb-2"
                              htmlFor={`passportNumber-${index}`}
                            >
                              Passport number
                            </label>
                            <input
                              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                              type="text"
                              id={`passportNumber-${index}`}
                              name="passportNumber"
                              value={applicant.passportNumber}
                              onChange={(e) => handleApplicantChange(index, e)}
                              required
                            />
                          </div>
                          <div className="col-span-1">
                            <label
                              className="block text-gray-700 font-medium mb-2"
                              htmlFor={`gender-${index}`}
                            >
                              Gender
                            </label>
                            <select
                              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                              id={`gender-${index}`}
                              name="gender"
                              value={applicant.gender}
                              onChange={(e) => handleApplicantChange(index, e)}
                              required
                            >
                              <option value="">Select gender</option>
                              <option value="male">Male</option>
                              <option value="female">Female</option>
                              <option value="other">Other</option>
                            </select>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="flex flex-col items-center">
                            <p className="text-gray-700 font-medium mb-2">
                              Portrait photo
                            </p>
                            <div className="w-full aspect-portrait border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center text-center space-y-2">
                              <div className="w-24 h-24 mb-2 flex items-center justify-center rounded-full bg-gray-200">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                  className="w-12 h-12 text-gray-500"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </div>
                              <label
                                htmlFor={`avatar-${index}`}
                                className="cursor-pointer text-indigo-600 font-semibold hover:underline"
                              >
                                Select File to Upload
                              </label>
                              <input
                                type="file"
                                id={`avatar-${index}`}
                                name="avatar"
                                className="sr-only"
                                onChange={(e) =>
                                  handleApplicantChange(index, e)
                                }
                                required
                              />
                              <p className="text-xs text-gray-500">
                                (.jpg, .jpeg, .png)
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-col items-center">
                            <p className="text-gray-700 font-medium mb-2">
                              Passport data page
                            </p>
                            <div className="w-full aspect-video border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center text-center space-y-2">
                              <div className="w-24 h-24 mb-2 flex items-center justify-center rounded-lg bg-gray-200">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                  className="w-12 h-12 text-gray-500"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5a.75.75 0 0 0 .75-.75v-1.94l-2.42-1.391a1.5 1.5 0 0 0-1.218 0l-.612.355a1.5 1.5 0 0 1-1.218 0l-.612-.355a1.5 1.5 0 0 0-1.218 0L9.75 15.39l-1.656-.954a1.5 1.5 0 0 0-1.218 0l-3.323 1.918Zm16.5-9.613a.75.75 0 0 0-.91-.148L13.5 9.497l-3-1.732a.75.75 0 0 0-.91.148L4.5 12.613V6a.75.75 0 0 1 .75-.75h14.25a.75.75 0 0 1 .75.75v3.454Z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </div>
                              <label
                                htmlFor={`passportImage-${index}`}
                                className="cursor-pointer text-indigo-600 font-semibold hover:underline"
                              >
                                Select File to Upload
                              </label>
                              <input
                                type="file"
                                id={`passportImage-${index}`}
                                name="passportImage"
                                className="sr-only"
                                onChange={(e) =>
                                  handleApplicantChange(index, e)
                                }
                                required
                              />
                              <p className="text-xs text-gray-500">
                                (.jpg, .jpeg, .png)
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="text-center">
                    <button
                      type="button"
                      onClick={addApplicant}
                      className="px-6 py-3 text-indigo-600 font-semibold rounded-full border border-indigo-600 hover:bg-indigo-50 transition-colors duration-200"
                    >
                      + Add Another Applicant
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-8 border border-gray-200 rounded-xl mb-8">
                <h2 className="text-xl font-bold mb-4">Contact Detail</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="col-span-1">
                    <label
                      className="block text-gray-700 font-medium mb-2"
                      htmlFor="email"
                    >
                      Email address
                    </label>
                    <input
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      type="email"
                      id="email"
                      name="email"
                      value={formData.applicants[0].email || ""}
                      onChange={(e) => handleApplicantChange(0, e)}
                      required
                    />
                  </div>
                  <div className="col-span-1">
                    <label
                      className="block text-gray-700 font-medium mb-2"
                      htmlFor="phoneNumber"
                    >
                      Phone number
                    </label>
                    <input
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={formData.applicants[0].phoneNumber || ""}
                      onChange={(e) => handleApplicantChange(0, e)}
                      required
                    />
                  </div>
                  <div className="col-span-1">
                    <label
                      className="block text-gray-700 font-medium mb-2"
                      htmlFor="phoneNumber"
                    >
                      Phone number
                    </label>
                    <input
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={formData.applicants[0].phoneNumber || ""}
                      onChange={(e) => handleApplicantChange(0, e)}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Footer and Total Fee */}
              <div className="flex flex-col sm:flex-row justify-between items-center bg-gray-50 p-6 sm:p-8 rounded-xl border border-gray-200 mt-4">
                <div className="text-center sm:text-left mb-4 sm:mb-0">
                  <p className="text-2xl font-bold text-gray-900 mb-1">
                    Total fee:{" "}
                    <span className="text-indigo-600">${totalFee}</span>
                  </p>
                  <p className="text-lg font-bold text-gray-600">
                    Equal to:{" "}
                    {Math.round(totalFee * 25000).toLocaleString("en-US")} VND
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <button
                    type="button"
                    className="px-6 py-3 text-gray-600 font-semibold rounded-full border border-gray-400 hover:bg-gray-200 transition-colors duration-200"
                    onClick={handlePrevStep}
                  >
                    Previous Step
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700 transition-colors duration-200"
                    onClick={handleNextStep}
                  >
                    Next Step
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Payment */}
          {currentStep === 3 && (
            <div className="max-w-xl mx-auto">
              <h2 className="text-2xl font-semibold mb-6">
                3. Payment Information
              </h2>
              {isPaymentSuccessful ? (
                <div className="text-center p-8 bg-green-50 rounded-lg border-2 border-green-300">
                  <svg
                    className="w-16 h-16 text-green-500 mx-auto mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  <h3 className="text-xl font-bold text-green-700 mb-2">
                    Payment Successful!
                  </h3>
                  <p className="text-gray-600">
                    Your E-Visa application has been submitted and payment was
                    received. You will receive a confirmation email shortly.
                  </p>
                  <button className="mt-6 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700 transition-colors duration-200">
                    Back to Home
                  </button>
                </div>
              ) : (
                <form onSubmit={handlePaymentSubmit}>
                  <div className="p-6 bg-white rounded-lg shadow-md mb-6">
                    <h3 className="text-lg font-bold mb-4">
                      Credit Card Details
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label
                          className="block text-gray-700 font-medium mb-2"
                          htmlFor="cardName"
                        >
                          Name on Card
                        </label>
                        <input
                          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          type="text"
                          id="cardName"
                          required
                        />
                      </div>
                      <div>
                        <label
                          className="block text-gray-700 font-medium mb-2"
                          htmlFor="cardNumber"
                        >
                          Card Number
                        </label>
                        <input
                          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          type="text"
                          id="cardNumber"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label
                            className="block text-gray-700 font-medium mb-2"
                            htmlFor="expiryDate"
                          >
                            Expiry Date
                          </label>
                          <input
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            type="text"
                            id="expiryDate"
                            placeholder="MM/YY"
                            required
                          />
                        </div>
                        <div>
                          <label
                            className="block text-gray-700 font-medium mb-2"
                            htmlFor="cvv"
                          >
                            CVV
                          </label>
                          <input
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            type="text"
                            id="cvv"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between mt-8">
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="px-6 py-3 text-gray-600 font-semibold rounded-full border border-gray-400 hover:bg-gray-200 transition-colors duration-200"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="px-8 py-4 bg-indigo-600 text-white font-bold rounded-full hover:bg-indigo-700 transition-colors duration-200 shadow-lg"
                    >
                      Pay Now
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
