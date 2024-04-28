import API from "./API";

export const allUsers = async () => {
  try {
    const response = await API.get("/api/public/user/list");
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const userCount = async () => {
  try {
    const response = await API.get("/api/public/user/count");
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
