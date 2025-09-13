import { useState } from "react";

export function Step2({
  formData,
  setFormData,
  handleNextStep,
  handlePrevStep,
  data,
  totalFee,
}) {
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const entryPoints = [
    {
      value: "Hanoi airport (know as Noi Bai)",
      label: "Hanoi airport (know as Noi Bai)",
    },
    {
      value: "Ho Chi Minh airport (known as Tan Son Nhat)",
      label: "Ho Chi Minh airport (known as Tan Son Nhat)",
    },
    { value: "Da Nang airport", label: "Da Nang airport" },
    {
      value: "Nha Trang airport (known as Cam Ranh)",
      label: "Nha Trang airport (known as Cam Ranh)",
    },
    {
      value: "Hai Phong airport (known as Cat Bi)",
      label: "Hai Phong airport (known as Cat Bi)",
    },
    { value: "Phu Quoc Airport", label: "Phu Quoc Airport" },
    {
      value: "Moc Bai landport - Tay Ninh",
      label: "Moc Bai landport - Tay Ninh",
    },
    {
      value: "Nam Can landport - Nghe An",
      label: "Nam Can landport - Nghe An",
    },
    {
      value: "Song Tien landport - An Giang",
      label: "Song Tien landport - An Giang",
    },
    {
      value: "Tinh Bien landport - An Giang",
      label: "Tinh Bien landport - An Giang",
    },
    {
      value: "Xa Mat landport - Tay Ninh",
      label: "Xa Mat landport - Tay Ninh",
    },
    {
      value: "Mong Cai landport - Quang Ninh",
      label: "Mong Cai landport - Quang Ninh",
    },
    {
      value: "Lao Bao landport - Quang Tri",
      label: "Lao Bao landport - Quang Tri",
    },
    {
      value: "Ha Tien landport - Kien Giang",
      label: "Ha Tien landport - Kien Giang",
    },
    {
      value: "Huu Nghi landport - Lang Son",
      label: "Huu Nghi landport - Lang Son",
    },
    {
      value: "Cau Treo landport - Ha Tinh",
      label: "Cau Treo landport - Ha Tinh",
    },
    {
      value: "Cha Lo landport - Quang Binh",
      label: "Cha Lo landport - Quang Binh",
    },
    { value: "Bo Y landport - Kon Tum", label: "Bo Y landport - Kon Tum" },
    {
      value: "Lao Cai landport - Lao Cai",
      label: "Lao Cai landport - Lao Cai",
    },
    {
      value: "Ho Chi Minh Seaport (not suitble to go by air)",
      label: "Ho Chi Minh Seaport (not suitble to go by air)",
    },
    {
      value: "Lien Khuong Int Airport (Lam Dong)",
      label: "Lien Khuong Int Airport (Lam Dong)",
    },
    {
      value: "Quy Nhon seaport - Binh Dinh",
      label: "Quy Nhon seaport - Binh Dinh",
    },
    {
      value: "Nha Trang seaport - Nha Trang",
      label: "Nha Trang seaport - Nha Trang",
    },
    {
      value: "Hai Phong seaport - Hai Phong",
      label: "Hai Phong seaport - Hai Phong",
    },
    {
      value: "Hon Gai seaport - Quang Ninh",
      label: "Hon Gai seaport - Quang Ninh",
    },
    { value: "Da Nang seaport - Da Nang", label: "Da Nang seaport - Da Nang" },
    {
      value: "Vung Tau seaport - Ba Ria-Vung Tau",
      label: "Vung Tau seaport - Ba Ria-Vung Tau",
    },
  ];

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

  const [selectedCountry, setSelectedCountry] = useState({
    code: "US",
    dialCode: "+1",
    name: "United States",
    flag: "https://flagcdn.com/us.svg",
  });
  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setIsCountryDropdownOpen(false);
  };

  const filteredCountries = data.filter((country) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
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
              <span className="text-red-600 ml-1">*</span>
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
            <select
              name="arrival_border"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Please select</option>
              {entryPoints.map((e) => (
                <option key={e.value} value={e.value}>
                  {e.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-8">
          {formData.applicants.map((applicant, index) => (
            <div
              key={applicant.id}
              className="p-6 border rounded-xl bg-gray-50 relative"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">Applicant {index + 1}</h3>
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
                      <span className="text-red-600 ml-1">*</span>
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
                      <span className="text-red-600 ml-1">*</span>
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
                      <span className="text-red-600 ml-1">*</span>
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
                        onChange={(e) => handleApplicantChange(index, e)}
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
                        onChange={(e) => handleApplicantChange(index, e)}
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
            <div className="relative">
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="contactPhone"
              >
                Phone Number
              </label>
              <div className="flex rounded-lg border focus-within:ring-2 focus-within:ring-indigo-500 relative">
                <button
                  type="button"
                  className="flex items-center justify-center px-4 text-sm text-gray-700 border-r border-gray-300 rounded-l-lg focus:outline-none"
                  onClick={() =>
                    setIsCountryDropdownOpen(!isCountryDropdownOpen)
                  }
                >
                  <img
                    src={selectedCountry.flag}
                    alt=""
                    width={25}
                    height={25}
                    className="mr-2"
                  />
                  <span>{selectedCountry.dialCode}</span>
                  <svg
                    className={`ml-2 w-4 h-4 transition-transform ${
                      isCountryDropdownOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </button>
                <input
                  className="w-full px-4 py-2 rounded-r-lg focus:outline-none"
                  type="tel"
                  id="contactPhone"
                  name="contactPhone"
                  required
                />
              </div>
              {isCountryDropdownOpen && (
                <div className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  <div className="p-2 sticky top-0 bg-white border-b border-gray-200">
                    <input
                      type="text"
                      placeholder="Search country..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <ul className="py-1">
                    {filteredCountries.map((country) => (
                      <li
                        key={country.code}
                        className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100 transition-colors"
                        onClick={() => handleCountrySelect(country)}
                      >
                        <img
                          src={country.flag}
                          className="mr-2"
                          alt={country.name}
                          width={25}
                          height={25}
                        />
                        <span>{country.name}</span>
                        <span className="ml-auto text-gray-500">
                          {country.dialCode}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div className="col-span-1">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="fullName"
            >
              Full name
            </label>
            <input
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              type="tel"
              id="fullName"
              name="fullName"
              value={formData.applicants[0].fullName || ""}
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
            Total fee: <span className="text-indigo-600">${totalFee}</span>
          </p>
          <p className="text-lg font-bold text-gray-600">
            Equal to: {Math.round(totalFee * 25000).toLocaleString("en-US")} VND
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
  );
}
