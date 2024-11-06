import API from "./API";

export const getAllFlightRoute = async () => {
  try {
    const response = await API.get("/api/flight-route/get-all");
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const addFlightRoute = async (flightRoute) => {
  try {
    const response = await API.post("/api/flight-route/create", {
      ...flightRoute,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const updateFlightRoute = async (flightRoute) => {
  try {
    const response = await API.patch("/api/flight-route/update", {
      ...flightRoute,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
