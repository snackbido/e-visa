import { Edit } from "lucide-react";
import { useEffect, useState } from "react";
import countries from "../../data.json";
import axios from "../../axios/axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export function UpdateInformation({ currentUser }) {
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useSelector((state) => state.auth) || "";
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    first_name: userData?.first_name,
    last_name: userData?.last_name,
    email: userData?.email,
    nationality: userData?.nationality,
    phone_number: userData?.phone_number,
  });
  const [updateMessage, setUpdateMessage] = useState("");

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
          flag: country.flag,
        };
      })
      .sort((a, b) => a.name.localeCompare(b.name));
    return result;
  };
  const data = handleCountries();

  useEffect(() => {
    const fetchUserData = async () => {
      const { data } = await axios.get(`/user/${user}`);
      if (data.status === "success") {
        setUserData(data.data);
        setFormData({
          first_name: data.data.first_name,
          last_name: data.data.last_name,
          email: data.data.email,
          phone_number: data.data.phone_number,
          nationality: data.data.nationality,
        });
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      }
    };
    fetchUserData();
  }, [user]);

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

  const handleChangeFormData = (e) => {
    const { name, value } = e.target;
    let newValue = value;
    if (name === "phone_number") {
      newValue = formatPhoneNumber(value);
    }
    let newData = { ...formData };
    newData[name] = newValue;
    setFormData({ ...newData });
  };

  const handleUpdateInformation = async (e) => {
    e.preventDefault();
    // setIsLoading(true);
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

    setIsLoading(true);
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
    };
    const { data } = await axios.put(`/user/${userData.id}`, body);

    if (data.status === "success") {
      setTimeout(() => {
        setUpdateMessage("Information updated successfully!");
        setTimeout(() => {
          setUpdateMessage("");
          setIsLoading(false);
        }, 3000);

        window.location.reload();
      }, 2000);
    }
  };

  return (
    <div className=" bg-gray-100 p-4 sm:p-8 flex flex-col items-center">
      <div className="w-full max-w-6xl p-6 bg-white rounded-lg shadow-xl space-y-8 md:space-y-0 md:space-x-8">
        <section className="bg-gray-50 p-6 rounded-lg shadow-inner">
          <h2 className="flex items-center text-xl font-semibold text-gray-900 mb-4">
            <Edit className="text-custom mr-2" />
            Update Information
          </h2>
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-custom"></div>
                <p className="mt-4 text-lg text-gray-700">Loading...</p>
              </div>
            </div>
          ) : (
            <form
              onSubmit={handleUpdateInformation}
              className="grid grid-cols-2 text-gray-700"
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
                  value={formData.first_name}
                  onChange={(e) => handleChangeFormData(e)}
                  className="w-full px-2 py-1 sm:px-3 sm:py-2 rounded-md border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring focus:ring-custom"
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
                  value={formData.last_name}
                  onChange={(e) => handleChangeFormData(e)}
                  className="w-full px-2 py-1 sm:px-3 sm:py-2 rounded-md border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring focus:ring-custom"
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
                  value={formData.email}
                  onChange={(e) => handleChangeFormData(e)}
                  className="w-full px-2 py-1 sm:px-3 sm:py-2 rounded-md border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring focus:ring-custom"
                  required
                />
              </div>
              <div className="col-span-1 mr-2">
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="phone_number"
                >
                  Phone Number
                </label>
                <input
                  type="text"
                  id="phone_number"
                  pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={(e) => handleChangeFormData(e)}
                  className="w-full px-2 py-1 sm:px-3 sm:py-2 rounded-md border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring focus:ring-custom"
                />
                <span className="text-red-500 italic text-sm">
                  Notice: Enter only your phone number, no need country code
                </span>
              </div>
              <div className="col-span-1 mr-2">
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="nationality"
                >
                  Nationality
                </label>
                <select
                  type="text"
                  id="nationality"
                  name="nationality"
                  value={formData.nationality}
                  onChange={(e) => handleChangeFormData(e)}
                  className="w-full px-2 py-1 sm:px-3 sm:py-2 rounded-md border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring focus:ring-custom"
                >
                  <option value="">Select your nationality</option>
                  {data.map((country) => (
                    <option
                      key={country.code}
                      value={country.dialCode + " " + country.name}
                      style={{
                        backgroundImage: `url(${country.flag})`,
                      }}
                    >
                      {country.name} ({country.dialCode})
                    </option>
                  ))}
                </select>
              </div>

              {updateMessage && (
                <p
                  className={`text-sm font-medium ${
                    updateMessage.includes("successfully")
                      ? "text-green-600 text-xl text-center"
                      : "text-red-600"
                  }`}
                >
                  {updateMessage}
                </p>
              )}
              <button
                type="submit"
                className="w-full mt-4 bg-custom col-span-2 text-white font-semibold py-2 px-4 rounded-md hover:bg-hover-custom transition-colors focus:outline-none focus:ring focus:ring-custom"
              >
                Save Changes
              </button>
            </form>
          )}
        </section>
      </div>
    </div>
  );
}
