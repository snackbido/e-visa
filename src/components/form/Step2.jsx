import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

export function Step2({
  formData,
  setFormData,
  handleNextStep,
  handlePrevStep,
  data,
  totalFee,
  isLoading,
}) {
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [isCountryEmergencyDropdownOpen, setIsCountryEmergencyDropdownOpen] =
    useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [readyToProceed, setReadyToProceed] = useState(false);

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
          passport_name: "",
          passport_number: "",
          gender: "",
          avatar: null,
          passport_image: null,
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
    setValidationErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[`applicant_${index}_${e.target.name}`];
      return newErrors;
    });

    const newApplicants = [...formData.applicants];
    const { name, value, files } = e.target;

    if (files && files.length > 0) {
      if (name === "avatar") {
        newApplicants[index].previewAvatar = URL.createObjectURL(files[0]);
      }
      if (name === "passport_image") {
        newApplicants[index].previewPassport = URL.createObjectURL(files[0]);
      }
      newApplicants[index][name] = files[0];
    } else {
      newApplicants[index][name] = value;
    }
    setFormData((prev) => ({
      ...prev,
      applicants: newApplicants,
    }));
  };

  const formatPhoneNumber = (value) => {
    const numericValue = value.replace(/[^\d]/g, "");

    let formattedValue = "";
    if (numericValue.length > 0) {
      formattedValue += numericValue.substring(0, 3);
    }
    if (numericValue.length > 3) {
      formattedValue += "-" + numericValue.substring(3, 6);
    }
    if (numericValue.length > 6) {
      formattedValue += "-" + numericValue.substring(6, 10);
    }

    return formattedValue.substring(0, 12).trim();
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleInfoChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === "phone_number" || name === "emergency_phone_number") {
      newValue = formatPhoneNumber(value);
    }

    setValidationErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[name];
      return newErrors;
    });

    let newInfo = { ...formData.info };
    newInfo[name] = newValue;

    setFormData((pre) => ({
      ...pre,
      info: newInfo,
    }));
  };

  const [selectedCountry, setSelectedCountry] = useState({
    code: "US",
    dialCode: "+1",
    name: "United States",
    flag: "https://flagcdn.com/us.svg",
  });

  const [selectedCountryEmergency, setSelectedCountryEmergency] = useState({
    code: "US",
    dialCode: "+1",
    name: "United States",
    flag: "https://flagcdn.com/us.svg",
  });
  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setIsCountryDropdownOpen(false);
  };

  const handleCountrySelectEmergency = (country) => {
    setSelectedCountryEmergency(country);
    setIsCountryEmergencyDropdownOpen(false);
  };

  const filteredCountries = data.filter((country) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Hàm validate form
  const validateForm = () => {
    let errors = {};
    let firstErrorId = "";

    const infoFields = [
      { name: "arrival_date", label: "Date of arrival", id: "arrival_date" },
      { name: "email", label: "Email address", id: "email" },
      { name: "phone_number", label: "Phone Number", id: "phone_number" },
      { name: "first_name", label: "First Name", id: "first_name" },
      { name: "last_name", label: "Last Name", id: "last_name" },
      {
        name: "emergency_name",
        label: "Emergency Full name",
        id: "emergency_name",
      },
      {
        name: "emergency_relationship",
        label: "Emergency Relationship",
        id: "emergency_relationship",
      },
      {
        name: "emergency_phone_number",
        label: "Emergency Phone number",
        id: "emergency_phone_number",
      },
    ];

    infoFields.forEach((field) => {
      if (!formData.info[field.name]) {
        errors[field.name] = `${field.label} is required.`;
        if (!firstErrorId) firstErrorId = field.id;
      }
    });

    // 2. Validate Applicants
    formData.applicants.forEach((applicant, index) => {
      const applicantFields = [
        { name: "passport_name", label: "Passport full name", type: "text" },
        { name: "passport_number", label: "Passport number", type: "text" },
        { name: "gender", label: "Gender", type: "select" },
        { name: "avatar", label: "Portrait photo", type: "file" },
        { name: "passport_image", label: "Passport Image", type: "file" },
      ];

      applicantFields.forEach((field) => {
        const errorKey = `applicant_${index}_${field.name}`;
        const isFileField = field.type === "file";
        const isMissing = isFileField
          ? !applicant[field.name]
          : !applicant[field.name];

        if (isMissing) {
          errors[errorKey] = `${field.label} for Applicant ${
            index + 1
          } is required.`;
          if (!firstErrorId) {
            const baseId = field.name.replace(/_([a-z])/g, (g) =>
              g[1].toUpperCase()
            );
            firstErrorId = `${baseId}-${index}`;
          }
        }
      });
    });

    setValidationErrors(errors);

    if (Object.keys(errors).length > 0) {
      const firstErrorElement = document.getElementById(firstErrorId);

      if (firstErrorElement) {
        firstErrorElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });

        firstErrorElement.focus();
      }

      toast.error("Please fill in all required fields.");
      return false;
    }

    return true;
  };

  const handleNext = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const isValidEmail = validateEmail(formData.info.email);
    if (!isValidEmail) {
      toast.error("Invalid email");
      return;
    }

    setFormData((pre) => ({
      ...pre,
      info: {
        ...pre.info,
        country_code: selectedCountry.dialCode,
        emergency_country_code: selectedCountryEmergency.dialCode,
      },
    }));
    setReadyToProceed(true);
  };

  useEffect(() => {
    if (readyToProceed && formData.info.country_code) {
      handleNextStep();
      setReadyToProceed(false); // Reset cờ
    }
  }, [formData.info.country_code, readyToProceed, handleNextStep]);

  const hasError = (fieldName) => !!validationErrors[fieldName];

  return (
    <div>
      <div className="p-6 sm:p-8 border border-gray-200 rounded-xl mb-8">
        <h2 className="text-xl font-bold mb-4">2. Applicant Detail</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="arrival_date"
            >
              Date of arrival (YYYY-MM-DD)
              <span className="text-red-600 ml-1">*</span>
            </label>
            <DatePicker
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                hasError("arrival_date")
                  ? "border-red-500 focus:ring-red-500"
                  : "focus:ring-indigo-500"
              }`}
              dateFormat="dd/MM/yyyy"
              minDate={new Date().setHours(0, 0, 0, 0)}
              selected={
                formData.info.arrival_date
                  ? moment(formData.info.arrival_date).toDate()
                  : null
              }
              id="arrival_date"
              name="arrival_date"
              value={formData.info.arrival_date || ""}
              onChange={(date) => {
                const formattedDate = date
                  ? moment(date).format("YYYY-MM-DD")
                  : "";

                handleInfoChange({
                  target: {
                    name: "arrival_date",
                    value: formattedDate,
                  },
                });
              }}
              placeholderText="DD/MM/YYYY"
              showYearDropdown
              scrollableYearDropdown
              required
            />
            {hasError("arrival_date") && (
              <p className="text-red-500 text-sm mt-1">
                {validationErrors.arrival_date}
              </p>
            )}
          </div>
          <div className="col-span-1">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="arrival_border"
            >
              Arrival border
            </label>
            <select
              id="arrival_border"
              name="arrival_border"
              value={formData.info.arrival_border || ""}
              onChange={(e) => handleInfoChange(e)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
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
              className="p-6 border rounded-xl bg-gray-100 relative"
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
                    {/* SVG for remove button */}
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
              <div
                className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-6 rounded-md"
                role="alert"
              >
                <p className="font-bold">Photo Requirement Guide</p>
                <p className="text-sm mt-1">
                  Photo of the person requesting an electronic visa (newly
                  taken, photo size 4x6 cm, .jpg, .jpeg format, size &lt;2MB,
                  straight face, no hat, no glasses). Only upload 1 passport
                  data page, upload clear photos, no lost corners.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-6 col-span-1">
                  {/* PASSPORT FULL NAME */}
                  <div className="col-span-1">
                    <label
                      className="block text-gray-700 font-medium mb-2"
                      htmlFor={`passportName-${index}`}
                    >
                      Passport full name
                      <span className="text-red-600 ml-1">*</span>
                    </label>
                    <input
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                        hasError(`applicant_${index}_passport_name`)
                          ? "border-red-500 focus:ring-red-500"
                          : "focus:ring-indigo-500"
                      }`}
                      type="text"
                      id={`passportName-${index}`}
                      name="passport_name"
                      value={applicant.passport_name || ""}
                      onChange={(e) => handleApplicantChange(index, e)}
                      required
                    />
                    {hasError(`applicant_${index}_passport_name`) && (
                      <p className="text-red-500 text-sm mt-1">
                        Please enter the passport full name.
                      </p>
                    )}
                  </div>

                  {/* PASSPORT NUMBER */}
                  <div className="col-span-1">
                    <label
                      className="block text-gray-700 font-medium mb-2"
                      htmlFor={`passportNumber-${index}`}
                    >
                      Passport number
                      <span className="text-red-600 ml-1">*</span>
                    </label>
                    <input
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                        hasError(`applicant_${index}_passport_number`)
                          ? "border-red-500 focus:ring-red-500"
                          : "focus:ring-indigo-500"
                      }`}
                      type="text"
                      id={`passportNumber-${index}`}
                      name="passport_number"
                      value={applicant.passport_number || ""}
                      onChange={(e) => handleApplicantChange(index, e)}
                      required
                    />
                    {hasError(`applicant_${index}_passport_number`) && (
                      <p className="text-red-500 text-sm mt-1">
                        Please enter the passport number.
                      </p>
                    )}
                  </div>

                  {/* GENDER */}
                  <div className="col-span-1">
                    <label
                      className="block text-gray-700 font-medium mb-2"
                      htmlFor={`gender-${index}`}
                    >
                      Gender
                      <span className="text-red-600 ml-1">*</span>
                    </label>
                    <select
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                        hasError(`applicant_${index}_gender`)
                          ? "border-red-500 focus:ring-red-500"
                          : "focus:ring-indigo-500"
                      }`}
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
                    {hasError(`applicant_${index}_gender`) && (
                      <p className="text-red-500 text-sm mt-1">
                        Please select a gender.
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 col-span-2">
                  {/* PORTRAIT PHOTO (AVATAR) */}
                  <div className="flex flex-col items-center col-span-1">
                    <p className="text-gray-700 font-medium mb-2">
                      Portrait photo
                      <span className="text-red-600 ml-1">*</span>
                    </p>
                    <label
                      htmlFor={`avatar-${index}`}
                      className={`w-full aspect-portrait border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center text-center space-y-2 cursor-pointer ${
                        hasError(`applicant_${index}_avatar`)
                          ? "border-red-500 bg-red-50"
                          : "border-gray-300 hover:border-indigo-500"
                      }`}
                    >
                      {/* ... (Giữ nguyên phần hiển thị ảnh preview) ... */}
                      {applicant.previewAvatar ? (
                        <>
                          <div className="w-[200px] h-[265px] mb-2 flex items-center rounded-lg justify-center bg-gray-200">
                            <img
                              src={applicant.previewAvatar}
                              alt="Portrait preview"
                              className="w-full h-full object-cover rounded-lg"
                            />
                          </div>
                          <div className="text-indigo-600 font-semibold hover:underline">
                            Select File to Upload
                          </div>
                          <p className="text-xs text-gray-500">
                            (.jpg, .jpeg, .png)
                          </p>
                        </>
                      ) : (
                        <>
                          <div className="w-[200px] h-[265px] mb-2 rounded-lg flex items-center justify-center bg-gray-200">
                            <img
                              src="https://thithucdientu.gov.vn/assets/e-visa/PortraitExample.png"
                              alt=""
                              width="100%"
                              height="100%"
                              className="rounded-lg h-[265px]"
                            />
                          </div>
                          <div className="text-indigo-600 font-semibold hover:underline">
                            Select File to Upload
                          </div>
                          <p className="text-xs text-gray-500">
                            (.jpg, .jpeg, .png)
                          </p>
                        </>
                      )}
                    </label>
                    <input
                      type="file"
                      id={`avatar-${index}`}
                      name="avatar"
                      className="sr-only"
                      onChange={(e) => handleApplicantChange(index, e)}
                      required
                    />
                    {hasError(`applicant_${index}_avatar`) && (
                      <p className="text-red-500 text-sm mt-1">
                        Please upload a portrait photo.
                      </p>
                    )}
                  </div>

                  {/* PASSPORT IMAGE */}
                  <div className="flex flex-col items-center col-span-2 ">
                    <p className="text-gray-700 font-medium mb-2">
                      Passport Image
                      <span className="text-red-600 ml-1">*</span>
                    </p>
                    <label
                      htmlFor={`passportImage-${index}`}
                      className={`w-full aspect-passport border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center text-center space-y-2 cursor-pointer ${
                        hasError(`applicant_${index}_passport_image`)
                          ? "border-red-500 bg-red-50"
                          : "border-gray-300 hover:border-indigo-500"
                      }`}
                    >
                      {/* ... (Giữ nguyên phần hiển thị ảnh preview) ... */}
                      {applicant.previewPassport ? (
                        <>
                          <div className="sm:w-[400px] sm:h-[265px] w-full h-full mb-2 rounded-lg flex items-center justify-center">
                            <img
                              src={applicant.previewPassport}
                              alt="Passport preview"
                              className="w-full h-full object-cover rounded-lg"
                            />
                          </div>
                          <div className="text-indigo-600 font-semibold hover:underline">
                            Select File to Upload
                          </div>
                          <p className="text-xs text-gray-500">
                            (.jpg, .jpeg, .png)
                          </p>
                        </>
                      ) : (
                        <>
                          <div className="sm:w-[400px] sm:h-[265px] w-full h-full rounded-lg mb-2 flex items-center justify-center">
                            <img
                              src="https://thithucdientu.gov.vn/assets/e-visa/PassportExample.png"
                              alt=""
                              width="100%"
                              height="100%"
                              className="rounded-lg"
                            />
                          </div>
                          <div className="text-indigo-600 font-semibold hover:underline">
                            Select File to Upload
                          </div>
                          <p className="text-xs text-gray-500">
                            (.jpg, .jpeg, .png)
                          </p>
                        </>
                      )}
                    </label>
                    <input
                      type="file"
                      id={`passportImage-${index}`}
                      name="passport_image"
                      className="sr-only"
                      onChange={(e) => handleApplicantChange(index, e)}
                      required
                    />
                    {hasError(`applicant_${index}_passport_image`) && (
                      <p className="text-red-500 text-sm mt-1">
                        Please upload the passport image.
                      </p>
                    )}
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* EMAIL */}
          <div className="col-span-1">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="email"
            >
              Email address
              <span className="text-red-600 ml-1">*</span>
            </label>
            <input
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                hasError("email")
                  ? "border-red-500 focus:ring-red-500"
                  : "focus:ring-indigo-500"
              }`}
              type="email"
              id="email"
              name="email"
              value={formData.info.email || ""}
              onChange={(e) => handleInfoChange(e)}
              required
            />
            {hasError("email") && (
              <p className="text-red-500 text-sm mt-1">
                {validationErrors.email}
              </p>
            )}
          </div>

          {/* PHONE NUMBER */}
          <div className="col-span-1">
            <div className="relative">
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="phone_number"
              >
                Phone Number
                <span className="text-red-600 ml-1">*</span>
              </label>
              <div
                className={`flex rounded-lg border ${
                  hasError("phone_number")
                    ? "border-red-500 focus-within:ring-2 focus-within:ring-red-500"
                    : "focus-within:ring-2 focus-within:ring-indigo-500"
                } relative`}
              >
                {/* ... (Giữ nguyên phần chọn mã quốc gia) ... */}
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
                  id="phone_number"
                  name="phone_number"
                  pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                  minLength={10}
                  maxLength={14}
                  value={formData.info.phone_number || ""}
                  onChange={(e) => handleInfoChange(e)}
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
              {hasError("phone_number") && (
                <p className="text-red-500 text-sm mt-1">
                  {validationErrors.phone_number}
                </p>
              )}
            </div>
          </div>

          {/* FIRST NAME */}
          <div className="col-span-1">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="first_name"
            >
              First Name
              <span className="text-red-600 ml-1">*</span>
            </label>
            <input
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                hasError("first_name")
                  ? "border-red-500 focus:ring-red-500"
                  : "focus:ring-indigo-500"
              }`}
              type="text"
              id="first_name"
              name="first_name"
              value={formData.info.first_name || ""}
              onChange={(e) => handleInfoChange(e)}
              required
            />
            {hasError("first_name") && (
              <p className="text-red-500 text-sm mt-1">
                {validationErrors.first_name}
              </p>
            )}
          </div>

          {/* LAST NAME */}
          <div className="col-span-1">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="last_name"
            >
              Last Name
              <span className="text-red-600 ml-1">*</span>
            </label>
            <input
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                hasError("last_name")
                  ? "border-red-500 focus:ring-red-500"
                  : "focus:ring-indigo-500"
              }`}
              type="text"
              id="last_name"
              name="last_name"
              value={formData.info.last_name || ""}
              onChange={(e) => handleInfoChange(e)}
              required
            />
            {hasError("last_name") && (
              <p className="text-red-500 text-sm mt-1">
                {validationErrors.last_name}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="p-6 sm:p-8 border border-gray-200 rounded-xl mb-8">
        <h2 className="text-xl font-bold mb-4">Emergency Contact</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* EMERGENCY NAME */}
          <div className="col-span-1">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="emergency_name"
            >
              Full name <span className="text-red-600 ml-1">(*)</span>
            </label>
            <input
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                hasError("emergency_name")
                  ? "border-red-500 focus:ring-red-500"
                  : "focus:ring-indigo-500"
              }`}
              type="text"
              id="emergency_name"
              name="emergency_name"
              placeholder="Your full name"
              value={formData.info.emergency_name || ""}
              onChange={(e) => handleInfoChange(e)}
              required
            />
            {hasError("emergency_name") && (
              <p className="text-red-500 text-sm mt-1">
                {validationErrors.emergency_name}
              </p>
            )}
          </div>

          {/* RELATIONSHIP */}
          <div className="col-span-1">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="emergency_relationship"
            >
              Relationship <span className="text-red-600 ml-1">(*)</span>
            </label>
            <select
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                hasError("emergency_relationship")
                  ? "border-red-500 focus:ring-red-500"
                  : "focus:ring-indigo-500"
              }`}
              id="emergency_relationship"
              name="emergency_relationship"
              value={formData.info.emergency_relationship || ""}
              onChange={(e) => handleInfoChange(e)}
              required
            >
              <option value="">Please select</option>
              <option value="Spouse">Spouse</option>
              <option value="Child">Child</option>
              <option value="Parent">Parent</option>
              <option value="Sibling">Sibling</option>
              <option value="Grandparent">Grandparent</option>
            </select>
            {hasError("emergency_relationship") && (
              <p className="text-red-500 text-sm mt-1">
                {validationErrors.emergency_relationship}
              </p>
            )}
          </div>

          <div className="col-span-1">
            <div className="relative">
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="emergency_phone_number"
              >
                Phone Number
                <span className="text-red-600 ml-1">*</span>
              </label>
              <div
                className={`flex rounded-lg border ${
                  hasError("emergency_phone_number")
                    ? "border-red-500 focus-within:ring-2 focus-within:ring-red-500"
                    : "focus-within:ring-2 focus-within:ring-indigo-500"
                } relative`}
              >
                <button
                  type="button"
                  className="flex items-center justify-center px-4 text-sm text-gray-700 border-r border-gray-300 rounded-l-lg focus:outline-none"
                  onClick={() =>
                    setIsCountryEmergencyDropdownOpen(
                      !isCountryEmergencyDropdownOpen
                    )
                  }
                >
                  <img
                    src={selectedCountryEmergency.flag}
                    alt=""
                    width={25}
                    height={25}
                    className="mr-2"
                  />
                  <span>{selectedCountryEmergency.dialCode}</span>
                  <svg
                    className={`ml-2 w-4 h-4 transition-transform ${
                      isCountryEmergencyDropdownOpen ? "rotate-180" : ""
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
                  id="emergency_phone_number"
                  name="emergency_phone_number"
                  value={formData.info.emergency_phone_number || ""}
                  onChange={(e) => handleInfoChange(e)}
                  required
                />
              </div>
              {isCountryEmergencyDropdownOpen && (
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
                        onClick={() => handleCountrySelectEmergency(country)}
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
              {hasError("emergency_phone_number") && (
                <p className="text-red-500 text-sm mt-1">
                  {validationErrors.emergency_phone_number}
                </p>
              )}
            </div>
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
          {/* Thay đổi type="submit" thành type="button" và gọi hàm handleNext */}
          {isLoading ? (
            <button
              disabled
              type="button"
              className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700 transition-colors duration-200"
            >
              <svg
                aria-hidden="true"
                role="status"
                className="inline w-4 h-4 me-3 text-white animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>
              Loading...
            </button>
          ) : (
            <button
              type="button"
              className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700 transition-colors duration-200"
              onClick={handleNext}
            >
              Next Step
            </button>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
