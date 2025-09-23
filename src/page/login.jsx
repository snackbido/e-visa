import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { login, reset } from "../features/slice/auth.slice";

export function Login({ currentUser }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Lấy trạng thái từ store
  const { user, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  let buttonText = "Login";
  let buttonClasses = "bg-blue-600 hover:bg-blue-700";
  let buttonContent = buttonText;

  if (isLoading) {
    buttonContent = (
      <div className="flex items-center justify-center gap-2">
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
        <span>Loading...</span>
      </div>
    );
    buttonClasses = "bg-blue-400 cursor-not-allowed";
  }
  if (success) {
    buttonContent = (
      <div className="flex items-center justify-center gap-2">
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2l4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <span>Done</span>
      </div>
    );
    buttonClasses = "bg-green-500 hover:bg-green-600";
  } else if (!formData.password) {
    buttonClasses = "bg-indigo-700";
  }

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 2000);
        if (currentUser && currentUser.role === "user") {
          navigate("/");
        } else {
          navigate("/admin");
        }
      }, 3000);
    }
    // Đặt lại trạng thái sau khi hoàn thành
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch, currentUser]);

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleFormData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validEmail = validateEmail(formData.email);

    if (!formData.email || !formData.password) {
      toast.error("Please fill all fields");
      return;
    }

    if (!validEmail) {
      toast.error("Invalid email");
    }

    dispatch(login(formData));
  };

  return (
    <>
      <div className="py-16">
        <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
          <div className="hidden lg:block rounded-lg lg:w-1/2 bg-cover bg-[url(https://thumbs.dreamstime.com/b/visa-passport-to-approved-stamped-document-top-view-immigration-approve-129787032.jpg)]"></div>
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
                or login with email
              </Link>
              <span className="border-b w-1/5 lg:w-1/4"></span>
            </div>
            <form action="" onSubmit={handleSubmit}>
              <div className="mt-4">
                <label
                  htmlFor="email"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Email Address
                </label>
                <input
                  value={formData.email}
                  onChange={handleFormData}
                  className="text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                  type="email"
                  name="email"
                  id="email"
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
                  <Link to="#" className="text-xs text-gray-500">
                    Forget Password?
                  </Link>
                </div>
                <input
                  onChange={handleFormData}
                  value={formData.password}
                  className="text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                  type="password"
                  name="password"
                  id="password"
                />
              </div>
              <div className="mt-8">
                <button
                  disabled={isLoading}
                  className={`${buttonClasses} text-white font-bold py-2 px-4 w-full rounded hover:bg-indigo-600`}
                >
                  {buttonContent}
                </button>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="border-b w-1/5 md:w-1/4"></span>
                <span className="text-xs text-gray-500 uppercase">or</span>
                <span className="border-b w-1/5 md:w-1/4"></span>
              </div>
              <div className="text-center mt-4 text-gray-500">
                You haven't an account?{" "}
                <Link to="/register" className="text-indigo-500 font-bold">
                  Sign up
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
