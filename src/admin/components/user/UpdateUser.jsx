import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import countries from "../../../data.json";

const UpdateUserModal = ({ isOpen, onClose, userData, onUpdate }) => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    nationality: "",
    role: "",
  });

  const validatePhone = (phone) => {
    return String(phone).match(
      /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/g
    );
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

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

  // Cập nhật formData khi userData thay đổi
  useEffect(() => {
    if (userData) {
      setFormData(userData);
    }
  }, [userData]);

  // Xử lý khi input thay đổi
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Xử lý khi form được submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const validEmail = validateEmail(formData.email);
    const validPhone = validatePhone(formData.phone_number);

    if (!validEmail) {
      toast.error("Invalid email");
      return;
    }

    if (!validPhone) {
      toast.error("Invalid phone number");
      return;
    }

    const body = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      email: formData.email,
      phone_number:
        formData.nationality.split(" ")[0] +
        " " +
        (formData.phone_number[0] === "+"
          ? formData.phone_number.split(" ")[1]
          : formData.phone_number),
      nationality: formData.nationality.split(" ")[1],
      role: formData.role,
    };

    onUpdate(body);
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            Update user information
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 transition duration-150 ease-in-out rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <svg
              className="w-6 h-6"
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
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
              htmlFor="first_name"
            >
              First Name
            </label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              value={formData.first_name || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
          </div>
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
              htmlFor="last_name"
            >
              Last Name
            </label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              value={formData.last_name || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
          </div>
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
          </div>
          <div className="mb-6">
            <label
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
              htmlFor="phone_number"
            >
              Phone Number
            </label>
            <input
              type="text"
              id="phone_number"
              name="phone_number"
              value={formData.phone_number || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
          </div>
          <div className="mb-6">
            <label
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
              htmlFor="nationality"
            >
              Nationality
            </label>
            <select
              value={formData.nationality || ""}
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-white dark:border-gray-600"
              id="nationality"
              name="nationality"
              onChange={handleChange}
            >
              <option>{formData.nationality}</option>
              {data.map((country) => (
                <option
                  key={country.code}
                  value={country.dialCode + " " + country.name}
                >
                  {country.name} ({country.dialCode})
                </option>
              ))}
            </select>
          </div>
          <div className="mb-6">
            <label
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
              htmlFor="role"
            >
              Role
            </label>
            <select
              id="role"
              name="role"
              value={formData.role || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-white dark:border-gray-600"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="flex items-center justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 mr-2 font-bold text-gray-800 transition duration-150 ease-in-out bg-gray-300 rounded hover:bg-gray-400 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 font-bold text-white transition duration-150 ease-in-out bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateUserModal;
