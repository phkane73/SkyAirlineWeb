import API from "./API";

export const getAllAirport = async () => {
  try {
    const response = await API.get("/api/airport/get-all");
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const addAirport = async (airport) => {
  try {
    const response = await API.post("/api/airport/create", { ...airport });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const updateAirport = async (airport) => {
  try {
    const response = await API.patch("/api/airport/update", { ...airport });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
