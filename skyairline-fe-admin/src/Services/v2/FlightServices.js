import API from "./API";

export const getAllFlightByFlightScheduleId = async (id) => {
  try {
    const response = await API.get(
      `/api/flight/get-by-flight-schedule-id/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const generateFlight = async (generateDto) => {
  return API.post("/api/flight/generate", { ...generateDto })
};

export const approveFlightSchedule = async (id) => {
  try {
    const response = await API.patch(`/api/flight/approved/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const getFlightByIds = async (ids) => {
  try {
    const response = await API.get("/api/flight/get-by-ids", {
      params: {
        ids: ids.join(","),
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};