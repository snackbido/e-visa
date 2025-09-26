import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axios/axios";
import { useSelector } from "react-redux";

const PaymentStatus = () => {
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("Processing your payment...");
  const { user } = useSelector((state) => state.auth) || "";
  const navigate = useNavigate();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (!query.get("vpc_OrderInfo")) {
      navigate("/");
    }
    const handleStatus = (status, message) => {
      setTimeout(() => {
        setStatus(status);
        setMessage(message);
      }, 1000);
    };
    const transactionId = query.get("vpc_OrderInfo");
    const checkPaymentStatus = async () => {
      const { data } = await axios.get(`/payment/return?${query.toString()}`);
      if (data.status === "success") {
        await axios.post("/payment", {
          visa_id: transactionId,
          amount: Number(query.get("vpc_Amount")),
          user_id: user,
          card_number: query.get("vpc_CardNum"),
        });
        handleStatus("success", "Your payment was successful!");
        setTimeout(() => {
          navigate("/profile");
        }, 3000);
      } else {
        const { data } = await axios.delete(`/visa/${transactionId}`);
        if (data.status === "success") {
          handleStatus("failed", "Your payment failed. Please try again.");
        }
      }
    };
    checkPaymentStatus();
  }, [navigate, user]);

  const handleGoHome = () => {
    // Logic điều hướng về trang chủ
    console.log("Điều hướng về trang chủ...");
    alert("Điều hướng về trang chủ."); // Sử dụng alert tạm thời
  };

  let content;
  let button;

  switch (status) {
    case "loading":
      content = (
        <div className="flex flex-col items-center">
          {/* SVG spinner animation */}
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
          <h1 className="mt-4 text-2xl font-bold text-blue-500">In process</h1>
          <p className="mt-2 text-gray-600">{message}</p>
        </div>
      );
      break;
    case "success":
      content = (
        <div className="flex flex-col items-center">
          {/* SVG icon cho trạng thái thành công */}
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
          <h1 className="mt-4 text-2xl font-bold text-green-500">
            Payment Successful
          </h1>
          <p className="mt-2 text-gray-600">{message}</p>
          <p className="mt-2 text-gray-600">
            You will be redirected to your profile in 3 seconds...
          </p>
        </div>
      );
      button = (
        <button
          onClick={handleGoHome}
          className="mt-6 px-6 py-3 bg-green-500 text-white rounded-lg shadow-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 transition-colors duration-200"
        >
          Go back to Home
        </button>
      );
      break;
    case "failed":
      content = (
        <div className="flex flex-col items-center">
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
          <h1 className="mt-4 text-2xl font-bold text-red-500">
            Payment Failed
          </h1>
          <p className="mt-2 text-gray-600">{message}</p>
        </div>
      );
      button = (
        <button
          onClick={handleGoHome}
          className="mt-6 px-6 py-3 bg-red-500 text-white rounded-lg shadow-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 transition-colors duration-200"
        >
          Go back to Home
        </button>
      );
      break;
    default:
      content = null;
      button = null;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 font-sans p-4">
      <div className="bg-white p-8 md:p-12 rounded-xl shadow-lg text-center w-full max-w-md">
        {content}
        {button}
      </div>
    </div>
  );
};

export default PaymentStatus;
