import API from "./API";
export const bookingSeat = async (idSeat, idFlight, token) => {
  try {
    const response = await API.put("/api/public/seat/booking", {
      idSeat: idSeat,
      idFlight: idFlight,
      token: token,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const cancelSeat = async (idSeat, idFlight, token) => {
  try {
    const response = await API.put("/api/public/seat/cancel", {
      idSeat: idSeat,
      idFlight: idFlight,
      token: token,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const getSeatDetailByFlightIds = async (ids) => {
  try {
    const response = await API.get("/api/public/seat/get", {
      params: {
        ids: ids.join(","),
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const getSeatDetailByFlightId = async (id) => {
  try {
    const response = await API.get("/api/public/seat/get-one", {
      params: {
        id,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
