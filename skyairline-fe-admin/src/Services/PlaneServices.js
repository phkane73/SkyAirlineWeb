import API from "./API";

export const getAllPlane = async () => {
  try {
    const response = await API.get("/api/public/plane/list");
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const addPlane = async (data) => {
  try {
    const response = await API.post("/api/public/plane/add", {
      planeName: data.planeName,
      idAirport: data.onAirport,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const activePlane = async (id) => {
  try {
    const response = await API.get("/api/public/plane/active", {
      params: { id: id },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const deActivePlane = async (id) => {
  try {
    const response = await API.get("/api/public/plane/deactive", {
      params: { id: id },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
