import React, { useState, useEffect } from "react";
import {
  CheckCircle,
  XCircle,
  Info,
  FileText,
  Lock,
  Edit,
  Home,
} from "lucide-react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { useNavigate } from "react-router-dom";

const visaData = {
  isValid: true,
  visaType: "Tourist",
  country: "United Kingdom",
  expirationDate: "2025-12-31",
};

const customerInfoData = {
  name: "John Doe",
  email: "john.doe@example.com",
  passportNumber: "A12345678",
  dateOfBirth: "1990-05-15",
  address: "123 Main St, Anytown, USA",
};

const evisaHistoryData = [
  {
    id: 1,
    type: "Tourist",
    country: "France",
    issueDate: "2024-03-10",
    status: "Approved",
  },
  {
    id: 2,
    type: "Business",
    country: "Germany",
    issueDate: "2023-09-22",
    status: "Expired",
  },
  {
    id: 3,
    type: "Student",
    country: "Canada",
    issueDate: "2022-01-05",
    status: "Expired",
  },
];

export const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeSection, setActiveSection] = useState("information");
  const [profileData, setProfileData] = useState({
    visa: null,
    customer: null,
    history: null,
  });
  const navigate = useNavigate();

  // State for the password change form
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Simulate fetching data from an API
    const fetchData = async () => {
      try {
        setLoading(true);
        // Using a setTimeout to mimic network latency
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setProfileData({
          visa: visaData,
          customer: customerInfoData,
          history: evisaHistoryData,
        });
        setError(null);
      } catch (err) {
        setError("Failed to fetch profile data. Please try again.");
        setProfileData({ visa: null, customer: null, history: null });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case "Approved":
        return <CheckCircle className="text-green-500 w-5 h-5" />;
      case "Expired":
        return <XCircle className="text-red-500 w-5 h-5" />;
      default:
        return null;
    }
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    setMessage("");

    if (newPassword !== confirmNewPassword) {
      setMessage("New passwords do not match.");
      return;
    }

    if (newPassword.length < 6) {
      setMessage("New password must be at least 6 characters long.");
      return;
    }

    // Simulate API call for password change
    setTimeout(() => {
      // In a real app, you would send data to a backend
      console.log("Password change initiated for user.");
      setMessage("Password changed successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    }, 1000);
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-full">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
            <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
              Loading profile...
            </p>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex items-center justify-center h-full">
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md shadow-md"
            role="alert"
          >
            <p className="font-bold">Error</p>
            <p className="text-sm">{error}</p>
          </div>
        </div>
      );
    }

    const { visa, customer, history } = profileData;

    switch (activeSection) {
      case "visa":
        return (
          <section className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-inner">
            <h2 className="flex items-center text-xl font-semibold text-gray-900 dark:text-white mb-4">
              <CheckCircle className="text-indigo-500 mr-2" />
              Visa Status
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 dark:text-gray-300">
              <div className="flex items-center">
                <span className="font-medium mr-2">Status:</span>
                <span
                  className={`font-bold ${
                    visa.isValid ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {visa.isValid ? "Valid" : "Invalid"}
                </span>
              </div>
              <div>
                <span className="font-medium">Type:</span> {visa.visaType}
              </div>
              <div>
                <span className="font-medium">Country:</span> {visa.country}
              </div>
              <div>
                <span className="font-medium">Expiration:</span>{" "}
                {visa.expirationDate}
              </div>
            </div>
          </section>
        );
      case "information":
        return (
          <section className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-inner">
            <h2 className="flex items-center text-xl font-semibold text-gray-900 dark:text-white mb-4">
              <Info className="text-indigo-500 mr-2" />
              Customer Information
            </h2>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                <span className="font-medium">Passport Number:</span>{" "}
                {customer.passportNumber}
              </li>
              <li>
                <span className="font-medium">Date of Birth:</span>{" "}
                {customer.dateOfBirth}
              </li>
              <li>
                <span className="font-medium">Address:</span> {customer.address}
              </li>
            </ul>
          </section>
        );
      case "history":
        return (
          <section className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-inner">
            <h2 className="flex items-center text-xl font-semibold text-gray-900 dark:text-white mb-4">
              <FileText className="text-indigo-500 mr-2" />
              E-Visa History
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead>
                  <tr className="bg-gray-200 dark:bg-gray-600">
                    <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-200 font-medium">
                      ID
                    </th>
                    <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-200 font-medium">
                      Type
                    </th>
                    <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-200 font-medium">
                      Country
                    </th>
                    <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-200 font-medium">
                      Issue Date
                    </th>
                    <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-200 font-medium">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((item, index) => (
                    <tr
                      key={item.id}
                      className={`${
                        index % 2 === 0
                          ? "bg-white dark:bg-gray-800"
                          : "bg-gray-50 dark:bg-gray-700"
                      } border-b dark:border-gray-600`}
                    >
                      <td className="px-4 py-2 text-gray-700 dark:text-gray-300">
                        {item.id}
                      </td>
                      <td className="px-4 py-2 text-gray-700 dark:text-gray-300">
                        {item.type}
                      </td>
                      <td className="px-4 py-2 text-gray-700 dark:text-gray-300">
                        {item.country}
                      </td>
                      <td className="px-4 py-2 text-gray-700 dark:text-gray-300">
                        {item.issueDate}
                      </td>
                      <td className="px-4 py-2 flex items-center text-gray-700 dark:text-gray-300">
                        {getStatusIcon(item.status)}
                        <span className="ml-2">{item.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        );
      case "changePassword":
        return (
          <section className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-inner">
            <h2 className="flex items-center text-xl font-semibold text-gray-900 dark:text-white mb-4">
              <Lock className="text-indigo-500 mr-2" />
              Change Password
            </h2>
            <form
              onSubmit={handlePasswordChange}
              className="space-y-4 text-gray-700 dark:text-gray-300"
            >
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="currentPassword"
                >
                  Current Password
                </label>
                <input
                  type="password"
                  id="currentPassword"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="newPassword"
                >
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="confirmNewPassword"
                >
                  Confirm New Password
                </label>
                <input
                  type="password"
                  id="confirmNewPassword"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring focus:ring-indigo-500"
                  required
                />
              </div>
              {message && (
                <p
                  className={`text-sm font-medium ${
                    message.includes("successfully")
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {message}
                </p>
              )}
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors focus:outline-none focus:ring focus:ring-indigo-500"
              >
                Change Password
              </button>
            </form>
          </section>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Header />
      <div className=" bg-gray-100 dark:bg-gray-900 p-4 sm:p-8 flex flex-col items-center">
        <div className="w-full max-w-6xl p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md space-y-8 md:space-y-0 md:flex md:space-x-8">
          {/* Navigation Sidebar */}
          <div className="w-full md:w-1/4 flex flex-col space-y-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              My Profile
            </h2>
            <button
              onClick={() => setActiveSection("information")}
              className={`flex items-center w-full px-4 py-3 rounded-lg font-medium transition-colors ${
                activeSection === "information"
                  ? "bg-indigo-600 text-white shadow-md"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              <Info className="w-5 h-5 mr-3" />
              Customer Information
            </button>
            <button
              onClick={() => setActiveSection("visa")}
              className={`flex items-center w-full px-4 py-3 rounded-lg font-medium transition-colors ${
                activeSection === "visa"
                  ? "bg-indigo-600 text-white shadow-md"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              <CheckCircle className="w-5 h-5 mr-3" />
              My Visa
            </button>
            <button
              onClick={() => setActiveSection("history")}
              className={`flex items-center w-full px-4 py-3 rounded-lg font-medium transition-colors ${
                activeSection === "history"
                  ? "bg-indigo-600 text-white shadow-md"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              <FileText className="w-5 h-5 mr-3" />
              E-Visa History
            </button>
            <button
              onClick={() => setActiveSection("changePassword")}
              className={`flex items-center w-full px-4 py-3 rounded-lg font-medium transition-colors ${
                activeSection === "changePassword"
                  ? "bg-indigo-600 text-white shadow-md"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              <Lock className="w-5 h-5 mr-3" />
              Change Password
            </button>
          </div>

          {/* Content Area */}
          <div className="w-full md:w-3/4 mt-8 md:mt-0 min-h-[400px]">
            <div className="flex justify-end ">
              <button
                onClick={() => navigate("/")}
                className="flex items-center sm:relative sm:top-0 absolute top-24 mt-1 mb-3 text-gray-700 justify-start dark:text-gray-300 text-sm md:text-base font-medium px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <Home className="w-4 h-4 mr-2" />
                Back to Home
              </button>
            </div>
            {renderContent()}
          </div>
        </div>
      </div>

      <div className=" bg-gray-100 dark:bg-gray-900 p-4 sm:p-8 flex flex-col items-center">
        <div className="w-full max-w-6xl p-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl space-y-8 md:space-y-0 md:space-x-8">
          <section className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-inner">
            <h2 className="flex items-center text-xl font-semibold text-gray-900 dark:text-white mb-4">
              <Edit className="text-indigo-500 mr-2" />
              Update Information
            </h2>
            <form
              //   onSubmit={handleUpdateInformation}
              className="grid grid-cols-2 text-gray-700 dark:text-gray-300"
            >
              <div className="col-span-1 mr-2">
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="first_name"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  //   value={updateFormData.name}
                  //   onChange={handleUpdateChange}
                  className="w-full px-2 py-1 sm:px-3 sm:py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring focus:ring-indigo-500"
                  required
                />
              </div>
              <div className="col-span-1">
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="last_name"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  //   value={updateFormData.name}
                  //   onChange={handleUpdateChange}
                  className="w-full px-2 py-1 sm:px-3 sm:py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring focus:ring-indigo-500"
                  required
                />
              </div>
              <div className="col-span-2 my-2">
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  //   value={updateFormData.email}
                  //   onChange={handleUpdateChange}
                  className="w-full px-2 py-1 sm:px-3 sm:py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring focus:ring-indigo-500"
                  required
                />
              </div>
              <div className="col-span-1 mr-2">
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="passportNumber"
                >
                  Passport Number
                </label>
                <input
                  type="text"
                  id="passportNumber"
                  name="passportNumber"
                  //   value={updateFormData.passportNumber}
                  //   onChange={handleUpdateChange}
                  className="w-full px-2 py-1 sm:px-3 sm:py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring focus:ring-indigo-500"
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="dateOfBirth"
                >
                  Date of Birth
                </label>
                <input
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  //   value={updateFormData.dateOfBirth}
                  //   onChange={handleUpdateChange}
                  className="w-full px-2 py-1 sm:px-3 sm:py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring focus:ring-indigo-500"
                />
              </div>
              <div className="col-span-2">
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="address"
                >
                  Address
                </label>
                <textarea
                  id="address"
                  name="address"
                  //   value={updateFormData.address}
                  //   onChange={handleUpdateChange}
                  className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring focus:ring-indigo-500"
                ></textarea>
              </div>
              {/* {updateMessage && (
                <p
                  className={`text-sm font-medium ${
                    updateMessage.includes("successfully")
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {updateMessage}
                </p>
              )} */}
              <button
                type="submit"
                className="w-full bg-indigo-600 col-span-2 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors focus:outline-none focus:ring focus:ring-indigo-500"
              >
                Save Changes
              </button>
            </form>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};
