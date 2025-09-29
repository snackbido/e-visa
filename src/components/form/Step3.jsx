import { useState } from "react";
import axios from "../../axios/axios";
// import CurrencyAPI from "@everapi/currencyapi-js";

export function Step3({ handlePrevStep, formData, totalFee, user }) {
  // const currencyApi = new CurrencyAPI(
  //   "cur_live_Lr7REa95LGvDBK9oc4ivpSBCPzyB4QXqTFuFfMMv"
  // );
  // const [vnd, setVND] = useState("0");
  // currencyApi
  //   .latest({
  //     base_currency: "USD",
  //     currencies: "VND",
  //   })
  //   .then((response) => {
  //     setVND(
  //       new Intl.NumberFormat("vi-VN").format(
  //         response.data.VND.value * totalFee
  //       )
  //     );
  //   });
  const [isLoading, setIsLoading] = useState(false);

  // This is the data body that will be sent to your backend

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const body = {
      nationality: formData.step1.nationality,
      time_of_visa: formData.step1.visaTime,
      type_of_visa: formData.step1.visaType,
      number_of_visa: formData.applicants.length,
      applicant: formData.applicants,
      processing_time: formData.step1.processingTime,
      purpose_of_visit: formData.step1.purpose,
      user_id: user.id,
      date_of_arrival: formData.info.arrival_date,
      arrival_border: formData.info.arrival_border,
      email: formData.info.email,
      phone_number: formData.info.phone_number,
      first_name: formData.info.first_name,
      last_name: formData.info.last_name,
      amount: totalFee,
      status: "Unpaid",
    };

    try {
      const visa = await axios.post("/visa", body);
      if (visa.data.status === "success") {
        const paymentUrl = await axios.get(
          `/payment/checkout/?amount=${totalFee + 200000}&orderInfo=${
            visa.data.data.id
          }`
        );
        const { status, data } = paymentUrl.data;
        if (status === "success") {
          window.location.href = data.url;
          setIsLoading(false);
        }
      }
    } catch (error) {
      console.error("Payment submission failed:", error);
      setIsLoading(false);
      alert("There was an error processing your request. Please try again.");
    }
  };

  return (
    <div className="mx-auto">
      <section className="bg-white antialiased md:pb-8">
        <div className="mx-auto max-w-screen-xl 2xl:px-0">
          <div className="mx-auto">
            <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12">
              <form
                action="#"
                className="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6 lg:max-w-xl lg:p-8"
              >
                <h2 className="text-2xl font-semibold mb-6">
                  3. Payment Option
                </h2>
                <div className="mb-6">
                  <p className="text-gray-600 mb-4">
                    Choose your preferred payment method below.
                  </p>
                  <button
                    type="button"
                    onClick={handlePaymentSubmit}
                    disabled={isLoading}
                    className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white bg-indigo-600 hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300"
                  >
                    {isLoading ? "Processing..." : "Pay with OnePay"}
                  </button>
                </div>
              </form>

              <div className="mt-6 grow sm:mt-8 lg:mt-0">
                <div className="space-y-4 rounded-lg border border-gray-100 bg-gray-50 p-6">
                  <h2 className="text-2xl font-semibold mb-6">
                    Information visa
                  </h2>
                  <div className="space-y-2">
                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-normal text-gray-500">
                        Email
                      </dt>
                      <dd className="text-base font-medium text-gray-900">
                        {user?.email}
                      </dd>
                    </dl>
                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-normal text-gray-500">
                        Full Name
                      </dt>
                      <dd className="text-base font-medium text-green-500">
                        {user?.last_name + " " + user?.first_name}
                      </dd>
                    </dl>
                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-normal text-gray-500">
                        Fee
                      </dt>
                      <dd className="text-base font-medium text-gray-900">
                        ${totalFee}
                      </dd>
                    </dl>
                  </div>

                  <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2">
                    <dt className="text-base font-bold text-gray-900">Total</dt>
                    <dd className="text-base font-bold text-gray-900">
                      ${totalFee}
                    </dd>
                  </dl>
                  {/* <dl className="flex items-center justify-between border-gray-200">
                    <dt className="text-base font-bold text-gray-900">
                      In VND
                    </dt>
                    <dd className="text-base font-bold text-red-600">
                      {vnd} VND
                    </dd>
                  </dl> */}
                </div>

                <div className="mt-6 flex items-center justify-center gap-8">
                  <img
                    className="h-8 w-auto dark:hidden"
                    src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/paypal.svg"
                    alt=""
                  />
                  <img
                    className="hidden h-8 w-auto dark:flex"
                    src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/paypal-dark.svg"
                    alt=""
                  />
                  <img
                    className="h-8 w-auto dark:hidden"
                    src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/visa.svg"
                    alt=""
                  />
                  <img
                    className="hidden h-8 w-auto dark:flex"
                    src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/visa-dark.svg"
                    alt=""
                  />
                  <img
                    className="h-8 w-auto dark:hidden"
                    src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/mastercard.svg"
                    alt=""
                  />
                  <img
                    className="hidden h-8 w-auto dark:flex"
                    src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/mastercard-dark.svg"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={handlePrevStep}
            className="sm:px-6 sm:py-3 px-5 py-2 text-gray-600 font-semibold rounded-full border border-gray-400 hover:bg-gray-200 transition-colors duration-200"
          >
            Back
          </button>
        </div>
      </section>
      <div className=" mt-8 sm:m-0 p-4 bg-yellow-50 border-l-4 border-yellow-400">
        <p className="text-yellow-700 font-semibold">
          Notice: After payment successful, you will received an email includes
          your information and visa. When your visa applied by consulate at
          VietNam, we will be sent your visa via your email provide.
        </p>
      </div>
    </div>
  );
}
