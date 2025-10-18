import { useState, useEffect } from "react";
import {
  CheckCircle,
  XCircle,
  Info,
  FileText,
  Lock,
  Home,
  BanknoteX,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "../axios/axios";
import { UpdateInformation } from "../components/form/UpdateInformation";
import { ChangePassword } from "../components/form/ChangePassword";

export const Profile = ({ user }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeSection, setActiveSection] = useState("information");
  const [profileData, setProfileData] = useState({
    visa: null,
    customer: null,
    history: null,
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate fetching data from an API
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`/visa/history/${user.id}`);
        if (data.status === "success") {
          await new Promise((resolve) => setTimeout(resolve, 1500));
          setProfileData({
            visa: data.data[0],
            history: data.data,
          });
        }

        setError(null);
      } catch (err) {
        setError("Failed to fetch profile data. Please try again.");
        setProfileData({ visa: null, customer: null, history: null });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const getStatusIcon = (status) => {
    switch (status) {
      case "Approved":
        return <CheckCircle className="text-green-500 w-5 h-5" />;
      case "Waiting Approve":
        return <Info className="text-yellow-500 w-5 h-5" />;
      case "Rejected":
        return <XCircle className="text-red-500 w-5 h-5" />;
      case "Expires":
        return <BanknoteX className="text-gray-500 w-5 h-5" />;
      default:
        return null;
    }
  };

  const calculateDateOfExpiryVisa = (timeOfVisa, approvedDate) => {
    const startDate = new Date(approvedDate);

    if (isNaN(startDate.getTime())) {
      return "Invalid started date";
    }

    if (timeOfVisa.includes("1 month")) {
      startDate.setDate(startDate.getDate() + 29);
    } else {
      startDate.setDate(startDate.getDate() + 89);
    }
    const year = startDate.getFullYear();
    const month = String(startDate.getMonth() + 1).padStart(2, "0");
    const day = String(startDate.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-full">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
            <p className="mt-4 text-lg text-gray-700">Loading profile...</p>
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

    const { visa, history } = profileData;

    switch (activeSection) {
      case "visa":
        return (
          <section className="bg-gray-50 p-6 rounded-lg shadow-inner">
            <h2 className="flex items-center text-xl font-semibold text-gray-900 mb-4">
              <CheckCircle className="text-indigo-500 mr-2" />
              Visa Information
            </h2>
            {visa ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                <div className="flex items-center">
                  <span className="font-medium mr-2">Status:</span>
                  <span
                    className={`font-bold ${
                      visa?.status === "Approved"
                        ? "text-green-600"
                        : visa?.status === "Waiting Approve"
                        ? "text-yellow-400"
                        : "text-red-600"
                    }`}
                  >
                    {visa.status}
                  </span>
                </div>
                <div>
                  <span className="font-medium">Full Name:</span>{" "}
                  {visa.last_name + " " + visa.first_name}
                </div>
                <div>
                  <span className="font-medium">Email:</span> {visa.email}
                </div>
                <div>
                  <span className="font-medium">Phone Number:</span>{" "}
                  {visa.phone_number}
                </div>
                <div>
                  <span className="font-medium">Nationality:</span>{" "}
                  {visa.nationality}
                </div>
                <div>
                  <span className="font-medium">Visa Time:</span>{" "}
                  {visa.time_of_visa}
                </div>
                <div>
                  <span className="font-medium">Visa Type:</span>{" "}
                  {visa.type_of_visa}
                </div>
                <div>
                  <span className="font-medium">Processing Time:</span>{" "}
                  {visa.processing_time}
                </div>
                <div>
                  <span className="font-medium">Purpose of Visit:</span>{" "}
                  {visa.purpose_of_visit}
                </div>
                <div>
                  <span className="font-medium">Arrival Date:</span>{" "}
                  {visa.date_of_arrival}
                </div>
                <div>
                  <span className="font-medium">Expiration:</span>{" "}
                  {(visa.status === "Approved" || visa.status === "Expires") &&
                    calculateDateOfExpiryVisa(
                      visa.time_of_visa,
                      visa.updated_at
                    )}
                </div>
                <div>
                  <span className="font-medium">Applicants:</span>{" "}
                  {visa.applicant.length}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                <h2 className="text-gray-500 font-bold text-lg">
                  You don't have any visa
                </h2>
              </div>
            )}
          </section>
        );
      case "information":
        return (
          <section className="bg-gray-50 p-6 rounded-lg shadow-inner">
            <h2 className="flex items-center text-xl font-semibold text-gray-900 mb-4">
              <Info className="text-custom mr-2" />
              Customer Information
            </h2>
            <ul className="space-y-2 text-gray-700">
              <li>
                <span className="font-medium">Email:</span> {user.email}
              </li>
              <li>
                <span className="font-medium">First Name:</span>{" "}
                {user.first_name}
              </li>
              <li>
                <span className="font-medium">Last Name:</span> {user.last_name}
              </li>
              <li>
                <span className="font-medium">Phone Number:</span>{" "}
                {user.phone_number || "No information"}
              </li>
              <li>
                <span className="font-medium">Nationality:</span>{" "}
                {user.nationality || "No information"}
              </li>
            </ul>
          </section>
        );
      case "history":
        return (
          <section className="bg-gray-50 p-6 rounded-lg shadow-inner">
            <h2 className="flex items-center text-xl font-semibold text-gray-900 mb-4">
              <FileText className="text-custom mr-2" />
              E-Visa History
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="px-4 py-2 text-left text-gray-600 font-medium">
                      ID
                    </th>
                    <th className="px-4 py-2 text-left text-gray-600 font-medium">
                      Type
                    </th>
                    <th className="px-4 py-2 text-left text-gray-600 font-medium">
                      Country
                    </th>
                    <th className="px-8 py-2 text-left text-gray-600 font-medium">
                      Expiry Date
                    </th>
                    <th className="px-4 py-2 text-left text-gray-600 font-medium">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((item, index) => (
                    <tr
                      key={item.id}
                      className={`${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      } border-b `}
                    >
                      <td className="px-4 py-2 text-gray-700">
                        {item.public_id}
                      </td>
                      <td className="px-4 py-2 text-gray-700">
                        {item.type_of_visa}
                      </td>
                      <td className="px-4 py-2 text-gray-700">
                        {item.nationality}
                      </td>
                      <td className="px-4 py-2 text-gray-700">
                        {(item.status === "Approved" ||
                          visa.status === "Expires") &&
                          calculateDateOfExpiryVisa(
                            item.time_of_visa,
                            item.updated_at
                          )}
                      </td>
                      <td className="px-4 py-2 flex items-center text-gray-700 my-5">
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
        return <ChangePassword />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className=" bg-gray-100 p-4 sm:p-8 flex flex-col items-center">
        <div className="w-full max-w-6xl p-6 bg-white rounded-lg shadow-md space-y-8 md:space-y-0 md:flex md:space-x-8">
          {/* Navigation Sidebar */}
          <div className="w-full md:w-1/4 flex flex-col space-y-4">
            <h2 className="text-xl font-bold text-gray-900 mb-2">My Profile</h2>
            <button
              onClick={() => setActiveSection("information")}
              className={`flex items-center w-full px-4 py-3 rounded-lg font-medium transition-colors ${
                activeSection === "information"
                  ? "bg-custom text-white shadow-md"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              <Info className="w-5 h-5 mr-3" />
              Customer Information
            </button>
            <button
              onClick={() => setActiveSection("visa")}
              className={`flex items-center w-full px-4 py-3 rounded-lg font-medium transition-colors ${
                activeSection === "visa"
                  ? "bg-custom text-white shadow-md"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              <CheckCircle className="w-5 h-5 mr-3" />
              My Visa
            </button>
            <button
              onClick={() => setActiveSection("history")}
              className={`flex items-center w-full px-4 py-3 rounded-lg font-medium transition-colors ${
                activeSection === "history"
                  ? "bg-custom text-white shadow-md"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              <FileText className="w-5 h-5 mr-3" />
              E-Visa History
            </button>
            <button
              onClick={() => setActiveSection("changePassword")}
              className={`flex items-center w-full px-4 py-3 rounded-lg font-medium transition-colors ${
                activeSection === "changePassword"
                  ? "bg-custom text-white shadow-md"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300 "
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
                className="flex items-center sm:relative sm:top-0 absolute top-24 mt-1 mb-3 text-gray-700 justify-start text-sm md:text-base font-medium px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Home className="w-4 h-4 mr-2" />
                Back to Home
              </button>
            </div>
            {renderContent()}
          </div>
        </div>
      </div>

      <UpdateInformation currentUser={user} />
    </>
  );
};
