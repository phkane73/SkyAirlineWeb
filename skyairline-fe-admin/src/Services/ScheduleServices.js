import API from "./API";

export const createSchedule = async (start, end, action) => {
  try {
    const response = await API.post("/api/public/flightschedule/create", {
      startDate: start,
      endDate: end,
      action: action,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const listSchedule = async () => {
  try {
    const response = await API.get("/api/public/flightschedule/list");
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const flightCount = async () => {
  try {
    const response = await API.get("/api/public/flightschedule/count");
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
