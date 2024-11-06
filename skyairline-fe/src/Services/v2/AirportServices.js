import API from "./API";

export const getAllOperatingAirport = async () => {
  try {
    const response = await API.get("/api/airport/get-operating");
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
