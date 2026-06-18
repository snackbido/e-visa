import axios from "../axios/axios";

export const initialPayment = async (amount, user_id, visa_id) => {
  try {
    const res = await axios.post("/payment/checkout", {
      amount,
      user_id,
      visa_id,
      payment_gate: "ONEPAY",
      payment_method: "INTERNATIONAL",
    });

    if (res.data.status !== "success") {
      throw new Error("Payment initialization failed");
    }

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const verifyPayment = async (merchTxnRef, orderInfo) => {
  try {
    const res = await axios.put("/payment/verify", {
      merchTxnRef,
      paymentGate: "ONEPAY",
      orderInfo,
    });

    return res.data;
  } catch (error) {
    throw error;
  }
};
