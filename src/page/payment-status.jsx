import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePaymentStatus } from "../hooks/usePaymentStatus";

const PaymentStatus = () => {
  const navigate = useNavigate();
  const query = new URLSearchParams(window.location.search);
  const orderInfo = query.get("vpc_OrderInfo");
  const merchTxnRef = query.get("vpc_MerchTxnRef");
  const [countdown, setCountdown] = useState(3);

  const { status, message, PAYMENT_STATUS } = usePaymentStatus(
    merchTxnRef,
    orderInfo,
  );

  useEffect(() => {
    if (!orderInfo || !merchTxnRef) {
      navigate("/");
      return;
    }
  }, [orderInfo, merchTxnRef, navigate]);

  useEffect(() => {
    if (status !== PAYMENT_STATUS.PAID) {
      setCountdown(10);
      return;
    }

    const intervalId = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [status, PAYMENT_STATUS.PAID]);

  useEffect(() => {
    if (status === PAYMENT_STATUS.PAID && countdown <= 0) {
      navigate("/profile");
    }
  }, [countdown, status, PAYMENT_STATUS.PAID, navigate]);

  const handleGoHome = () => {
    navigate("/");
  };

  const handleGoProfile = () => {
    navigate("/profile");
  };

  const statusConfig = {
    [PAYMENT_STATUS.LOADING]: {
      title: "Processing Payment",
      subtitle: "Your transaction is being verified.",
      icon: (
        <svg
          className="animate-spin h-12 w-12 text-blue-500"
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
      ),
      borderColor: "border-blue-100",
      button: null,
    },
    [PAYMENT_STATUS.PAID]: {
      title: "Payment Successful",
      subtitle: "Your transaction has been completed and confirmed.",
      icon: (
        <svg
          className="w-16 h-16 text-green-500"
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
      ),
      borderColor: "border-green-100",
      button: {
        text: "View My Profile",
        onClick: handleGoProfile,
        className:
          "mt-6 px-6 py-3 bg-green-500 text-white rounded-lg shadow-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 transition-colors duration-200",
      },
    },
    [PAYMENT_STATUS.FAILED]: {
      title: "Payment Failed",
      subtitle: "An error occurred while processing the transaction.",
      icon: (
        <svg
          className="w-16 h-16 text-red-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
      ),
      borderColor: "border-red-100",
      button: {
        text: "Return Home",
        onClick: handleGoHome,
        className:
          "mt-6 px-6 py-3 bg-red-500 text-white rounded-lg shadow-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 transition-colors duration-200",
      },
    },
    [PAYMENT_STATUS.EXPIRED]: {
      title: "Payment Session Expired",
      subtitle: "The checkout session has timed out.",
      icon: (
        <svg
          className="w-16 h-16 text-orange-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
      ),
      borderColor: "border-orange-100",
      button: {
        text: "Return Home",
        onClick: handleGoHome,
        className:
          "mt-6 px-6 py-3 bg-orange-500 text-white rounded-lg shadow-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-75 transition-colors duration-200",
      },
    },
    [PAYMENT_STATUS.CANCELED]: {
      title: "Payment Canceled",
      subtitle: "The payment was stopped before completion.",
      icon: (
        <svg
          className="w-16 h-16 text-yellow-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          ></path>
        </svg>
      ),
      borderColor: "border-yellow-100",
      button: {
        text: "Return Home",
        onClick: handleGoHome,
        className:
          "mt-6 px-6 py-3 bg-yellow-500 text-white rounded-lg shadow-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-75 transition-colors duration-200",
      },
    },
  };

  const currentStatus = statusConfig[status] || statusConfig[PAYMENT_STATUS.FAILED];

  const content = (
    <div className={`border ${currentStatus.borderColor} border-opacity-70 rounded-3xl p-6 text-left`}>
      <div className="flex flex-col items-center text-center">
        <div className="bg-gray-50 rounded-full p-4 mb-4">{currentStatus.icon}</div>
        <h1 className="text-2xl font-semibold text-slate-900">{currentStatus.title}</h1>
        <p className="mt-2 text-sm text-slate-600">{currentStatus.subtitle}</p>
        <p className="mt-4 text-base text-slate-700">{message}</p>
        {status === PAYMENT_STATUS.PAID && (
          <p className="mt-2 text-sm text-slate-500">
            You will be redirected to your profile in {countdown} seconds.
          </p>
        )}
      </div>
    </div>
  );

  const button = currentStatus.button ? (
    <button
      onClick={currentStatus.button.onClick}
      className={currentStatus.button.className}
    >
      {currentStatus.button.text}
    </button>
  ) : null;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 font-sans p-4">
      <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl text-center w-full max-w-lg">
        {content}
        {button}
      </div>
    </div>
  );
};

export default PaymentStatus;
