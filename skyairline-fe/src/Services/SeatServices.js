import API from "./API";
export const bookingSeat = async (idSeat, idSchedule, token) => {
  try {
    const response = await API.put("/api/public/seat/booking", {
      idSeat: idSeat,
      idSchedule: idSchedule,
      token: token,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const cancelSeat = async (idSeat, idSchedule, token) => {
  try {
    const response = await API.put("/api/public/seat/cancel", {
      idSeat: idSeat,
      idSchedule: idSchedule,
      token: token,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
