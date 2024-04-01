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

export const capturePaymentPaypal = async (
  paymentId,
  method,
  price,
  seatId,
  flightId,
  userId
) => {
  try {
    const response = await API.post("/api/public/payment/capture", {
      paymentId: paymentId,
      method: method,
      price: price,
      seatId: seatId,
      flightId: flightId,
      userId: userId,
    });
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
