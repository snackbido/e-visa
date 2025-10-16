import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

export function Step1({
  handleNextStep,
  data,
  formData,
  setFormData,
  totalFee,
}) {
  const [selectedLetter, setSelectedLetter] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);

  const listLetter = [
    ...new Set(data.map((country) => country.code.charAt(0).toUpperCase())),
  ].sort();

  const handleFilteredCountries = (e) => {
    const filteredCountries = data.filter(
      (country) => country.name.charAt(0).toUpperCase() === e
    );

    setFilteredCountries(filteredCountries);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.step1.nationality ||
      !formData.step1.visaTime ||
      !formData.step1.visaType ||
      !formData.step1.purpose
    ) {
      toast.error("Please fill full fields");
      return;
    }
    handleNextStep();
  };

  return (
    <div className="sm:flex sm:justify-between">
      <form
        className="bg-white p-8 sm:border-r border-gray-300 w-full sm:p-4 lg:pr-10 mb-8 sm:mb-0"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">
          E-Visa Application
        </h1>
        <div className="flex flex-col lg:flex-row gap-8 w-full max-w-full px-4">
          <div className="flex-1">
            <h2 className="text-2xl font-semibold mb-6">1. Visa Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-1">
                <label
                  className="block text-gray-700 font-medium mb-2"
                  htmlFor="nationality"
                >
                  Nationality
                </label>
                <div className="flex border rounded-lg w-full">
                  <select
                    name="letter"
                    className="w-24 px-4 py-2 focus:outline-none focus:ring-indigo-500"
                    id="letter"
                    onChange={(e) => {
                      handleFilteredCountries(e.target.value);
                      setSelectedLetter(e.target.value);
                    }}
                  >
                    <option value="">A-Z</option>
                    {listLetter.map((e, i) => (
                      <option key={i} value={e}>
                        {e}
                      </option>
                    ))}
                  </select>
                  <select
                    name="nationality"
                    id="nationality"
                    value={formData.step1.nationality}
                    onChange={handleStep1Change}
                    className={`w-full px-4 py-2 focus:outline-none focus:ring-2 ${
                      !selectedLetter
                        ? "text-gray-400 bg-gray-200 cursor-not-allowed"
                        : "text-gray-800"
                    } focus:ring-indigo-500`}
                    disabled={!selectedLetter}
                  >
                    {selectedLetter && <option value="">Please select</option>}
                    {filteredCountries.map((e) => (
                      <option key={e.code} className="w-1/2" value={e.name}>
                        {e.name}
                      </option>
                    ))}
                  </select>
                </div>
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
                  <option value="1 month single entry">
                    1 Month Single Entry
                  </option>
                  <option value="3 month single entry">
                    3 Month Single Entry
                  </option>
                  <option value="1 month multiple entry">
                    1 Month Multiple Entry
                  </option>
                  <option value="3 month multiple entry">
                    3 Month Multiple Entry
                  </option>
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
                  <option value="Vietnam visa(for going by air, land, ship)">
                    Vietnam visa(for going by air, land, ship)
                  </option>
                  <option value="Vietnam visa run from Ho Chi Minh">
                    Vietnam visa run from Ho Chi Minh
                  </option>
                  <option value="Vietnam visa run from Da Nang">
                    Vietnam visa run from Da Nang
                  </option>
                </select>
              </div>
              <div className="col-span-1 relative">
                <label
                  className="block text-gray-700 font-medium mb-2"
                  htmlFor="visaNumber"
                >
                  Number of Visas
                </label>
                <div className="relative flex items-center mb-2">
                  <div className="relative flex items-center w-full">
                    <select
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      id="visaNumber"
                      name="visaNumber"
                      value={formData.applicants.length}
                      onChange={handleNumApplicantsChange}
                      required
                    >
                      {Array.from({ length: 10 }, (_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1} Application
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
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
                  <option value="3 days">Urgent 3 working days</option>
                  <option value="2 days">Urgent 2 working days</option>
                  <option value="1 days">Urgent 1 working days</option>
                  <option value="4 hours">Super Urgent 4 working hours</option>
                  <option value="15 minutes">
                    Last minute service within 15 minutes
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
                <select
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  id="purpose"
                  name="purpose"
                  value={formData.step1.purpose || ""}
                  onChange={handleStep1Change}
                  required
                >
                  <option value="">Select purpose</option>
                  <option value="Tourist">Tourist</option>
                  <option value="Business">Business</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="w-full mt-4 px-6 py-3 sm:px-4 sm:py-2 sm:w-full lg:px-6 lg:py-3 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700 transition-colors duration-200"
        >
          APPLY NOW
        </button>
      </form>
      <div className="w-full sm:w-1/4 lg:w-1/3 p-6 sm:mt-0 bg-white rounded-3xl flex-shrink-0 flex flex-col items-center justify-center text-center">
        <h3 className="text-xl font-bold mb-4">Check your fees</h3>
        <div className="text-5xl font-extrabold text-red-600 mb-4">
          ${totalFee}
        </div>
        <hr className="w-24 h-1 bg-gray-300 rounded-full mb-6" />
      </div>
      <ToastContainer />
    </div>
  );
}
