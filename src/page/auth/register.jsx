import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { register, reset } from "../../features/slice/auth.slice";
import { ValidationItem } from "../../components/Validate";

export function Register() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
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

    if (
      !formData.first_name ||
      !formData.last_name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
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
            <p className="text-xl sm:text-2xl font-bold text-custom text-center">
              E-Visa
            </p>
            <p className="text-xl text-gray-600 text-center">Welcome back!</p>
            <div className="mt-4 flex items-center justify-between">
              {/* <span className="border-b w-1/5 lg:w-1/4"></span>
              <Link
                to="#"
                className="text-xs text-center text-gray-500 uppercase"
              >
                or register with email
              </Link>
              <span className="border-b w-1/5 lg:w-1/4"></span> */}
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
                    value={formData.first_name}
                    onChange={(e) => handleFormData(e)}
                    className="text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                    type="text"
                    id="first_name"
                    name="first_name"
                  />
                </div>
                <div className="col-span-1">
                  <label
                    htmlFor="last_name"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Last Name
                  </label>
                  <input
                    value={formData.last_name}
                    onChange={(e) => handleFormData(e)}
                    className="text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                    type="text"
                    id="last_name"
                    name="last_name"
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
                <ul className="space-y-2 font-medium text-xs italic mt-2">
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
                <button className="bg-custom text-white font-bold py-2 px-4 w-full rounded hover:bg-hover-custom">
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
              <Link to="/login" className="text-custom font-bold">
                Login
              </Link>
            </div>
          </div>
          <div className="hidden lg:block rounded-lg lg:w-1/2 bg-cover bg-[url(https://i.abcnewsfe.com/a/142a631c-0076-484a-8761-3cb4ff109ea4/passport-1-rf-gty-bb-230331_1680282593067_hpMain_1x1.jpg?w=608)]"></div>
        </div>
      </div>
    </>
  );
}
