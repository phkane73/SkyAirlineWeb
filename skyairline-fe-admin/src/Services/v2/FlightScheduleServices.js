import API from "./API";

export const getAllFlightScheduleWithPaginate = async (search) => {
  try {
    const response = await API.get("/api/flight-schedule/get-all", {
      params: { ...search },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const deleteFlightSchedule = async (id) => {
  try {
    const response = await API.delete(`/api/flight-schedule/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const checkApprove = async (id) => {
  try {
    const response = await API.get(`/api/flight-schedule/check-approve/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
