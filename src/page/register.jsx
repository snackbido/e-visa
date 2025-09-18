import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { register, reset } from "../features/slice/auth.slice";
import { ValidationItem } from "../components/Validate";

export function Register() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [validation, setValidation] = useState({
    length: false,
    lowercase: false,
    uppercase: false,
    digitOrSpecial: false,
  });
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isError, isSuccess, message } = useSelector((state) => state.auth);

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d|.*[\W_]).*$/;

  const validators = {
    lowercase: /[a-z]/,
    uppercase: /[A-Z]/,
    digitOrSpecial: /[\d\W_]/,
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
      return;
    }
    // Nếu đăng ký thành công
    if (isSuccess) {
      toast.success(message || "Register successful, Please login");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
    dispatch(reset());
  }, [isError, isSuccess, message, navigate, dispatch]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validEmail = validateEmail(formData.email);

    if (!formData.email || !formData.password || !formData.confirmPassword) {
      toast.error("Please fill all field");
      return;
    }

    if (!validEmail) {
      toast.error("Invalid email");
      return;
    }

    if (!isPasswordValid) {
      toast.error("Invalid password");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Password does not match");
      return;
    }

    dispatch(register(formData));
  };
  return (
    <>
      <div className="py-16">
        <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
          <div className="w-full p-8 lg:w-1/2">
            <p className="text-xl sm:text-2xl font-bold text-indigo-600 text-center">
              E-Visa
            </p>
            <p className="text-xl text-gray-600 text-center">Welcome back!</p>
            <Link
              to="#"
              className="flex items-center justify-center mt-4 text-white rounded-lg shadow-md hover:bg-gray-100"
            >
              <div className="px-4 py-3">
                <svg className="h-6 w-6" viewBox="0 0 40 40">
                  <path
                    d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                    fill="#FFC107"
                  />
                  <path
                    d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                    fill="#FF3D00"
                  />
                  <path
                    d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                    fill="#4CAF50"
                  />
                  <path
                    d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                    fill="#1976D2"
                  />
                </svg>
              </div>
              <h1 className="px-4 py-3 w-5/6 text-center text-gray-600 font-bold">
                Sign in with Google
              </h1>
            </Link>
            <div className="mt-4 flex items-center justify-between">
              <span className="border-b w-1/5 lg:w-1/4"></span>
              <Link
                to="#"
                className="text-xs text-center text-gray-500 uppercase"
              >
                or register with email
              </Link>
              <span className="border-b w-1/5 lg:w-1/4"></span>
            </div>
            <form action="" onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="col-span-1">
                  <label
                    htmlFor="first_name"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    First Name
                  </label>
                  <input
                    value={formData.email}
                    onChange={(e) => handleFormData(e)}
                    className="text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                    type="text"
                    id="first_name"
                    name="first_name"
                  />
                </div>
                <div className="col-span-1">
                  <label
                    htmlFor="email"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    value={formData.email}
                    onChange={(e) => handleFormData(e)}
                    className="text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                    type="email"
                    id="email"
                    name="email"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label
                  htmlFor="email"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Email Address
                </label>
                <input
                  value={formData.email}
                  onChange={(e) => handleFormData(e)}
                  className="text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                  type="email"
                  id="email"
                  name="email"
                />
              </div>
              <div className="mt-4">
                <div className="flex justify-between">
                  <label
                    htmlFor="password"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Password
                  </label>
                </div>
                <input
                  value={formData.password}
                  onChange={(e) => handleFormData(e)}
                  className="text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                  type="password"
                  id="password"
                  name="password"
                />
                <ul className="space-y-2 font-medium">
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
              <div className="mt-4">
                <div className="flex justify-between">
                  <label
                    htmlFor="confirmPassword"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Confirm Password
                  </label>
                </div>
                <input
                  value={formData.confirmPassword}
                  onChange={(e) => handleFormData(e)}
                  className="text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                />
              </div>
              <div className="mt-8">
                <button className="bg-indigo-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-indigo-600">
                  Register
                </button>
              </div>
            </form>
            <div className="mt-4 flex items-center justify-between">
              <span className="border-b w-1/5 md:w-1/4"></span>
              <span className="text-xs text-gray-500 uppercase">or</span>
              <span className="border-b w-1/5 md:w-1/4"></span>
            </div>
            <div className="text-center mt-4 text-gray-500">
              You have already an account?{" "}
              <Link to="/login" className="text-indigo-500 font-bold">
                Login
              </Link>
            </div>
          </div>
          <div className="hidden lg:block rounded-lg lg:w-1/2 bg-cover bg-[url(https://i.abcnewsfe.com/a/142a631c-0076-484a-8761-3cb4ff109ea4/passport-1-rf-gty-bb-230331_1680282593067_hpMain_1x1.jpg?w=608)]"></div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
