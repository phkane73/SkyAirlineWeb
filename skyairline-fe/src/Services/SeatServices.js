import API from "./API";
export const bookingSeat = async (idSeat, idSchedule) => {
  try {
    const response = await API.put("/api/public/seat/booking", {
      idSeat: idSeat,
      idSchedule: idSchedule,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const cancelSeat = async (idSeat, idSchedule) => {
  try {
    const response = await API.put("/api/public/seat/cancel", {
      idSeat: idSeat,
      idSchedule: idSchedule,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
