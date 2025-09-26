import { Lock } from "lucide-react";
import { useState } from "react";
import { ValidationItem } from "../Validate";
import axios from "../../axios/axios";
import { toast } from "react-toastify";

export function ChangePassword() {
  // State for the password change form
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [message, setMessage] = useState("");

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
    if (e.target.name === "newPassword") {
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

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setMessage("");

    if (formData.newPassword !== formData.confirmNewPassword) {
      setMessage("New passwords do not match.");
      return;
    }

    if (!isPasswordValid) {
      setMessage("invalid new password format.");
      return;
    }

    const { data } = await axios.patch(`/user/change-password`, {
      currentPassword: formData.currentPassword,
      newPassword: formData.newPassword,
    });

    if (data.status === "success") {
      toast.success(data.data);
      setTimeout(() => {
        setMessage("Password changed successfully!");
        setFormData({
          currentPassword: "",
          newPassword: "",
          confirmNewPassword: "",
        });
        window.location.reload();
      }, 1000);
    } else {
      setMessage(data.message || "Failed to change password.");
      return;
    }
  };
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
            name="currentPassword"
            value={formData.currentPassword || ""}
            onChange={(e) => handleFormData(e)}
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
            name="newPassword"
            value={formData.newPassword}
            onChange={(e) => handleFormData(e)}
            className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring focus:ring-indigo-500"
            required
          />
          <ul className="space-y-2 font-medium mt-2 text-xs italic">
            <ValidationItem
              isValid={formData.newPassword.length >= 8}
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
        <div>
          <label
            className="block text-sm font-medium mb-1"
            htmlFor="confirmNewPassword"
          >
            Confirm New Password
          </label>
          <input
            type="password"
            name="confirmNewPassword"
            id="confirmNewPassword"
            value={formData.confirmNewPassword}
            onChange={(e) => handleFormData(e)}
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
}
