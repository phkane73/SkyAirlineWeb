import API from "./API";

export const updatedRunway = async (runways) => {
  try {
    const response = await API.patch("/api/runway/update", runways);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const createRunway = async (runway) => {
  try {
    const response = await API.post("/api/runway/create", { ...runway });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const resetAvailableTime = async (id) => {
  try {
    const response = await API.patch(`/api/runway/reset/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
