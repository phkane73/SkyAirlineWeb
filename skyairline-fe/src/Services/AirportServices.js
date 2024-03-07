import API from "./API";

export const getAllAirportOperation = async () => {
  try {
    const response = await API.get("/api/public/airport/airportsoperation");
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const getAllAirportFlightTimeById = async (id) => {
  try {
    const response = await API.get("/api/public/airport/airportflighttime", {
      params: { id: id },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
