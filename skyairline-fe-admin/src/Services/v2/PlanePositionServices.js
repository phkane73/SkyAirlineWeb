import API from "./API";

export const getAllPlanePosition = async (search) => {
  try {
    const response = await API.get("/api/plane-position/get-all", {
      params: { ...search },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const getPlanesNoPosition = async () => {
  try {
    const response = await API.get("/api/plane-position/get-plane-no-position");
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};


export const deletePlanesNoPosition = async (id) => {
  try {
    const response = await API.delete(`/api/plane-position/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const addPlanePosition = async (planePosition) => {
  try {
    const response = await API.post("/api/plane-position/create", {
      ...planePosition,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const updatePlanePosition = async (planePosition) => {
  try {
    const response = await API.patch("/api/plane-position/update", {
      ...planePosition,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const movePlane = async (movePlane) => {
  try {
    const response = await API.post("/api/plane-position/move-plane", {
      ...movePlane,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
