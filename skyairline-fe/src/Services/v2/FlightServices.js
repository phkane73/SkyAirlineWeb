import { join } from "sockjs-client/lib/transport-list";
import API from "./API";

export const checkFlightIsExist = async (flightDto) => {
  try {
    const response = await API.get("/api/flight/check-flight-exist", {
      params: { ...flightDto },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const findFlights = async (id) => {
  try {
    const response = await API.get(`/api/flight/find-flights/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const getFlightById = async (id) => {
  try {
    const response = await API.get(`/api/flight/get-by-id/${id}`);
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
