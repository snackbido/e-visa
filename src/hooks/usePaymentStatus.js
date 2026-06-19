import { useState, useEffect } from "react";
import { verifyPayment } from "../services/payment";

const PAYMENT_STATUS = {
  PAID: "paid",
  FAILED: "failed",
  EXPIRED: "expired",
  CANCELED: "canceled",
  LOADING: "loading",
};

/**
 * Custom hook để kiểm tra payment status
 * @param {string} merchTxnRef - Merchant Transaction Reference
 * @param {string} orderInfo - Order Information
 * @returns {object} { status, message, dataPayment, isLoading }
 */
export const usePaymentStatus = (merchTxnRef, orderInfo) => {
  const [status, setStatus] = useState(PAYMENT_STATUS.LOADING);
  const [message, setMessage] = useState("Processing your payment...");
  const [dataPayment, setDataPayment] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!orderInfo || !merchTxnRef) {
      return;
    }

    let isMounted = true;

    const verifyPaymentStatus = async () => {
      try {
        const res = await verifyPayment(merchTxnRef, orderInfo);

        if (isMounted) {
          if (res.status === "success" && res.data) {
            setDataPayment(res.data);

            // Xác định payment status dựa trên response data
            const paymentStatus = res.data.status?.toLowerCase();

            switch (paymentStatus) {
              case PAYMENT_STATUS.PAID:
                setStatus(PAYMENT_STATUS.PAID);
                setMessage("Your payment has been completed successfully!");
                break;
              case PAYMENT_STATUS.FAILED:
                setStatus(PAYMENT_STATUS.FAILED);
                setMessage("Your payment failed. Please try again.");
                break;
              case PAYMENT_STATUS.EXPIRED:
                setStatus(PAYMENT_STATUS.EXPIRED);
                setMessage("Your payment session has expired. Please try again.");
                break;
              case PAYMENT_STATUS.CANCELED:
                setStatus(PAYMENT_STATUS.CANCELED);
                setMessage("Your payment has been canceled.");
                break;
              default:
                setStatus(PAYMENT_STATUS.LOADING);
                setMessage("Processing your payment...");
            }
          } else {
            setStatus(PAYMENT_STATUS.FAILED);
            setMessage("An error occurred while verifying your payment.");
          }
        }
      } catch (error) {
        if (isMounted) {
          console.error("Payment verification error:", error);
          setStatus(PAYMENT_STATUS.FAILED);
          setMessage("An error occurred while verifying your payment.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    verifyPaymentStatus();

    return () => {
      isMounted = false;
    };
  }, [merchTxnRef, orderInfo]);

  return {
    status,
    message,
    dataPayment,
    isLoading,
    PAYMENT_STATUS,
  };
};
