import API from "./API";

export const getAllPlane = async () => {
  try {
    const response = await API.get("/api/plane/get-all");
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const addPlane = async (plane) => {
  try {
    const response = await API.post("/api/plane/create", { ...plane });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const updatePlane = async (plane) => {
  try {
    const response = await API.patch("/api/plane/update", { ...plane });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
