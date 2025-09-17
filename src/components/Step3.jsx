import { useState } from "react";
import axios from "../axios/axios";

export function Step3({ handlePrevStep, formData, totalFee, user }) {
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);

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
  };

  const handleCreateVisa = async () => {
    const { data } = await axios.post("/visa", body);
    return data;
  };
  console.log(formData.info.email);
  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    // Simulate payment processing
    const res = await axios.post("/payment", {
      user_id: user.id,
      amount: totalFee * 1,
    });

    if (res.data.status === "success") {
      const { status } = await handleCreateVisa();
      if (status === "success") {
        setTimeout(() => {
          setIsPaymentSuccessful(true);
        }, 1500);
      }
    }
  };
  return (
    <div className="mx-auto">
      {isPaymentSuccessful ? (
        <div className="text-center p-8 bg-green-50 rounded-lg border-2 border-green-300">
          <svg
            className="w-16 h-16 text-green-500 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <h3 className="text-xl font-bold text-green-700 mb-2">
            Payment Successful!
          </h3>
          <p className="text-gray-600">
            Your E-Visa application has been submitted and payment was received.
            You will receive a confirmation email shortly.
          </p>
          <button className="mt-6 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700 transition-colors duration-200">
            Back to Home
          </button>
        </div>
      ) : (
        <section className="bg-white  antialiased dark:bg-gray-900 md:pb-8">
          <div className="mx-auto max-w-screen-xl 2xl:px-0">
            <div className="mx-auto">
              <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12">
                <form
                  action="#"
                  className="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6 lg:max-w-xl lg:p-8"
                >
                  <h2 className="text-2xl font-semibold mb-6">
                    3. Credit Card Information
                  </h2>

                  <div className="mb-6 grid grid-cols-2 gap-4">
                    <div className="col-span-2 sm:col-span-2">
                      <label
                        htmlFor="full_name"
                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                      >
                        {" "}
                        Full name (as displayed on card)*{" "}
                      </label>
                      <input
                        type="text"
                        id="full_name"
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                        placeholder="Bonnie Green"
                        required
                      />
                    </div>

                    <div className="col-span-2 sm:col-span-2">
                      <label
                        htmlFor="card-number-input"
                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                      >
                        {" "}
                        Card number*{" "}
                      </label>
                      <input
                        type="text"
                        id="card-number-input"
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pe-10 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                        placeholder="xxxx-xxxx-xxxx-xxxx"
                        pattern="^4[0-9]{12}(?:[0-9]{3})?$"
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="card-expiration-input"
                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Card expiration*{" "}
                      </label>
                      <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5">
                          <svg
                            className="h-4 w-4 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5 5a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1 2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a2 2 0 0 1 2-2ZM3 19v-7a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm6.01-6a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm-10 4a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <input
                          datepicker-format="mm/yy"
                          id="card-expiration-input"
                          type="text"
                          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 ps-9 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                          placeholder="12/23"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="cvv-input"
                        className="mb-2 flex items-center gap-1 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        CVV*
                        <button
                          data-tooltip-target="cvv-desc"
                          data-tooltip-trigger="hover"
                          className="text-gray-400 hover:text-gray-900 dark:text-gray-500 dark:hover:text-white"
                        >
                          <svg
                            className="h-4 w-4"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fillRule="evenodd"
                              d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm9.408-5.5a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2h-.01ZM10 10a1 1 0 1 0 0 2h1v3h-1a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-1v-4a1 1 0 0 0-1-1h-2Z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                        <div
                          id="cvv-desc"
                          role="tooltip"
                          className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700"
                        >
                          The last 3 digits on back of card
                          <div
                            className="tooltip-arrow"
                            data-popper-arrow
                          ></div>
                        </div>
                      </label>
                      <input
                        type="number"
                        id="cvv-input"
                        aria-describedby="helper-text-explanation"
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                        placeholder="•••"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    onClick={handlePaymentSubmit}
                    className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white bg-indigo-600 hover:bg-primary-800 focus:outline-none focus:ring-4  focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Pay now
                  </button>
                </form>

                <div className="mt-6 grow sm:mt-8 lg:mt-0">
                  <div className="space-y-4 rounded-lg border border-gray-100 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800">
                    <h2 className="text-2xl font-semibold mb-6">
                      Information visa
                    </h2>

                    <div className="space-y-2">
                      <dl className="flex items-center justify-between gap-4">
                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                          Email
                        </dt>
                        <dd className="text-base font-medium text-gray-900 dark:text-white">
                          test@gmail.com
                        </dd>
                      </dl>

                      <dl className="flex items-center justify-between gap-4">
                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                          Full Name
                        </dt>
                        <dd className="text-base font-medium text-green-500">
                          Test
                        </dd>
                      </dl>

                      <dl className="flex items-center justify-between gap-4">
                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                          Phone number
                        </dt>
                        <dd className="text-base font-medium text-gray-900 dark:text-white">
                          0123456789
                        </dd>
                      </dl>

                      <dl className="flex items-center justify-between gap-4">
                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                          Fee
                        </dt>
                        <dd className="text-base font-medium text-gray-900 dark:text-white">
                          $799
                        </dd>
                      </dl>
                    </div>

                    <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                      <dt className="text-base font-bold text-gray-900 dark:text-white">
                        Total
                      </dt>
                      <dd className="text-base font-bold text-gray-900 dark:text-white">
                        $7,191.00
                      </dd>
                    </dl>

                    <dl className="flex items-center justify-between border-gray-200 dark:border-gray-700">
                      <dt className="text-base font-bold text-gray-900 dark:text-white">
                        In VND
                      </dt>
                      <dd className="text-base font-bold text-red-600 dark:text-white">
                        179,100,000 VND
                      </dd>
                    </dl>
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
      )}
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
