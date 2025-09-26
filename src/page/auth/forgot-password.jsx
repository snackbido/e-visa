import { useState } from "react";
import axios from "../../axios/axios";
import { Link } from "react-router-dom";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleRequestReset = async (e) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });
    setIsLoading(true);

    try {
      const { data } = await axios.post("/auth/forgot-password", { email });
      if (data.status === "success") {
        setMessage({
          text: "If your email is in our system, a password reset link has been sent.",
          type: "success",
        });
        setIsLoading(false);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Failed to send reset link. Please try again.";
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
    <div className="bg-[url('https://th.bing.com/th/id/R.d524175591f793351f7bf1e1f91f54b3?rik=DxojDTq270ptPA&pid=ImgRaw&r=0')] bg-cover bg-center min-h-screen flex items-center justify-center p-4">
      <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-xl shadow-2xl p-8 md:p-12 w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Forgot Password</h2>
          <p className="text-gray-600 mt-2">
            Enter your email to receive a password reset link.
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleRequestReset}>
          <div className={getMessageClasses(message.type)}>{message.text}</div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email address"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                {isLoading ? "Sending..." : "Send Reset Link"}
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

        <div className="mt-6 text-center text-sm">
          <Link
            to="/login"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};
