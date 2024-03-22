import API from "./API";

export const createPaymentPaypal = async (total) => {
  try {
    const response = await API.post("/api/public/payment/create", {
      total: total,
    });
    return response.data.id;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const capturePaymentPaypal = async (paymentId) => {
  try {
    const response = await API.post("/api/public/payment/capture", {
      paymentId: paymentId,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
