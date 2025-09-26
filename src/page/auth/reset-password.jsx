import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import axios from "../../axios/axios";
import { ValidationItem } from "../../components/Validate";

export const ResetPassword = () => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const query = useMemo(() => new URLSearchParams(window.location.search), []);
  const navigate = useNavigate();

  useEffect(() => {
    if (!query.get("token")) {
      navigate("/");
    }
  }, [query, navigate]);

  const [validation, setValidation] = useState({
    length: false,
    lowercase: false,
    uppercase: false,
    digitOrSpecial: false,
  });
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d|.*[\W_]).*$/;

  const validators = {
    lowercase: /[a-z]/,
    uppercase: /[A-Z]/,
    digitOrSpecial: /[\d\W_]/,
  };

  const handleFormData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === "password") {
      const newPassword = e.target.value;
      const newValidation = {
        length: newPassword.length >= 8,
        lowercase: validators.lowercase.test(newPassword),
        uppercase: validators.uppercase.test(newPassword),
        digitOrSpecial: validators.digitOrSpecial.test(newPassword),
      };

      setValidation(newValidation);
      setIsPasswordValid(passwordRegex.test(newPassword));
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });
    setIsLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setMessage({ text: "Passwords do not match.", type: "error" });
      setIsLoading(false);
      return;
    }

    if (!isPasswordValid) {
      setMessage({ text: "Invalid password format.", type: "error" });
      setIsLoading(false);
      return;
    }

    try {
      // In a real app, the reset token would be in a query parameter.
      // For this example, we'll use a placeholder.
      const token = query.get("token");
      const { data } = await axios.post(
        `/auth/reset-password/?token=${token}`,
        {
          password: formData.password,
          passwordConfirm: formData.confirmPassword,
        }
      );
      if (data.status === "success") {
        setMessage({
          text: data.data,
          type: "success",
        });
        setIsLoading(false);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      console.error("Password reset failed:", error);
      const errorMessage =
        error.response?.data?.message ||
        "Failed to reset password. Please try again.";
      setMessage({ text: errorMessage, type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  const getMessageClasses = (type) => {
    if (!type) return "hidden";
    return `p-3 rounded-md text-sm text-center font-medium ${
      type === "success"
        ? "bg-green-100 text-green-800"
        : "bg-red-100 text-red-800"
    }`;
  };

  return (
    <div className="bg-[url('https://evisastoindia.org/wp-content/uploads/2022/12/get-evisa.png')] bg-cover bg-center min-h-screen flex items-center justify-center p-4">
      <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-xl shadow-2xl p-8 md:p-12 w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Reset Password</h2>
        </div>

        <form className="space-y-6" onSubmit={handleResetPassword}>
          <div className={getMessageClasses(message.type)}>{message.text}</div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              New Password
            </label>
            <div className="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter new password"
                required
                value={formData.password}
                onChange={(e) => handleFormData(e)}
                className="block w-full rounded-md border border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
              />
              <ul className="space-y-2 font-medium mt-2 text-xs italic">
                <ValidationItem
                  isValid={formData.password.length >= 8}
                  text="At least 8 characters long"
                />
                <ValidationItem
                  isValid={validation.lowercase}
                  text="At least one lowercase letter"
                />
                <ValidationItem
                  isValid={validation.uppercase}
                  text="At least one uppercase letter"
                />
                <ValidationItem
                  isValid={validation.digitOrSpecial}
                  text="At least one number or special character"
                />
              </ul>
            </div>
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm New Password
            </label>
            <div className="mt-1">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm new password"
                required
                value={formData.confirmPassword}
                onChange={(e) => handleFormData(e)}
                className="block w-full rounded-md border border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold text-white transition-colors duration-200 ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              }`}
            >
              <span id="buttonText">
                {isLoading ? "Resetting..." : "Reset Password"}
              </span>
              {isLoading && (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
